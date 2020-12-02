<template>
  <section class="post-list-container">
    <a-row>
      <a-col :xs="{ span: 22, offset: 1 }">
        <a-list
          itemLayout="vertical"
          :dataSource="postsData.items"
          :pagination="pagination"
        >
          <a-list-item slot="renderItem" slot-scope="item" key="item.id">
            <article>
              <header>
                <h2>
                  <n-link :to="`/posts/${item.linkName}`">
                    {{ item.title }}
                  </n-link>
                </h2>
              </header>
              <p>{{ item.excerpt }}</p>
              <footer>
                <span>
                  <a-icon type="calendar" />
                  {{ formatDate(item.publishedOn) }}
                </span>
                <span>
                  <a-divider type="vertical" />
                  <a-icon type="eye" />
                  {{ getPostVisits(item.metadataList) }}
                </span>
                <span v-if="item.category != null">
                  <a-divider type="vertical" />
                  <a-icon type="inbox" />
                  {{ item.category.displayName }}
                </span>
                <span v-if="item.tagList != null && item.tagList.length > 0">
                  <a-divider type="vertical" />
                  <a-icon type="tags" />
                  <a-tag v-for="tag in item.tagList" v-bind:key="tag.linkName">
                    {{ tag.displayName }}
                  </a-tag>
                </span>
              </footer>
            </article>
          </a-list-item>
        </a-list>
      </a-col>
    </a-row>
  </section>
</template>

<script>
import dayjs from 'dayjs'

export default {
  data() {
    return {
      size: 10
    }
  },
  async asyncData({ $axios }) {
    const postsData = await $axios.$get('/api/posts', {
      params: {
        type: 'post',
        page: 1,
        size: 10
      }
    })

    return { postsData }
  },
  computed: {
    pagination() {
      let data = this.postsData
      let that = this

      return {
        position: 'bottom',
        pagesize: data.page,
        total: data.total,
        async onChange(page) {
          await that.getPosts(page)
        }
      }
    }
  },
  methods: {
    async getPosts(page) {
      let data = await this.$axios.$get('/api/posts', {
        params: {
          type: 'post',
          page: page || 1,
          size: this.size
        }
      })

      this.postsData = data
    },
    onPageChange(current) {
      console.log(current)
    },
    getPostVisits(metadataList) {
      if (metadataList) {
        let metadata = metadataList.filter(ele => ele.key === 'VISITS')
        if (metadata) {
          return metadata[0].value
        }
      }

      return 0
    },
    formatDate(datetime) {
      let dayjsObj = dayjs(datetime)
      return `${dayjsObj.format('YYYY-MM-DD HH:mm')} (${dayjsObj.fromNow()})`
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
            '欢迎访问呼呼小笼包 (huhubun) 的个人博客。这里的文章包含了前后端软件开发技术博文、精品软件推荐等内容。欢迎大家一起学习、成长。也欢迎关注微信公众号 bundev 交流！'
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

<style lang="stylus" scoped>
i.anticon
  margin-right: 8px

.post-list-container
  padding-bottom: 1em
</style>
