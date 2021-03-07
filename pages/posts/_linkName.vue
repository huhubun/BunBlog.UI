<template>
  <article>
    <header class="blog-header">
      <v-card
        flat
        tile
        :height="blogPostHeaderHeight"
        :style="styling.titleBg"
        :class="styling.titleBg ? '' : 'blue-grey darken-1'"
        class="white--text"
      >
        <v-container
          class="d-flex flex-column"
          :style="{ height: `${blogPostHeaderHeight}px` }"
        >
          <v-card-subtitle class="text-right pa-0" v-if="post.category">
            <v-chip
              small
              label
              class="title-category blue-grey--text text--darken-4"
              :color="
                styling.isLightenTitleBg ? 'transparent' : 'blue-grey lighten-2'
              "
            >
              {{ post.category.displayName }}
            </v-chip>
          </v-card-subtitle>

          <v-spacer />

          <v-card-title
            class="justify-center text-h4 text-md-h3 text-lg-h2"
            :style="{ textShadow: styling.titleTextShadow }"
          >
            {{ post.title }}
          </v-card-title>

          <v-spacer />

          <v-card-text class="align-end pa-0">
            <div
              class="d-flex"
              :class="
                this.$vuetify.breakpoint.mdAndUp
                  ? 'justify-space-between'
                  : 'flex-column'
              "
            >
              <div class="py-0">
                <v-chip
                  v-for="headerIcon in headerIcons"
                  :key="headerIcon.icon"
                  small
                  color="transparent"
                  class="blue-grey--text"
                  :title="headerIcon.tooltip"
                  :class="
                    styling.isLightenTitleBg
                      ? 'text--darken-4'
                      : 'text--lighten-4'
                  "
                >
                  <v-avatar left>
                    <v-icon small>{{ headerIcon.icon }}</v-icon>
                  </v-avatar>

                  {{ headerIcon.text }}
                </v-chip>
              </div>

              <div
                class="py-0"
                :class="
                  $vuetify.breakpoint.mdAndUp ? 'text-right' : 'text-left'
                "
              >
                <div v-if="post.tagList" :class="$vuetify.breakpoint.mdAndUp ? '' : 'mt-1'">
                  <v-chip
                    v-for="tag in post.tagList"
                    :key="tag.linkName"
                    small
                    class="title-tag blue-grey--text text--darken-4"
                    :class="$vuetify.breakpoint.mdAndUp ? 'ml-2' : 'mr-2'"
                    :color="
                      styling.isLightenTitleBg
                        ? 'transparent'
                        : 'blue-grey lighten-2'
                    "
                  >
                    {{ tag.displayName }}
                  </v-chip>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-container>
      </v-card>
    </header>

    <v-container class="blog-post-container">
      <v-row>
        <!-- TODO 考虑在这里加个目录（默认折叠）供 < md 的屏幕尺寸查看；或者在返回顶部的按钮上面加个目录按钮 -->

        <!-- 博文内容 -->
        <v-col cols="12" xl="10" lg="9" md="9" sm="12" class="py-0">
          <blockquote>
            <p>{{ post.excerpt }}</p>
          </blockquote>

          <section
            v-highlight
            v-html="postContent"
            v-lazy-container="{ selector: 'img' }"
            class="blog-post-content"
          />

          <creative-commons v-bind:post="post" class="bun-blog-post-link" />
        </v-col>

        <!-- 右侧页内导航 -->
        <v-col
          cols="12"
          xl="2"
          lg="3"
          md="3"
          sm="0"
          id="AnchorContainer"
          class="py-0"
        >
          <div
            id="AnchorArea"
            class="d-none d-md-block"
            :style="{ width: `${anchorWidth}px` }"
          >
            <v-navigation-drawer floating permanent width="100%">
              <v-list dense>
                <v-list-item-group v-model="anchorActiveItem">
                  <template v-for="anchor in anchors">
                    <v-list-item
                      :key="anchor.href"
                      :value="anchor.href"
                      @click="$vuetify.goTo(anchor.href)"
                    >
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ anchor.title }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item
                      v-for="sub in anchor.subList"
                      :key="sub.href"
                      :value="sub.href"
                      @click="$vuetify.goTo(sub.href)"
                      class="pl-8"
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{ sub.title }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-list-item-group>
              </v-list>
            </v-navigation-drawer>
          </div>

          <v-slide-y-reverse-transition>
            <v-btn
              bottom
              right
              fixed
              fab
              v-if="showGoToTopButton"
              @click="$vuetify.goTo(0)"
            >
              <v-icon>mdi-chevron-up</v-icon>
            </v-btn>
          </v-slide-y-reverse-transition>
        </v-col>
      </v-row>
    </v-container>
  </article>
</template>


<script>
import dayjs from 'dayjs'
import showdown from 'showdown'
import CreativeCommons from '@/components/layout/CreativeCommons'

