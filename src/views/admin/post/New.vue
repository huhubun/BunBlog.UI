<template>
  <div class="post-new-container">
    <post-editor></post-editor>
  </div>
</template>

<script>
import PostEditor from '@/components/post/PostEditor'

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
  components: {
    PostEditor
  }
}
</script>

<style lang="stylus" scoped>
.post-new-container
  margin-top: 10px
</style>
