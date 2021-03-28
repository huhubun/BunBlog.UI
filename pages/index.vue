<template>
  <div class="blue-grey lighten-5" style="height: 100%">
    <v-container>
      <v-row>
        <v-col
          v-for="post in posts.items"
          :key="post.linkName"
          cols="12"
          xl="3"
          lg="4"
          md="6"
          sm="6"
        >
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-card
                :to="'/posts/' + post.linkName"
                class="d-flex flex-column"
                :class="`elevation-${hover ? 12 : 0} transition-swing`"
                height="100%"
                rounded="lg"
              >
                <post-list-title-bg :styling="post.styling"></post-list-title-bg>

                <v-card-title>{{ post.title }}</v-card-title>

                <v-card-text>{{ post.excerpt }}</v-card-text>

                <v-spacer></v-spacer>

                <v-card-text class="align-end pt-0">
                  <v-row>
                    <v-col cols="6" class="py-0">
                      <span v-if="post.category">
                        {{ post.category.displayName }}
                      </span>
                    </v-col>
                    <v-col cols="6" class="text-right py-0">
                      <span v-if="post.metadataList">
                        <v-icon small class="mr-1">mdi-eye-outline</v-icon>
                        <span
                          v-for="metadata in post.metadataList"
                          :key="metadata.key"
                        >
                          {{ metadata.value }}
                        </span>

                        <span class="ma-1">|</span>
                      </span>

                      <span>
                        {{
                          convertDatetimeToFromNowStrOrDate(post.publishedOn)
                        }}
                      </span>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </template>
          </v-hover>
        </v-col>
      </v-row>
      <div v-if="posts" class="mt-4">
        <v-pagination
          v-model="posts.page"
          :length="posts.totalPage"
          @input="onPageChange"
        />
      </div>
    </v-container>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  async asyncData({ $bunblog }) {
    const posts = await $bunblog.posts.getList({
      type: 'post',
      pageSize: '12'
    })

    return { posts }
  },
  data() {
    return {
      clipped: true,
      drawer: false,
      items: [
        {
          icon: 'mdi-home-outline',
          title: '首页',
          to: '/'
        },
        {
          icon: 'mdi-file-document-outline',
          title: '文档',
          href: 'https://github.com/huhubun/DDNSSharp'
        },
        {
          icon: 'mdi-history',
          title: '更新记录',
          href: 'https://github.com/huhubun/DDNSSharp/releases'
        },
        {
          icon: 'mdi-keyboard-return',
          title: 'BUN.DEV',
          href: 'https://bun.dev/'
        }
      ],
      title: 'DDNSSharp',
      footers: [
        {
          text: '源代码',
          href: 'https://github.com/huhubun/DDNSSharp'
        },
        {
          text: 'bun.dev 旗下作品',
          href: 'https://bun.dev'
        }
      ]
    }
  },
  methods: {
    convertDatetimeToFromNowStrOrDate(datetime) {
      let nowDayjsObj = dayjs()
      let datetimeDayjsObj = dayjs(datetime)

      if (nowDayjsObj.subtract(6, 'month').isBefore(datetimeDayjsObj, 'day')) {
        return datetimeDayjsObj.fromNow()
      }

      return datetimeDayjsObj.format('YYYY-MM-DD')
    },
    async onPageChange(p) {
      this.posts = await this.$bunblog.posts.getList({
        type: 'post',
        pageSize: '12',
        page: p
      })
    }
  },
  head() {
    return {
      title: '首页',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            '欢迎访问呼呼小笼包 (huhubun) 的个人博客。这里的文章包含了前后端软件开发技术博文、精品软件推荐等内容。欢迎大家一起学习、成长。也欢迎关注微信公众号 bundev 交流。'
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            '呼呼小笼包,huhubun,bun,bun.dev,bun.plus,技术,软件,开发,个人博客,博客,文章,精品软件,推荐'
        }
      ]
    }
  }
}
</script>