export default {
  layout: 'vuetify-default',
  async asyncData({ $bunblog, params }) {
    const post = await $bunblog.posts.getByLinkName(params.linkName)

    const converter = new showdown.Converter({ extensions: ['vue-img-lazy'] })
    const postContent = converter.makeHtml(post.content)

    $bunblog.posts.visits(post.id)

    return { post, postContent }
  },
  data() {
    return {
      anchors: [],
      anchorWidth: 0,
      showGoToTopButton: false,
      anchorActiveItem: null,
      anchorActiveItemTimeoutId: null,

      styling: {
        titleBg: null
      }
    }
  },
  methods: {
    formatDate(datetime, needFullText) {
      let dayjsObj = dayjs(datetime)

      if (needFullText) {
        return `${dayjsObj.format(
          'YYYY-MM-DD HH:mm'
        )} ( ${dayjsObj.fromNow()} )`
      }

      return dayjsObj.fromNow()
    },
    getVisits(metadataList) {
      if (metadataList) {
        let metadata = metadataList.filter(ele => ele.key === 'VISITS')
        if (metadata) {
          return metadata[0].value
        }
      }

      return 0
    },
    onScrollYGreaterThan400() {
      // TODO 考虑用指令实现？（问题：如何在指令里绑定和移除事件？）

      let anchorAreaElement = document.querySelector('#AnchorArea')

      if (window.scrollY >= 400) {
        // 右侧页内导航栏浮动效果
        anchorAreaElement.classList.add('fixed-anchor')

        // 返回顶部按钮
        this.showGoToTopButton = true
      } else {
        anchorAreaElement.classList.remove('fixed-anchor')
        this.showGoToTopButton = false
      }
    },
    onScrollUpdateAnchorActiveItem() {
      // 页内导航高亮
      if (this.anchorActiveItemTimeoutId != null) {
        clearTimeout(this.anchorActiveItemTimeoutId)
      }

      this.anchorActiveItemTimeoutId = setTimeout(() => {
        let currentAnchor = null
        let scrollY = Math.ceil(window.scrollY)

        for (let i = 0; i < this.anchors.length; i++) {
          if (
            scrollY >= document.querySelector(this.anchors[i].href).offsetTop
          ) {
            currentAnchor = this.anchors[i]
          }
        }

        if (currentAnchor && currentAnchor.subList) {
          let subAnchor = null

          for (let j = 0; j < currentAnchor.subList.length; j++) {
            if (
              scrollY >=
              document.querySelector(currentAnchor.subList[j].href).offsetTop
            ) {
              subAnchor = currentAnchor.subList[j]
            }
          }

          if (subAnchor) {
            currentAnchor = subAnchor
          }
        }

        if (currentAnchor) {
          this.anchorActiveItem = currentAnchor.href
        } else {
          this.anchorActiveItem = null
        }
      }, 100)
    },
    onResizeUpdateAnchorWidth() {
      // 24 = container 的 padding，左右各 12px
      let anchorContainer = document.querySelector('#AnchorContainer')
      if (anchorContainer) {
        this.anchorWidth = anchorContainer.clientWidth - 24
      }
    }
  },
  head() {
    let head = {
      title: this.post.title,
      meta: [
        { hid: 'description', name: 'description', content: this.post.excerpt }
      ]
    }

    if (this.hasTagList) {
      let keywords = this.post.tagList.map(t => t.displayName).join(',')

      head.meta.push({
        hid: 'keywords',
        name: 'keywords',
        content: keywords
      })
    }

    return head
  },
  computed: {
    blogPostHeaderHeight() {
      return 400 //this.$vuetify.breakpoint.mdAndUp ? 400 : 260
    },
    headerIcons: function () {
      let fullPublishedOn = this.formatDate(this.post.publishedOn, true)
      let simplifyPublishedOn = this.formatDate(this.post.publishedOn)
      let visits = this.getVisits(this.post.metadataList)

      return [
        {
          icon: 'mdi-calendar-blank-outline',
          text: this.$vuetify.breakpoint.mdAndUp
            ? fullPublishedOn
            : simplifyPublishedOn,
          tooltip: `发布于 ${fullPublishedOn}`
        },
        {
          icon: 'mdi-eye-outline',
          text: visits,
          tooltip: `阅读量 ${visits}`
        }
      ]
    }
  },
  mounted() {
    this.anchors = this.$bunHelper.generateAnchors(
      document.querySelector('.blog-post-content')
    )

    this.onResizeUpdateAnchorWidth()

    window.addEventListener('scroll', this.onScrollYGreaterThan400)
    window.addEventListener('scroll', this.onScrollUpdateAnchorActiveItem)
    window.addEventListener('resize', this.onResizeUpdateAnchorWidth)

    // 默认样式
    this.styling.isLightenTitleBg = false
    this.styling.titleTextShadow = null

    // 如果博文有自定义样式，再覆盖默认样式
    if (this.post.styling) {
      let styling = JSON.parse(this.post.styling)

      // 标题背景
      if (styling.titleBg) {
        this.styling.isLightenTitleBg =
          styling.titleBg.isLightenTitleBg || false

        this.styling.titleTextShadow = styling.titleBg.titleTextShadow

        if (styling.titleBg.content && styling.titleBg.content.length > 0) {
          let bgStyle = styling.titleBg.content
            .map(
              item =>
                `radial-gradient(circle at ${item.x}% ${item.y}%, rgba(${item.color.r}, ${item.color.g}, ${item.color.b}, ${item.color.a}), rgba(${item.color.r}, ${item.color.g}, ${item.color.b}, 0) ${item.size}%)`
            )
            .join()

          this.styling.titleBg = {
            background: bgStyle
          }
        }
      }
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScrollYGreaterThan400)
    window.removeEventListener('scroll', this.onScrollUpdateAnchorActiveItem)
    window.removeEventListener('resize', this.onResizeUpdateAnchorWidth)
  },
  components: {
    CreativeCommons
  }
}
</script>

<style lang="stylus" scoped>
.blog-post-container
  font-size: 1rem

.fixed-anchor
  position: fixed
  top: 88px
</style>