<template>
  <div>
    <div id="post-operation">
      <a-dropdown v-if="isNewPost">
        <a-menu slot="overlay">
          <a-menu-item>暂存</a-menu-item>
        </a-menu>
        <a-button @click="openPublishDrawer">
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
          <a-button @click="publishRevised">
            发布修订版
            <a-icon type="down" />
          </a-button>
        </a-dropdown>

        <a-button @click="openPublishDrawer">
          <a-icon type="setting"></a-icon>
        </a-button>
      </div>
    </div>
    <div id="title-container">
      <a-input v-model="editorPost.title" placeholder="标题"></a-input>
    </div>
    <div id="content-container">
      <a-textarea
        v-model="editorPost.content"
        placeholder="博文内容"
        :autosize="{ minRows: 18, maxRows: 30 }"
      ></a-textarea>
    </div>
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
        <a-divider dashed>链接名称</a-divider>
        <a-input v-model="editorPost.linkName">
          <a-icon slot="prefix" type="link" />
        </a-input>
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
        <a-button @click="publishRevised" type="primary" block>确认发布修订版</a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import { postNewBlogPost, editBlogPost } from '@/api/post'
import { getList as getCategoryList } from '@/api/category'
import { getList as getTagList } from '@/api/tag'

export default {
  name: 'PostEditor',
  props: {
    // 传入的 post 对象
    post: {
      type: Object,
      default: function () {
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

      // 博文设置
      isPublishDrawerOpened: false,

      linkName: '',

      categoryList: [],
      isCategoryListLoading: true,

      tagList: [],
      isTagListLoading: true
    }
  },
  computed: {
    isNewPost() {
      return !this.editorPost.id
    }
  },
  methods: {
    openPublishDrawer() {
      this.isPublishDrawerOpened = true
    },
    closePublishDrawer() {
      this.isPublishDrawerOpened = false
    },
    publish() {
      this.closePublishDrawer()
      postNewBlogPost(this.editorPost).then(res => {
        this.$message.success('博文发布成功')

        this.editorPost.id = res.id
      }).catch(error => {
        console.error(error)
        this.$message.error('博文发布失败')
      })
    },
    publishRevised() {
      this.closePublishDrawer()
      editBlogPost(this.editorPost).then(res => {
        this.$message.success('修订版博文发布成功')
      }).catch(error => {
        console.error(error)
        this.$message.error('修订版博文发布失败')
      })
    },
    saveAsDraft() {

    },
    view() {
      let id = this.editorPost.id
      let link = this.$router.resolve({
        name: 'post-detail',
        params: { id: id }
      })

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
    }
  },
  mounted() {
    this.initEditorPost()

    getCategoryList().then(categoryList => {
      this.categoryList = categoryList
      this.isCategoryListLoading = false
    }).catch(error => {
      console.log(error)
      this.$message.error('获取分类列表失败')
    })

    getTagList().then(tagList => {
      this.tagList = tagList
      this.isTagListLoading = false
    }).catch(error => {
      console.log(error)
      this.$message.error('获取标签列表失败')
    })
  }
}
</script>

<style lang="stylus">
#post-operation
  text-align: right

#title-container
  margin-top: 8px

#content-container
  margin-top: 8px

.publish-drawer
  .ant-drawer-body
    padding-top: 0

  .ant-divider-inner-text
    .anticon
      padding-right: 8px
</style>
