<template>
  <a-list itemLayout="vertical" :dataSource="list">
    <a-list-item slot="renderItem" slot-scope="item" key="item.id">
      <h2>
        <n-link :to="`/posts/${item.linkName}`">{{item.title}}</n-link>
      </h2>
      <p>{{ item.excerpt }}</p>
      <div>
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
          <a-tag v-for="tag in item.tagList" v-bind:key="tag.linkName">{{ tag.displayName }}</a-tag>
        </span>
      </div>
    </a-list-item>
  </a-list>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'PostList',
  props: {
    list: {
      type: Array,
      default: function() {
        return []
      },
      required: true
    }
  },
  methods: {
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
  }
}
</script>

<style lang="stylus" scoped>
i.anticon
  margin-right: 8px
</style>