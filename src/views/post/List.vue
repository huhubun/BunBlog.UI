<template>
  <div class="post-list-container">
    <post-list v-bind:list="list"></post-list>
  </div>
</template>

<script>
import { getList } from '@/api/post'
import PostList from '@/components/post/PostList'

export default {
  metaInfo() {
    return {
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: '欢迎访问呼呼小笼包 huhubun 的个人博客。这里包含软件开发技术、精品软件推荐、日常等内容。'
        },
        {
          vmid: 'keywords',
          name: 'keywords',
          content: '呼呼小笼包,huhubun,bun.dev,技术,软件,开发,博客,文章,精品软件,推荐'
        }]
    }
  },
  data() {
    return {
      list: []
    }
  },
  components: { PostList },
  methods: {
    getPostList() {
      getList().then(posts => {
        console.log(posts)
        this.list = posts
      }).catch(err => {
        console.error(err)
      })
    }
  },
  mounted() {
    this.getPostList()
  }
}
</script>

<style lang="stylus" scoped>
.post-list-container
  padding: 0 100px
</style>
