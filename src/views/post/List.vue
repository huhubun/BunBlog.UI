<template>
  <div>
    <post-list v-bind:list="list"></post-list>
  </div>
</template>

<script>
import { getList } from '@/api/post'
import PostList from '@/components/post/PostList'

export default {
  data() {
    return {
      list: []
    }
  },
  components: { PostList },
  methods: {
    getPostList() {
      getList().then(res => {
        console.log(res)
        this.list = res.data
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

<style lang="stylus" scoped></style>
