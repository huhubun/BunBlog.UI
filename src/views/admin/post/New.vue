<template>
  <div class="post-new-container">
    <h1>撰写博文</h1>
    <div>
      <div>
        <a-input v-model="post.title" placeholder="标题"></a-input>
      </div>
      <div>
        <a-textarea
          v-model="post.content"
          placeholder="博文内容"
          :autosize="{ minRows: 18, maxRows: 30 }"
        ></a-textarea>
      </div>
      <div>
        <a-textarea v-model="post.excerpt" placeholder="摘要"></a-textarea>
      </div>
      <div id="post-operation">
        <a-button @click="publish" type="primary">
          <a-icon type="rocket"></a-icon>发布
        </a-button>
        <a-button @click="saveAsDraft">
          <a-icon type="cloud"></a-icon>暂存
        </a-button>
        <a-button @click="preview">预览</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { postNewBlogPost } from '@/api/post'

export default {
  data() {
    return {
      post: {
        title: '',
        excerpt: '',
        content: ''
      }
    }
  },
  methods: {
    publish() {
      postNewBlogPost(this.post).then(res => {
        this.$message.success('博文发布成功')
      }).catch(error => {
        console.error(error)
        this.$message.error('博文发布失败')
      })
    },
    saveAsDraft() {

    },
    preview() {

    }
  }
}
</script>

<style lang="stylus" scoped>
.post-new-container
  margin-top: 10px

#post-operation .ant-btn
  margin-right: 8px
</style>
