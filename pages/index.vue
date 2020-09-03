<template>
  <section class="post-list-container">
    <post-list v-bind:list="list"></post-list>
  </section>
</template>

<script>
import PostList from '~/components/post/PostList.vue'

export default {
  data() {
    return {}
  },
  async asyncData({ $axios }) {
    const list = await $axios.$get('/api/posts', {
      params: {
        type: 'post'
      }
    })

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
            '欢迎访问呼呼小笼包 (huhubun) 的个人博客。这里的文章包含了前后端软件开发技术博文、精品软件推荐等内容。欢迎大家一起学习、成长。也欢迎关注微信公众号 bundev 交流！'
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            '呼呼小笼包,huhubun,bun,bun.dev,bun.plus,技术,软件,开发,个人博客,博客,文章,精品软件,推荐'
        }
      ]
    }
  },
  components: {
    PostList
  }
}
</script>

<style lang="stylus" scoped></style>
