<template>
  <v-app>
    <v-main>
      <post-editor v-bind:post="post" v-if="post"></post-editor>
    </v-main>
  </v-app>
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
    async getPostById() {
      this.post = await this.$bunblog.posts.getById(this.id)
    }
  },
  mounted() {
    this.getPostById()
  },
  components: {
    PostEditor
  }
}
</script>

<style lang="stylus" scoped></style>
