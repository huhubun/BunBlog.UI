<template>
  <v-spacer>
    <v-app-bar app dense flat elevate-on-scroll elevation="1" color="white">
      <v-btn
        to="/admin/posts"
        exact
        :text="!$vuetify.breakpoint.smAndDown"
        :icon="$vuetify.breakpoint.smAndDown"
      >
        <v-icon :left="!$vuetify.breakpoint.smAndDown">mdi-arrow-left</v-icon>
        <span v-if="!$vuetify.breakpoint.smAndDown">返回博文列表</span>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn text class="hidden-xs-only">
        <v-icon>mdi-image-outline</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        @click="onSaveDraftButtonClick"
        :text="!$vuetify.breakpoint.smAndDown"
        :icon="$vuetify.breakpoint.smAndDown"
      >
        <v-icon :left="!$vuetify.breakpoint.smAndDown">
          mdi-progress-upload
        </v-icon>
        <span v-if="!$vuetify.breakpoint.smAndDown">存为草稿</span>
      </v-btn>

      <v-btn
        :text="!$vuetify.breakpoint.smAndDown"
        :icon="$vuetify.breakpoint.smAndDown"
        @click.stop="onPublishButtonClick"
      >
        <v-icon :left="!$vuetify.breakpoint.smAndDown">mdi-send-outline</v-icon>
        <span v-if="!$vuetify.breakpoint.smAndDown">发布博文</span>
      </v-btn>
    </v-app-bar>

    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="editorPost.title"
            single-line
            autofocus
            label="标题"
          >
            <template v-slot:append>
              <v-chip v-if="!isNewPost" small label :ripple="false">
                修订
              </v-chip>
              <v-chip v-if="isDraft" small label :ripple="false" class="ml-1">
                草稿
              </v-chip>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-textarea
            v-model="editorPost.content"
            auto-grow
            counter
            outlined
            rows="20"
            label="博文内容"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-container>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      right
      temporary
      :width="$vuetify.breakpoint.smAndDown ? '80%' : '40%'"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>博文设置</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon @click="closeDrawer">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <v-divider></v-divider>

      <v-form ref="form" lazy-validation>
        <v-list dense>
          <v-list-item>
            <v-list-item-content>
              <v-text-field
                v-model="editorPost.linkName"
                outlined
                autofocus
                label="链接名称"
                prepend-inner-icon="mdi-link-variant"
                :rules="[formRules.required('链接名称')]"
              ></v-text-field>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-select
                v-model="editorPost.category"
                :items="categoryList"
                outlined
                label="分类"
                item-text="displayName"
                item-value="linkName"
                :loading="waitForCategoryList"
                prepend-inner-icon="mdi-inbox-multiple"
                :rules="[formRules.requiredSelect('分类')]"
              >
                <template v-slot:append-outer>
                  <div class="bun-selecter-append-outer">
                    <v-btn icon large @click="getCategoryList">
                      <v-icon>mdi-refresh</v-icon>
                    </v-btn>
                  </div>
                </template>
              </v-select>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-autocomplete
                v-model="editorPost.tagList"
                :items="tagList"
                outlined
                multiple
                small-chips
                deletable-chips
                label="标签"
                item-text="displayName"
                item-value="linkName"
                :loading="waitForTagList"
                prepend-inner-icon="mdi-tag"
                :rules="[formRules.requiredSelect('标签', true)]"
              >
                <template v-slot:append-outer>
                  <div class="bun-selecter-append-outer">
                    <v-btn icon large @click="getTagList">
                      <v-icon>mdi-refresh</v-icon>
                    </v-btn>
                  </div>
                </template>
              </v-autocomplete>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-textarea
                v-model="editorPost.excerpt"
                auto-grow
                counter
                outlined
                rows="5"
                label="摘要"
                prepend-inner-icon="mdi-text-short"
                hint="SEO 提示：摘要长度建议不要超过 75 个汉字，它被作为文章的 description 被搜索引擎抓取，过长的内容会在搜索时显示为省略号。"
                persistent-hint
              ></v-textarea>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-btn block @click="onConfirmPublishButtonClick" class="primary">
                确认发布
              </v-btn>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-form>
    </v-navigation-drawer>

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
  </v-spacer>
</template>

<script>
import hotkeys from 'hotkeys-js'

