<template>
  <div>
    <a-row id="post-editor">
      <a-col :span="5" class="left-container">
        <div>
          <a-button @click="goToAdminPostList" type="link" icon="left">返回博文列表</a-button>
        </div>
      </a-col>
      <a-col :span="14" class="editor-container">
        <div id="post-operation">
          <span style="float: left">
            <a-button-group>
              <a-button
                @click="onUploadImageClick"
                icon="picture"
                type="primary"
                ghost
                class="bun-btn-upload-image bun-btn-post-editor"
              ></a-button>
            </a-button-group>
          </span>

          <a-dropdown v-if="isNewPost">
            <a-menu slot="overlay">
              <a-menu-item>暂存</a-menu-item>
            </a-menu>
            <a-button
              @click="openPublishDrawer"
              type="primary"
              ghost
              class="bun-btn-publish-new bun-btn-post-editor"
            >
              发布
              <a-icon type="down" />
            </a-button>
          </a-dropdown>

          <div v-if="!isNewPost">
            <a-dropdown>
              <a-menu slot="overlay">
                <a-menu-item>暂存</a-menu-item>
                <a-menu-divider />
                <a-menu-item @click="view">查看已发布…</a-menu-item>
              </a-menu>
              <a-button
                @click="publishRevised"
                type="primary"
                ghost
                class="bun-btn-publish-revised bun-btn-post-editor"
              >
                发布修订版
                <a-icon type="down" />
              </a-button>
            </a-dropdown>

            <a-button
              @click="openPublishDrawer"
              type="primary"
              ghost
              class="bun-btn-open-publish-drawer bun-btn-post-editor"
            >
              <a-icon type="setting"></a-icon>
            </a-button>
          </div>
        </div>
        <div id="title-container">
          <a-input v-model="editorPost.title" placeholder="标题" :autoFocus="autoFocusTitle"></a-input>
        </div>
        <div id="content-container">
          <a-textarea
            v-model="editorPost.content"
            placeholder="博文内容"
            v-bind:style="{ height: editorTextareaHeight + 'px' }"
          ></a-textarea>
        </div>
      </a-col>
      <a-col :span="5" class="right-container">
        <div class="word-count-container">0 字</div>
      </a-col>
    </a-row>

    <a-drawer
      title="博文设置"
      placement="right"
      :closable="true"
      :visible="isPublishDrawerOpened"
      :width="400"
      @close="closePublishDrawer"
      wrapClassName="publish-drawer"
    >
      <div>
        <a-divider dashed>
          <a-icon type="link" />链接名称
        </a-divider>
        <a-input v-model="editorPost.linkName" />
      </div>
      <div>
        <a-divider dashed>
          <a-icon type="inbox" />分类
        </a-divider>
        <a-select
          :loading="isCategoryListLoading"
          v-model="editorPost.category"
          style="width: 100%"
        >
          <a-select-option
            v-for="category in categoryList"
            v-bind:key="category.linkName"
            v-bind:value="category.linkName"
          >{{ category.displayName }}</a-select-option>
        </a-select>
      </div>
      <div>
        <a-divider dashed>
          <a-icon type="tags" />标签
        </a-divider>
        <a-select
          :loading="isTagListLoading"
          v-model="editorPost.tagList"
          mode="multiple"
          style="width: 100%"
        >
          <a-select-option
            v-for="tag in tagList"
            v-bind:key="tag.linkName"
            v-bind:value="tag.linkName"
          >{{ tag.displayName }}</a-select-option>
        </a-select>
      </div>
      <div>
        <a-divider dashed>摘要</a-divider>
        <a-textarea
          v-model="editorPost.excerpt"
          placeholder="摘要"
          :autosize="{ minRows: 4, maxRows: 10 }"
        ></a-textarea>
      </div>

      <div class="bun-margin-top-2x" v-if="isNewPost">
        <a-button @click="publish" type="primary" block>确认发布</a-button>
      </div>
      <div class="bun-margin-top-2x" v-else>
        <a-button @click="publishRevised" type="primary" block>确认并发布修订版</a-button>
      </div>
    </a-drawer>

    <a-modal
      :visible="isUploadImageModalDisplayed"
      title="插入图片"
      @ok="onUploadImageModalClickOk"
      @cancel="onUploadImageModalClickCancel"
    >
      <div>
        <a-input v-model="uploadImage.inputUrl" placeholder="输入 URL"></a-input>
      </div>
      <a-divider dashed />
      <div>
        <a-upload-dragger
          name="image"
          :action="uploadImageUrl"
          :multiple="false"
          :showUploadList="false"
          :headers="{Authorization: `Bearer ${$store.state.currentUser.accessToken}`}"
          accept="image/png, image/jpg"
          @change="onUploadImageChange"
        >
          <p class="ant-upload-drag-icon">
            <a-icon type="inbox" />
          </p>
          <p class="ant-upload-text">点击或者将图片拖动到此处进行上传</p>
        </a-upload-dragger>
      </div>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'PostEditor',
  props: {
    // 传入的 post 对象
    post: {
      type: Object,
      default: function() {
        return {
          id: null,
          title: '',
          excerpt: '',
          content: '',
          linkName: '',
          category: '',
          tagList: []
        }
      },
      required: false
    }
  },
  data() {
    return {
      // 编辑器使用的 post 对象
      editorPost: {},
      // 编辑器 textarea 的高度
      editorTextareaHeight: 300,
      autoFocusTitle: false,

      // 博文设置
      isPublishDrawerOpened: false,

      linkName: '',

      categoryList: [],
      isCategoryListLoading: true,

      tagList: [],
      isTagListLoading: true,

      // 图片上传
      isUploadImageModalDisplayed: false,
      uploadImageUrl: this.getUploadImageUrl(),
      uploadImage: {
        inputUrl: '',
        image: '',
        uploadUrl: ''
      },

      // 浏览器窗体
      windowHeight: 0
    }
  },
  computed: {
    isNewPost() {
      return !this.editorPost.id
    }
  },
  methods: {
    getCategoryList() {
      return this.$axios.get(`/api/categories`)
    },
    getTagList() {
      return this.$axios.get(`/api/tags`)
    },
    postNewBlogPost(blogPost) {
      return this.$axios.post(`/api/posts`, blogPost)
    },
    editBlogPost(blogPost) {
      return this.$axios.put(`/api/posts/${blogPost.id}`, blogPost)
    },
    getUploadImageUrl() {
      return `${process.env.BUN_BLOG_API_BASE_URL}/api/images`
    },
    openPublishDrawer() {
      this.isPublishDrawerOpened = true
    },
    closePublishDrawer() {
      this.isPublishDrawerOpened = false
    },
    publish() {
      this.closePublishDrawer()
      this.postNewBlogPost(this.editorPost)
        .then(res => {
          this.$message.success('博文发布成功')

          this.editorPost.id = res.data.id
        })
        .catch(error => this.publishFailHandler(error))
    },
    publishRevised() {
      this.closePublishDrawer()
      this.editBlogPost(this.editorPost)
        .then(res => {
          this.$message.success('修订版博文发布成功')
        })
        .catch(error => this.publishFailHandler(error))
    },
    publishFailHandler(error) {
      console.error(error)

      let messageContent = '博文发布失败'

      if (!this.isNewPost) {
        messageContent = '修订版博文发布失败'
      }

      let modelValidationErrorMessage = this.$bunHelper.tryParseModelValidationError(
        error.response.data
      )
      if (modelValidationErrorMessage) {
        messageContent += ` ${modelValidationErrorMessage}`
      }

      console.error(messageContent)

      this.$message.error(messageContent, 6)
    },
    saveAsDraft() {},
    view() {
      let linkName = this.editorPost.linkName
      let link = this.$router.resolve(`/posts/${linkName}`)

      window.open(link.href)
    },
    initEditorPost() {
      let post = this.post
      let editorPost = {
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        linkName: post.linkName,
        category: null,
        tagList: []
      }

      if (post.category) {
        editorPost.category = post.category.linkName
      }

      editorPost.tagList = post.tagList.map((item, index) => {
        return item.linkName
      })

      this.editorPost = editorPost
    },
    goToAdminPostList() {
      this.$router.push('/admin/post')
    },
    onUploadImageClick() {
      this.isUploadImageModalDisplayed = true
    },
    onUploadImageModalClickOk() {
      let inputUrl = this.uploadImage.inputUrl
      if (inputUrl) {
        this.addImageUrlToEditorTextarea(inputUrl)
      }

      this.closeUploadImageModal()
    },
    onUploadImageModalClickCancel() {
      this.closeUploadImageModal()
    },
    closeUploadImageModal() {
      this.uploadImage.inputUrl = ''
      this.isUploadImageModalDisplayed = false
    },
    onUploadImageChange(info) {
      let status = info.file.status
      if (status === 'done') {
        this.$message.success('图片上传成功')

        let response = info.file.response
        this.addImageUrlToEditorTextarea(response.url)

        this.closeUploadImageModal()
      }

      if (status === 'error') {
        this.$message.error('图片上传失败')
        console.log(info)
      }
    },
    addImageUrlToEditorTextarea(url) {
      let urlMarkdown = `\n![图片描述](${url})`

      this.editorPost.content += urlMarkdown
    },
    onWindowResize() {
      this.windowHeight = window.innerHeight
    },
    calcEditorTextareaHeight() {
      // .post-new-container padding-top 8px
      // container margin-top 8px
      // .content-container margin-top 8px
      // 底部留 16px 空白
      let otherHeight = 8 + 8 + 8 + 16 + 32 + 45

      let autoHeight = this.windowHeight - otherHeight

      return autoHeight > 300 ? autoHeight : 300
    }
  },
  mounted() {
    let bodyStyle = document.getElementsByTagName('body')[0].style
    // 进入博文编辑器后使用护眼的黄色背景
    bodyStyle.backgroundColor = 'rgb(253, 246, 227)'
    // 修正 100% 高度导致滚动条一直显示的问题
    bodyStyle.height = 'auto'

    this.initEditorPost()

    window.addEventListener('resize', this.onWindowResize)
    this.onWindowResize()

    if (this.isNewPost) {
      this.autoFocusTitle = true
    }

    this.getCategoryList()
      .then(categoryList => {
        this.categoryList = categoryList.data
        this.isCategoryListLoading = false
      })
      .catch(error => {
        console.log(error)
        this.$message.error('获取分类列表失败')
      })

    this.getTagList()
      .then(tagList => {
        this.tagList = tagList.data
        this.isTagListLoading = false
      })
      .catch(error => {
        console.log(error)
        this.$message.error('获取标签列表失败')
      })
  },
  beforeDestroy() {
    let bodyStyle = document.getElementsByTagName('body')[0].style
    bodyStyle.backgroundColor = null
    bodyStyle.height = null

    window.removeEventListener('resize', this.onWindowResize)
  },
  watch: {
    windowHeight(newValue) {
      this.editorTextareaHeight = this.calcEditorTextareaHeight()
    }
  }
}
</script>

<style lang="stylus" scoped>
.bun-btn-post-editor
  border-color: rgb(123, 131, 125)
  color: rgb(51, 51, 51)

.bun-btn-post-editor:hover
  border-color: rgb(51, 51, 51)
  color: #000

#post-editor
  margin-top: 8px

  .left-container
    text-align: center

#post-operation
  text-align: right

#title-container
  margin-top: 8px

  input
    font-size: 1.8em
    height: 1.8em
    border-top: 0
    border-right: 0
    border-left: 0
    border-color: rgb(253, 246, 227)
    border-radius: 0
    box-shadow: none /* 消除 antd 给 hover 的文本框增加的蓝色边框 */

  input:hover
    border-color: rgb(201, 200, 186)

#content-container
  margin-top: 8px

  textarea
    font-size: 1.2em
    border: 1px solid rgb(253, 246, 227)
    resize: none
    box-shadow: none /* 消除 antd 给 hover 的文本框增加的蓝色边框 */

  textarea:hover
    border: 1px solid rgb(201, 200, 186)

#title-container input, #content-container textarea
  background-color: rgb(253, 246, 227)

.publish-drawer
  .ant-drawer-body
    padding-top: 0

  .ant-divider-inner-text
    .anticon
      padding-right: 8px
</style>
