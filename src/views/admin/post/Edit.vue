<template>
  <div class="post-edit-container">
    <h1>编辑博文</h1>

    <div v-if="post">{{ post.title }}</div>
    <div v-if="post">{{ post.excerpt }}</div>
    <div v-if="post">{{ post.content }}</div>
  </div>
</template>

<script>
import { getDetail } from '@/api/post'

export default {
  data() {
    return {
      id: this.$route.params.id,
      post: null
    }
  },
  methods: {
    getPostDetail() {
      getDetail(this.id).then(post => {
        console.log(post)
        this.post = post
        this.metadataList = this.post.metadataList
      }).catch(err => {
        console.error(err)
      })
    }
  },
  mounted() {
    this.getPostDetail()
  }
}
</script>

<style lang="stylus" scoped>
.post-edit-container
  margin-top: 10px
</style>