export default {
  name: 'PostEditorVuetify',
  props: {
    // 传入的 post 对象
    post: {
      type: Object,
      // default: function () {
      //   return {
      //     id: null,
      //     title: '',
      //     excerpt: '',
      //     content: '',
      //     linkName: '',
      //     category: '',
      //     tagList: []
      //   }
      // },
      default: null,
      required: false
    }
  },
  data() {
    return {
      drawer: false,

      saveAsDraft: false,

      categoryList: [],
      waitForCategoryList: false,
      categoryListModel: [],
      tagList: [],
      waitForTagList: false,
      tagListModel: [],

      editorPost: {},
      originalLinkName: null,

      message: null,
      messageType: null,

      formRules: {
        required(fieldName) {
          return value => !!value || `必须设置${fieldName}`
        },
        requiredSelect(fieldName, multiple) {
          return value =>
            (multiple ? !!(value && value.length) : !!value) ||
            `必须选择${multiple ? '至少一个' : '一个'}${fieldName}`
        }
      }
    }
  },
  computed: {
    isNewPost() {
      return !this.editorPost.id
    },
    isDraft() {
      return this.editorPost.type === 'draft'
    }
  },
  methods: {
    async getCategoryList() {
      this.waitForCategoryList = true
      this.categoryList = await this.$bunblog.category.getList()
      this.waitForCategoryList = false
    },
    async getTagList() {
      this.waitForTagList = true
      this.tagList = await this.$bunblog.tag.getList()
      this.waitForTagList = false
    },
    onConfirmPublishButtonClick() {
      if (!this.$refs.form.validate()) {
        return
      }

      this.closeDrawer()

      // 避免改变 editorPost 的值，这里相当于深拷贝
      var postClone = JSON.parse(JSON.stringify(this.editorPost))

      // 'draft' = 存为草稿
      // 'post' = 正式发布
      postClone.type = this.saveAsDraft ? 'draft' : 'post'

      postClone.category = postClone.category.linkName
      postClone.tagList = postClone.tagList.map((item, index) => {
        return item.linkName
      })

      if (this.isNewPost) {
        // 新博文第一次保存，不论是发布还是草稿，都调用 posts.new()
        this.$bunblog.posts
          .new(postClone)
          .then(res => {
            this.editorPost.id = res.id
            this.originalLinkName = res.linkName
            this.showSuccessMessage('博文发布成功')
          })
          .catch(this.catchResponseError('博文发布失败'))
      } else {
        // 如果当前要保存草稿，需要考虑是新建草稿还是修改草稿
        if (this.saveAsDraft) {
          // 先尝试修改草稿，如果 linkName 对应的草稿存在，则修改草稿
          this.$bunblog.posts
            .editDraft(this.originalLinkName, postClone)
            .then(res => {
              this.originalLinkName = this.editorPost.linkName
              this.showSuccessMessage('草稿保存成功')
            })
            .catch(error => {
              // 如果根据 linkName 修改草稿返回 404，说明该文章没有草稿，所以新建草稿
              if (error.response.status === 404) {
                console.log(
                  `originalLinkName = ${this.originalLinkName} 的草稿不存在，现在开始创建草稿`
                )

                this.$bunblog.posts
                  .new(postClone)
                  .then(res => {
                    this.editorPost.id = res.id
                    this.originalLinkName = res.linkName
                    this.showSuccessMessage('草稿保存成功')
                  })
                  .catch(this.catchResponseError('博文发布失败'))
              } else {
                this.catchResponseError('草稿保存失败')(error)
              }
            })
        } else {
          // 修改并发布博文
          this.$bunblog.posts
            .edit(this.originalLinkName, postClone)
            .then(res => {
              this.originalLinkName = this.editorPost.linkName
              this.showSuccessMessage('修订后的博文发布成功')
            })
            .catch(this.catchResponseError('修订版博文发布失败'))
        }
      }
    },
    catchResponseError(errorMessage) {
      return error => {
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
      }
    },
    onSaveDraftButtonClick() {
      this.saveAsDraft = true
      this.openDrawer()
    },
    onPublishButtonClick() {
      this.saveAsDraft = false
      this.openDrawer()
    },
    openDrawer() {
      this.drawer = true
    },
    closeDrawer() {
      this.drawer = false
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
    this.getCategoryList()
    this.getTagList()

    if (this.post) {
      this.editorPost = this.post
      this.originalLinkName = this.post.linkName

      console.log(this.post)
    }
  }
}
</script>

<style scoped>
/* 受到 .v-input__icon .v-input__icon--append-outer 的启发 */
.bun-selecter-append-outer {
  width: 44px;
  /* 不要修改 height，否则会错位 */
  height: 24px;
  align-items: center;
  display: inline-flex;
  flex: 1 0 auto;
  justify-content: center;
}
</style>