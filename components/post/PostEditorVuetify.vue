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
        v-if="!isNewPost && !isDraft && editorPost.linkName"
        :href="`/posts/${editorPost.linkName}`"
        target="_blank"
        :text="!$vuetify.breakpoint.smAndDown"
        :icon="$vuetify.breakpoint.smAndDown"
      >
        <v-icon :left="!$vuetify.breakpoint.smAndDown">
          mdi-open-in-new
        </v-icon>
        <span v-if="!$vuetify.breakpoint.smAndDown">查看已发布</span>
      </v-btn>

      <v-btn
        @click="onPostConfigButtonClick"
        :text="!$vuetify.breakpoint.smAndDown"
        :icon="$vuetify.breakpoint.smAndDown"
      >
        <v-icon :left="!$vuetify.breakpoint.smAndDown">
          mdi-cog-outline
        </v-icon>
        <span v-if="!$vuetify.breakpoint.smAndDown">博文设置</span>
      </v-btn>

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
              >
                <template v-slot:append-outer>
                  <div class="bun-textbox-append-outer">
                    <v-btn icon large @click="formatLinkName">
                      <v-icon>mdi-auto-fix</v-icon>
                    </v-btn>
                  </div>
                </template>
              </v-text-field>
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
                hint="SEO 提示：摘要长度建议不要超过 75 个汉字，将作为文章的 description 被搜索引擎抓取，过长的内容会在搜索时显示为省略号。"
                persistent-hint
              ></v-textarea>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-btn block @click="onConfirmPublishButtonClick" class="primary">
                {{
                  saveAsDraft
                    ? '存为草稿'
                    : isNewPost
                    ? '确认发布'
                    : '确认发布修订版'
                }}
              </v-btn>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content class="pl-3">
              <v-switch
                v-model="deleteDraftAfterPublished"
                inset
                label="发布后同时删除草稿（如果草稿存在）"
              ></v-switch>
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
import Vue from 'vue'

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
      deleteDraftAfterPublished: false,

      saveAsDraft: false,

      categoryList: [],
      waitForCategoryList: false,
      categoryListModel: [],
      tagList: [],
      waitForTagList: false,
      tagListModel: [],

      editorPost: {},

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
        this.openDrawer()
        return
      }

      this.closeDrawer()

      // 避免改变 editorPost 的值，这里相当于深拷贝
      var postClone = JSON.parse(JSON.stringify(this.editorPost))

      // 'draft' = 存为草稿
      // 'post' = 正式发布
      postClone.type = this.saveAsDraft ? 'draft' : 'post'

      console.log(
        `onConfirmPublishButtonClick(): isNewPost = ${this.isNewPost}, isDraft= ${this.isDraft}, saveAsDraft = ${this.saveAsDraft}`
      )

      if (this.isNewPost) {
        let successMessage = this.saveAsDraft ? '草稿保存成功' : '博文发布成功'
        let errorMessage = this.saveAsDraft ? '草稿保存失败' : '博文发布失败'

        // 新博文第一次保存，不论是发布还是草稿，都调用 posts.new()
        this.$bunblog.posts
          .new(postClone)
          .then(res => {
            Vue.set(this.editorPost, 'id', res.id)
            Vue.set(this.editorPost, 'type', res.type)

            this.showSuccessMessage(successMessage)
          })
          .catch(this.catchResponseError(errorMessage))
      } else {
        // 如果当前博文是已发布状态，需要保存草稿
        if (!this.isDraft && this.saveAsDraft) {
          // 并且 for 字段有值，则直接更新对应草稿
          if (this.editorPost.for) {
            postClone.id = this.editorPost.for
            postClone.for = this.editorPost.id

            this.$bunblog.posts
              .editDraft(this.editorPost.for, postClone)
              .then(res => {
                Vue.set(this.editorPost, 'type', postClone.type)
                Vue.set(this.editorPost, 'for', postClone.for)
                Vue.set(this.editorPost, 'id', postClone.id)

                this.showSuccessMessage('草稿保存成功')
              })
              .catch(this.catchResponseError('草稿保存失败'))
          } else {
            // 如果 for 字段没值，说明博文以前没有草稿，新建草稿

            // 把 for 字段设置成当前博文的 id，这样当前保存的是草稿，就能和 id 对应的正文关联上了
            postClone.for = this.editorPost.id

            this.$bunblog.posts
              .new(postClone)
              .then(res => {
                console.log({
                  this: this,
                  res
                })

                Vue.set(this.editorPost, 'id', res.id)
                Vue.set(this.editorPost, 'type', res.type)
                Vue.set(this.editorPost, 'for', res.for)

                this.showSuccessMessage('草稿保存成功')
              })
              .catch(this.catchResponseError('草稿保存失败'))
          }
        }
        // 如果当前博文是已发布状态，需要发布修订
        else if (!this.isDraft && !this.saveAsDraft) {
          this.$bunblog.posts
            .edit(this.editorPost.id, postClone)
            .then(res => {
              this.showSuccessMessage('修订后的博文发布成功')
            })
            .catch(this.catchResponseError('修订版博文发布失败'))
        }
        // 如果当前为草稿，并继续保存为草稿
        else if (this.isDraft && this.saveAsDraft) {
          this.$bunblog.posts
            .editDraft(this.editorPost.id, postClone)
            .then(res => {
              this.showSuccessMessage('草稿保存成功')
            })
            .catch(this.catchResponseError('草稿保存失败'))
        }
        // 如果当前为草稿，要正式发布
        else if (this.isDraft && !this.saveAsDraft) {
          // 并且 for 字段有值，表示之前已经发布过，则直接更新对应博文
          if (this.editorPost.for) {
            postClone.id = this.editorPost.for
            postClone.for = this.editorPost.id

            this.$bunblog.posts
              .edit(this.editorPost.for, postClone)
              .then(res => {
                Vue.set(this.editorPost, 'type', postClone.type)
                Vue.set(this.editorPost, 'for', postClone.for)
                Vue.set(this.editorPost, 'id', postClone.id)

                if (this.deleteDraftAfterPublished) {
                  console.log('根据配置，需要删除草稿')
                  this.$bunblog.posts
                    .deleteDraft(postClone.for)
                    .then(res => {
                      Vue.set(this.editorPost, 'for', null)
                      this.showSuccessMessage(
                        '修订后的博文发布成功，草稿已删除'
                      )
                    })
                    .catch(error => {
                      console.log(error)

                      this.showErrorMessage(
                        '修订后的博文发布成功，但草稿删除失败'
                      )
                    })
                } else {
                  this.showSuccessMessage('修订后的博文发布成功')
                }
              })
              .catch(this.catchResponseError('修订版博文发布失败'))
          } else {
            // 如果 for 字段没值，说明这篇博文从未发布过，因此新建博文

            // 把 for 字段设置成当前草稿的 id，这样当前发布的博文，就能和 id 对应的草稿关联上了
            postClone.for = this.editorPost.id

            this.$bunblog.posts
              .new(postClone)
              .then(res => {
                Vue.set(this.editorPost, 'id', res.id)
                Vue.set(this.editorPost, 'type', res.type)
                Vue.set(this.editorPost, 'for', res.for)

                this.showSuccessMessage('博文发布成功')
              })
              .catch(this.catchResponseError('博文发布失败'))
          }
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
    onPostConfigButtonClick() {
      this.saveAsDraft = false
      this.openDrawer()
    },
    onSaveDraftButtonClick() {
      this.saveAsDraft = true

      if (this.isNewPost) {
        this.openDrawer()
      } else {
        this.onConfirmPublishButtonClick()
      }
    },
    onPublishButtonClick() {
      this.saveAsDraft = false

      if (this.isNewPost) {
        this.openDrawer()
      } else {
        this.onConfirmPublishButtonClick()
      }
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
    },
    formatLinkName() {
      if (this.editorPost.linkName) {
        Vue.set(
          this.editorPost,
          'linkName',
          this.editorPost.linkName.toLowerCase().replace(/ /g, '-')
        )
      }
    },
    initHotkey() {
      hotkeys('ctrl+s', 'post-editor', () => {
        this.onSaveDraftButtonClick()
        return false
      })

      hotkeys.setScope('post-editor')
    }
  },
  mounted() {
    this.getCategoryList()
    this.getTagList()
    this.initHotkey()

    if (this.post) {
      console.log(this.post)

      // 早期版本没限制 category 和 tag 必选，这里做一些兼容处理
      if (this.post.category) {
        this.post.category = this.post.category.linkName
      }

      if (this.post.tagList) {
        this.post.tagList = this.post.tagList.map((item, index) => {
          return item.linkName
        })
      }

      this.editorPost = this.post
    }
  },
  destroyed() {
    hotkeys.deleteScope('post-editor')
  }
}
</script>

<style scoped>
/* 受到 .v-input__icon .v-input__icon--append-outer 的启发 */
.bun-textbox-append-outer,
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