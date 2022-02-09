<template>
  <v-app>
    <v-main>
      <post-editor></post-editor>
    </v-main>
  </v-app>
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
    }
  },
  components: {
    PostEditor
  }
}
</script>

<style lang="stylus" scoped></style>
