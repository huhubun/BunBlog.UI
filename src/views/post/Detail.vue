<template>
  <div>
    <div v-if="post">
      <h1>{{ post.title }}</h1>
      <div>
        <span>{{ visits }}</span>
        <span v-if="isAlreadyLoggedIn">
          <a-divider type="vertical" />
          <router-link :to="{name:'admin-post-edit', params: {id: post.id}}">编辑</router-link>
        </span>
      </div>
      <hr />
      <div v-html="content"></div>
    </div>
    <div v-else>
      <a-skeleton active :paragraph="{ rows: 10 }" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import showdown from 'showdown'
import { getDetail, UpdateVisits } from '@/api/post'
import { getVisits } from '@/helper/post'

export default {
  data() {
    return {
      id: this.$route.params.id,
      post: null,
      metadataList: null,
      content: null
    }
  },
  computed: {
    visits() {
      return getVisits(this.metadataList)
    },
    isAlreadyLoggedIn() {
      return Vue.sessionStorage.get('refreshToken')
    }
  },
  methods: {
    getPostDetail() {
      getDetail(this.id).then(post => {
        console.log(post)
        this.post = post
        this.metadataList = this.post.metadataList

        let converter = new showdown.Converter()
        this.content = converter.makeHtml(this.post.content)
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
