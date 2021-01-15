<template>
  <v-app>
    <v-main>
      <post-editor-vuetify v-bind:post="post" v-if="post"></post-editor-vuetify>
    </v-main>
  </v-app>
</template>

<script>
import PostEditorVuetify from '@/components/post/PostEditorVuetify'

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
    PostEditorVuetify
  }
}
</script>

<style lang="stylus" scoped></style>
