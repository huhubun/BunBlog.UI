<template>
  <div class="post-edit-container">
    <post-editor v-bind:post="post" v-if="post"></post-editor>
  </div>
</template>

<script>
import PostEditor from '@/components/post/PostEditor'
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
  },
  components: {
    PostEditor
  }
}
</script>

<style lang="stylus" scoped>
.post-edit-container
  margin-top: 10px
</style>
