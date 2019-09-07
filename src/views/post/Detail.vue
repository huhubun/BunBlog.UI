<template>
  <div>
    <div v-if="post">
      <div class="header">
        <div>
          <div class="category">
            <a-button
              v-if="post.category != null"
              size="small"
              ghost
            >{{ post.category.displayName }}</a-button>
          </div>
          <h1 class="title">{{ post.title }}</h1>
        </div>
        <div class="info">
          <div>
            <span>
              <a-icon type="calendar" />
              发表于
              {{ formatDate(post.publishedOn) }}
            </span>
            <span class="bun-margin-left">
              <a-icon type="eye" />
              浏览
              {{ visits }} 次
            </span>
          </div>
          <div v-if="post.tagList != null && post.tagList.length > 0" class="tag-container">
            <a-icon type="tags" />
            <span class="bun-margin-left">
              <router-link
                v-for="tag in post.tagList"
                :to="{ 'name': 'tags-view', params: { linkName: tag.linkName }  }"
                v-bind:key="tag.linkName"
                class="bun-margin-right"
              >{{ tag.displayName }}</router-link>
            </span>
          </div>
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
  padding: 8px 0

  .category
    padding-top: 100px
    text-align: center

    button
      color: #000
      border-color: #000

    button:hover
      text-shadow: 0px 0px 1px #000
      box-shadow: 0px 0px 8px 0 #999, inset 0px 0px 5px 0 #999

    button:after
      border-color: #000

  .title
    text-align: center
    font-size: 44px
    padding-bottom: 100px
    margin: 0

  .info
    text-align: right
    padding-right: 50px

    .tag-container
      a
        color: black

      a:hover
        text-decoration: underline

.content-container
  padding: 0 16px
</style>
