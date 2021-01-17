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
                v-model="displayName"
                :rules="displayNameRules"
                label="显示名称"
                required
              ></v-text-field>

              <v-text-field
                v-model="linkName"
                :rules="linkNameRules"
                label="链接名称"
                required
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" type="submit" :loading="waitForSave">
                添加新标签
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>

      <v-col cols="12" md="6">
        <v-data-table
          :headers="headers"
          :items="tagList"
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
                    显示名称 {{ removeItem.displayName }}
                    <br />
                    链接名称 {{ removeItem.linkName }}
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
  layout: 'admin',
  head() {
    return {
      title: this.title
    }
  },
  data() {
    return {
      title: '标签管理',

      valid: true,

      displayName: null,
      displayNameRules: [v => !!v || '显示名称 is required'],
      linkName: null,
      linkNameRules: [v => !!v || '链接名称 is required'],

      waitForSave: false,

      tagList: [],

      waitForTable: true,
      headers: [
        {
          text: '显示名称',
          value: 'displayName',
          sortable: false
        },
        {
          text: '链接名称',
          value: 'linkName',
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

      this.$bunblog.tag
        .add({
          displayName: this.displayName,
          linkName: this.linkName
        })
        .then(() => {
          this.$refs.form.reset()
          this.showSuccessMessage('添加标签成功')
          this.fillTable()
        })
        .catch(error => {
          let errorMessage = '添加标签失败'

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
    remove(tag) {
      this.clearMessage()
      this.removeItem = tag
    },
    async fillTable() {
      this.waitForTable = true
      this.tagList = await this.$bunblog.tag.getList()
      this.waitForTable = false
    },
    confirmRemove() {
      this.$bunblog.tag
        .remove(this.removeItem.linkName)
        .then(() => {
          this.showSuccessMessage(`已删除标签 ${this.removeItem.displayName}`)
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