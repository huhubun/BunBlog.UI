<template>
  <div>
    <div v-if="post">
      <div class="header">
        <h1 class="title">{{ post.title }}</h1>
        <div class="info">
          <span>
            <a-icon type="calendar" />
            发表于
            {{ formatDate(post.publishedOn) }}
            <a-divider type="vertical" />
          </span>
          <span>
            <a-icon type="eye" />
            浏览
            {{ visits }} 次
            <a-divider type="vertical" />
          </span>
          <!-- <span v-if="item.category != null">
            <a-icon type="inbox" />
            {{ item.category.displayName }}
            <a-divider type="vertical" />
          </span>
          <span v-if="item.tagList != null && item.tagList.length > 0">
            <a-icon type="tags" />
            <a-tag v-for="tag in item.tagList" v-bind:key="tag.linkName">{{ tag.displayName }}</a-tag>
          </span>-->
          <span v-if="isAlreadyLoggedIn">
            <router-link :to="{name:'admin-post-edit', params: {id: post.id}}">编辑</router-link>
          </span>
        </div>
      </div>
      <div class="content-container">
        <a-row>
          <a-col :xs="0" :md="3"></a-col>
          <a-col :xs="24" :md="18">
            <div v-html="content"></div>
          </a-col>
        </a-row>
      </div>
    </div>
    <div v-else>
      <a-skeleton active :paragraph="{ rows: 10 }" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import dayjs from 'dayjs'
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
    },
    formatDate(datetime) {
      let dayjsObj = dayjs(datetime)
      return `${dayjsObj.format('YYYY-MM-DD HH:mm')} (${dayjsObj.fromNow()})`
    }
  },
  mounted() {
    this.getPostDetail()
    this.updatePostVisits()
  }
}
</script>

<style lang="stylus" scoped>
.header
  background-color: rgba(0, 0, 0, 0.1)
  margin-bottom: 16px

.header .title
  text-align: center
  font-size: 44px
  padding: 100px 0
  margin: 0

.header .info
  text-align: right
  padding-right: 50px

.content-container
  padding: 0 16px

</style>
