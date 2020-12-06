<template>
  <article>
    <header>
      <v-card flat tile height="400" class="blue-grey darken-1 white--text">
        <v-card-title class="display-3">
          <v-container>
            {{ post.title }}
          </v-container>
        </v-card-title>
      </v-card>
    </header>

    <v-container class="blog-post-container">
      <v-row>
        <!-- TODO 考虑在这里加个目录（默认折叠）供 < md 的屏幕尺寸查看；或者在返回顶部的按钮上面加个目录按钮 -->

        <!-- 博文内容 -->
        <v-col cols="12" xl="10" lg="9" md="9" sm="12">
          <section
            v-highlight
            v-html="postContent"
            v-lazy-container="{ selector: 'img' }"
            class="blog-post-content"
          />
          <creative-commons v-bind:post="post" />
        </v-col>

        <!-- 右侧页内导航 -->
        <v-col cols="12" xl="2" lg="3" md="3" sm="0">
          <div id="AnchorArea" class="d-none d-md-block">
            <v-navigation-drawer floating permanent width="100%">
              <v-list dense>
                <v-list-item-group v-model="selectedItem">
                  <template v-for="anchor in anchors">
                    <v-list-item
                      :key="anchor.href"
                      :value="anchor.href"
                      @click="$vuetify.goTo(anchor.href)"
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{
                          anchor.title
                        }}</v-list-item-title>
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

    const anchors = []

    return { post, postContent, anchors }
  },
  data: () => ({
    showGoToTopButton: false,
    selectedItem: null,
    timeout: null
  }),
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
    },
    onScroll() {
      // TODO 考虑用指令实现？（问题：如何在指令里绑定和移除事件？）

      if (window.scrollY >= 400) {
        // 右侧页内导航栏浮动效果
        document.querySelector('#AnchorArea').classList.add('fixed-anchor')

        // 返回顶部按钮
        this.showGoToTopButton = true
      } else {
        document.querySelector('#AnchorArea').classList.remove('fixed-anchor')
        this.showGoToTopButton = false
      }
    },
    onScroll2() {
      // 页内导航高亮
      if (this.timeout != null) {
        clearTimeout(this.timeout)
      }

      this.timeout = setTimeout(() => {
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
          this.selectedItem = currentAnchor.href
        } else {
          this.selectedItem = null
        }
      }, 200)
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
  mounted() {
    this.anchors = this.$bunHelper.generateAnchors(
      document.querySelector('.blog-post-content')
    )

    window.addEventListener('scroll', this.onScroll)
    window.addEventListener('scroll', this.onScroll2)
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScroll)
    window.removeEventListener('scroll', this.onScroll2)
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