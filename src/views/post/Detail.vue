<template>
  <div>
    <div v-if="post">
      <h1>{{ post.title }}</h1>
      <div>{{ visits }}</div>
      <hr />
      <div>{{ post.content }}</div>
    </div>
    <div v-else>
      <a-skeleton active :paragraph="{ rows: 10 }" />
    </div>
  </div>
</template>

<script>
import { getDetail, UpdateVisits } from '@/api/post'
import { getVisits } from '@/helper/post'

export default {
  data() {
    return {
      id: this.$route.params.id,
      post: null,
      metadataList: null
    }
  },
  computed: {
    visits() {
      return getVisits(this.metadataList)
    }
  },
  methods: {
    getPostDetail() {
      getDetail(this.id).then(post => {
        console.log(post)
        this.post = post
        this.metadataList = this.post.metadataList
      }).catch(err => {
        console.error(err)
      })
    },
    updatePostVisits() {
      UpdateVisits(this.id).then(res => {
        console.log(res)
      }).catch(err => {
        console.error(err)
      })
    }
  },
  mounted() {
    this.getPostDetail()
    this.updatePostVisits()
  }
}
</script>

<style lang="stylus" scoped></style>
