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
              {{ getVisits(post.metadataList) }} 次
            </span>
          </div>
          <div v-if="post.tagList != null && post.tagList.length > 0" class="tag-container">
            <a-icon type="tags" />
            <span class="bun-margin-left">
              <n-link
                v-for="tag in post.tagList"
                :to="`/tags/${tag.linkName}`"
                v-bind:key="tag.linkName"
                class="bun-margin-right"
              >{{ tag.displayName }}</n-link>
            </span>
          </div>
        </div>
      </div>
      <div class="content-container">
        <a-row>
          <a-col :xs="0" :md="3"></a-col>
          <a-col :xs="24" :md="18">
            <div v-html="content"></div>
            <eof />
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
import dayjs from 'dayjs'
import showdown from 'showdown'
import eof from '~/components/layout/EOF.vue'

export default {
  data() {
    return {
      visits: 0
    }
  },
  async asyncData({ $axios, params }) {
    let post = await $axios.$get(`/api/posts/${params.linkName}`)

    $axios.$post(`/api/posts/${post.id}/visits`)

    let converter = new showdown.Converter()
    let content = converter.makeHtml(post.content)

    return { post, content }
  },
  methods: {
    formatDate(datetime) {
      let dayjsObj = dayjs(datetime)
      return `${dayjsObj.format('YYYY-MM-DD HH:mm')} (${dayjsObj.fromNow()})`
    },
    getVisits(metadataList) {
      if (metadataList) {
        let metadata = metadataList.filter(ele => ele.key === 'VISITS')
        if (metadata) {
          return metadata[0].value
        }
      }

      return 0
    }
  },
  head() {
    return {
      title: this.post.title,
      meta: [
        { hid: 'description', name: 'description', content: this.post.excerpt }
      ]
    }
  },
  components: {
    eof
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
