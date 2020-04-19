<template>
  <div>
    <div v-if="post">
      <div class="header">
        <div>
          <div class="category">
            <n-link v-if="post.category != null" size="small" to="#">{{ post.category.displayName }}</n-link>
          </div>
          <h1 class="title">{{ post.title }}</h1>
        </div>
        <div class="info">
          <a-row>
            <a-col :xs="0" :md="3"></a-col>
            <a-col :xs="24" :md="17">
              <div>
                <span>
                  <a-icon type="calendar" />
                  {{ formatDate(post.publishedOn) }}
                </span>
                <span class="bun-margin-left">
                  <a-icon type="eye" />
                  {{ getVisits(post.metadataList) }}
                </span>

                <span v-if="post.tagList != null && post.tagList.length > 0" class="tag-container">
                  <n-link v-for="tag in post.tagList" v-bind:key="tag.linkName" to="#">
                    <a-tag color="rgb(89,89,89)">{{ tag.displayName }}</a-tag>
                  </n-link>
                </span>
              </div>
            </a-col>
            <a-col :xs="0" :md="4"></a-col>
          </a-row>
        </div>
      </div>
      <div class="content-container">
        <a-row>
          <a-col :xs="0" :md="3"></a-col>
          <a-col :xs="24" :md="16">
            <blockquote>
              <p>{{post.excerpt}}</p>
            </blockquote>
            <div v-highlight v-html="content" class="bun-post-content"></div>
          </a-col>
          <a-col :xs="0" :md="1"></a-col>
          <a-col :xs="0" :md="4">
            <a-anchor wrapperClass="anchor-margin" :offsetTop="84">
              <a-anchor-link
                v-for="anchor in anchors"
                v-bind:key="`${anchor.href}_${anchor.title}`"
                :href="anchor.href"
                :title="anchor.title"
              >
                <a-anchor-link
                  v-for="subAnchor in anchor.subList"
                  v-bind:key="`${subAnchor.href}_${subAnchor.title}`"
                  :href="subAnchor.href"
                  :title="subAnchor.title"
                />
              </a-anchor-link>
            </a-anchor>
          </a-col>
        </a-row>
        <div id="cc-container" style>
          <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">
            <img
              alt="知识共享许可协议"
              style="border-width:0"
              src="https://i.creativecommons.org/l/by-nc/4.0/80x15.png"
            />
          </a>
          <br />
          <span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">{{ post.title }}</span> 由
          <a
            xmlns:cc="http://creativecommons.org/ns#"
            href="https://bun.plus"
            property="cc:attributionName"
            rel="cc:attributionURL"
          >huhubun</a>
          采用
          <a
            rel="license"
            href="http://creativecommons.org/licenses/by-nc/4.0/"
          >知识共享 署名-非商业性使用 4.0 国际 许可协议</a> 进行许可。
          <br />基于
          <a
            xmlns:dct="http://purl.org/dc/terms/"
            :href="'https://bun.plus/posts/' + post.linkName"
            rel="dct:source"
          >https://bun.plus/posts/{{ post.linkName }}</a> 上的作品创作。
        </div>
        <eof />
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
      visits: 0,
      anchors: []
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
  mounted() {
    this.anchors = this.$bunHelper.generateAnchors(
      document.querySelector('.bun-post-content')
    )
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

    a
      color: rgba(0, 0, 0, 0.65)
      border: 1px solid rgba(0, 0, 0, 0.65)
      padding: 2px 6px
      border-radius: 4px

    a:hover
      color: #333

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
    text-align: left
    padding: 0 0 0 16px

    .tag-container
      float: right

      a
        color: rgba(0, 0, 0, 0.65)

      a:hover
        text-decoration: underline

.content-container
  padding: 0 16px

#cc-container
  text-align: right
  padding-right: 5%
  font-size: 0.9em
  line-height: 1.6em
  margin-top: 48px

  img
    margin-bottom: 16px
    box-shadow: 0px 0px 12px 0 #999

  a
    color: rgba(0, 0, 0, 1)
    text-decoration: underline
</style>
