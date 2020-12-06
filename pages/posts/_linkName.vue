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
        <v-col cols="12" xl="10" lg="9" md="9" sm="12">
          <section v-highlight v-html="postContent" class="blog-post-content" />
        </v-col>
        <v-col cols="12" xl="2" lg="3" md="3" sm="0">
          <div id="AnchorArea" class="d-none d-md-block">
            <v-navigation-drawer floating permanent width="100%">
              <v-list dense>
                <template v-for="anchor in anchors">
                  <v-list-item
                    :key="anchor.href"
                    @click="$vuetify.goTo(anchor.href)"
                  >
                    <v-list-item-content>
                      <v-list-item-title>{{ anchor.title }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item
                    v-for="sub in anchor.subList"
                    :key="sub.href"
                    @click="$vuetify.goTo(sub.href)"
                    class="pl-8"
                  >
                    <v-list-item-content>
                      <v-list-item-title>{{ sub.title }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
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
import eof from '~/components/layout/EOF.vue'
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
    showGoToTopButton: false
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
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScroll)
  },
  components: {
    eof,
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