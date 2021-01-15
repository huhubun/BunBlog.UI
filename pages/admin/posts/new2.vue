<template>
  <div class="post-new-container">
    <post-editor></post-editor>
  </div>
</template>

<script>
import PostEditor from '@/components/post/PostEditor'

export default {
  layout: 'post-editor',
  head() {
    return {
      title: '撰写博文'
    }
  },
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

<style lang="stylus" scoped></style>
