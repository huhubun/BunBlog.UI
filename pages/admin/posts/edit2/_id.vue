<template>
  <div class="post-edit-container">
    <post-editor v-bind:post="post" v-if="post"></post-editor>
  </div>
</template>

<script>
import PostEditor from '@/components/post/PostEditor'

export default {
  layout: 'post-editor',
  head() {
    return {
      title: '修订博文'
    }
  },
  data() {
    return {
      id: this.$route.params.id,
      post: null
    }
  },
  methods: {
    getPostDetail() {
      this.$axios
        .get(`/api/posts/${this.id}`)
        .then(post => {
          this.post = post.data
          this.metadataList = this.post.metadataList
        })
        .catch(err => {
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

<style lang="stylus" scoped></style>
