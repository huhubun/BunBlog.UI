<template>
  <a-list itemLayout="vertical" :dataSource="list">
    <a-list-item slot="renderItem" slot-scope="item" key="item.id">
      <h2>
        <router-link :to="{ name:'post-detail', params: { id: item.id } }">{{item.title}}</router-link>
      </h2>
      <p>{{ item.excerpt }}</p>
      <div>
        <span>
          <a-icon type="calendar" />
          {{ formatDate(item.publishedOn) }}
          <a-divider type="vertical" />
        </span>
        <span>
          <a-icon type="eye" />
          {{ getPostVisits(item.metadataList) }}
          <a-divider type="vertical" />
        </span>
        <span v-if="item.category != null">
          <a-icon type="inbox" />
          {{ item.category.displayName }}
          <a-divider type="vertical" />
        </span>
        <span v-if="item.tagList != null && item.tagList.length > 0">
          <a-icon type="tags" />
          <a-tag v-for="tag in item.tagList" v-bind:key="tag.linkName">{{ tag.displayName }}</a-tag>
        </span>
      </div>
    </a-list-item>
  </a-list>
</template>

<script>
import { getVisits } from '@/helper/post'
import dayjs from 'dayjs'

export default {
  name: 'PostList',
  props: {
    list: {
      type: Array,
      default: function () {
        return []
      },
      required: true
    }
  },
  methods: {
    getPostVisits(metadataList) {
      return getVisits(metadataList)
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
