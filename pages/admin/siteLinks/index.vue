<template>
  <div class="ma-3">
    <h2 class="display-1">{{ title }}</h2>
    <v-row>
      <v-col cols="12" md="6">
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent="submit"
        >
          <v-card flat id="SignInCard">
            <v-card-title>添加</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="name"
                :rules="nameRules"
                label="站点名称"
                required
              ></v-text-field>

              <v-text-field
                v-model="link"
                :rules="linkRules"
                label="站点链接"
                required
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" type="submit" :loading="waitForSave">
                添加友情链接
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>

      <v-col cols="12" md="6">
        <v-data-table
          :headers="headers"
          :items="linksList"
          :loading="waitForTable"
          sort-by="calories"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>列表</v-toolbar-title>
              <v-dialog :value="removeItem" persistent max-width="500px">
                <v-card>
                  <v-card-title class="headline"> 确认删除 </v-card-title>
                  <v-card-text v-if="removeItem">
                    站点名称 {{ removeItem.name }}
                    <br />
                    站点链接 {{ removeItem.link }}
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="info" text @click="removeItem = null">
                      取消
                    </v-btn>
                    <v-btn color="error" text @click="confirmRemove">
                      删除
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small @click="remove(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <v-snackbar
      :color="messageType"
      :value="!!message"
      timeout="-1"
      text
      top
      centered
    >
      {{ message }}

      <template v-slot:action="{ attrs }">
        <v-btn
          :color="messageType"
          icon
          small
          v-bind="attrs"
          @click="message = null"
        >
          <v-icon small>mdi-close-circle</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  layout: 'vuetify-admin',
  head() {
    return {
      title: this.title
    }
  },
  data() {
    return {
      title: '友情链接管理',

      valid: true,

      name: null,
      nameRules: [v => !!v || '站点名称 is required'],
      link: null,
      linkRules: [v => !!v || '站点链接 is required'],

      waitForSave: false,

      linksList: [],

      waitForTable: true,
      headers: [
        {
          text: '站点名称',
          value: 'name',
          sortable: false
        },
        {
          text: '站点链接',
          value: 'link',
          sortable: false
        },
        { text: '操作', value: 'actions', sortable: false }
      ],

      removeItem: null,

      message: null,
      messageType: null
    }
  },
  methods: {
    submit() {
      if (!this.$refs.form.validate()) {
        return
      }

      this.waitForSave = true
      this.message = null

      this.$bunblog.siteLink
        .add({
          name: this.name,
          link: this.link
        })
        .then(() => {
          this.$refs.form.reset()
          this.showSuccessMessage('添加友情链接成功')
          this.fillTable()
        })
        .catch(error => {
          let errorMessage = '添加友情链接失败'

          let errorResponse = error.response
          if (errorResponse.status === 400) {
            let errorData = errorResponse.data

            let modelValidationErrorMessage = this.$bunHelper.tryParseModelValidationError(
              errorData
            )
            if (modelValidationErrorMessage) {
              errorMessage += `：${modelValidationErrorMessage}`
            } else {
              errorMessage += `：${errorData.message}`
            }
          }

          this.showErrorMessage(errorMessage)
          console.log(errorMessage)
        })
        .finally(() => {
          this.waitForSave = false
        })
    },
    remove(link) {
      this.clearMessage()
      this.removeItem = link
    },
    async fillTable() {
      this.waitForTable = true
      this.linksList = await this.$bunblog.siteLink.getList()
      this.waitForTable = false
    },
    confirmRemove() {
      this.$bunblog.siteLink
        .remove(this.removeItem.id)
        .then(() => {
          this.showSuccessMessage(`已删除 ${this.removeItem.name} 的友情链接`)
          this.fillTable()
        })
        .catch(error => {
          console.error(error)

          let message = `删除失败`
          let errorResponse = error.response
          if (errorResponse.status === 400) {
            message += `：${errorResponse.data.message}`
          }

          this.showErrorMessage(message)
        })
        .finally(() => {
          this.removeItem = null
        })
    },
    showSuccessMessage(message) {
      this.message = message
      this.messageType = 'success'
    },
    showErrorMessage(message) {
      this.message = message
      this.messageType = 'error'
    },
    clearMessage() {
      this.message = null
    }
  },
  mounted() {
    this.fillTable()
  }
}
</script>