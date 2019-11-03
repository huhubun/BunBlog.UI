<template>
  <div class="post-list-container">
    <post-list v-bind:list="list"></post-list>
  </div>
</template>

<script>
import PostList from '~/components/PostList.vue'

export default {
  data() {
    return {}
  },
  async asyncData({ $axios }) {
    const list = await $axios.$get('/api/posts')

    return { list }
  },
  head() {
    return {
      title: '首页',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            '欢迎访问呼呼小笼包 huhubun 的个人博客。这里包含软件开发技术、精品软件推荐、日常等内容。'
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            '呼呼小笼包,huhubun,bun.dev,技术,软件,开发,个人博客,博客,文章,精品软件,推荐'
        }
      ]
    }
  },
  components: {
    PostList
  }
}
</script>

<style lang="stylus" scoped>
.post-list-container
  padding: 0 100px
</style>
