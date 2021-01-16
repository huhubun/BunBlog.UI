<template>
  <div class="ma-3">
    <h2 class="display-1">{{ title }}</h2>

    <v-data-table
      :headers="headers"
      :items="postList"
      :loading="waitForTable"
      :server-items-length="total"
      @update:options="onPageOptionsChange"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-btn lin to="/admin/posts/new">
            <v-icon left>mdi-pencil-outline</v-icon>
            撰写博文
          </v-btn>
          <v-btn lin to="/admin/posts/new2">
            <v-icon left>mdi-pencil-outline</v-icon>
            撰写博文 old
          </v-btn>
          <v-dialog :value="removeItem" persistent max-width="500px">
            <v-card>
              <v-card-title class="headline"> 确认删除 </v-card-title>
              <v-card-text v-if="removeItem">
                <v-chip v-if="removeItem.type === 'draft'" label small>
                  草稿
                </v-chip>

                {{ removeItem.title }}
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="info" text @click="removeItem = null">
                  取消
                </v-btn>
                <v-btn color="error" text @click="confirmRemove"> 删除 </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.title="{ item }">
        <n-link :to="`/admin/posts/edit/${item.id}`">{{ item.title }}</n-link>
        ( <n-link :to="`/admin/posts/edit2/${item.id}`">旧版编辑器</n-link> )
        <v-chip small label v-if="isDraft(item)" class="ml-2"> 草稿 </v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small v-if="isDraft(item)" @click="remove(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>

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
      title: '博文管理',

      postList: [],
      size: 10,
      page: 1,
      total: 0,

      waitForTable: true,
      headers: [
        {
          text: '标题',
          value: 'title',
          sortable: false
        },
        {
          text: '链接名称',
          value: 'linkName',
          sortable: false
        },
        {
          text: '发表时间',
          value: 'publishedOn',
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
    remove(draft) {
      this.clearMessage()
      this.removeItem = draft
    },
    async fillTable() {
      this.waitForTable = true

      let response = await this.$bunblog.posts.getList({
        page: this.page,
        pageSize: this.size
      })
      this.postList = response.items
      this.page = response.page
      this.total = response.total

      this.waitForTable = false
    },
    async onPageChange(page) {
      this.page = page

      await this.fillTable()
    },
    async onPageOptionsChange(options) {
      this.size = options.itemsPerPage
      this.page = options.page

      await this.fillTable()
    },
    confirmRemove() {
      this.$bunblog.posts
        .deleteDraft(this.removeItem.linkName)
        .then(() => {
          this.showSuccessMessage(
            `已删除博文 《${this.removeItem.title}》 的草稿`
          )
          this.fillTable()
        })
        .catch(error => {
          console.error(error)

          let message = `删除博文 《${this.removeItem.title}》 的草稿失败`
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
    isDraft(post) {
      return post.type === 'draft'
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