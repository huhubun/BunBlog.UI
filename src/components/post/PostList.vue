<template>
  <a-list itemLayout="vertical" :dataSource="list">
    <a-list-item slot="renderItem" slot-scope="item" key="item.id">
      <template slot="actions">
        <span>
          <a-icon type="home" />
          {{ item.visits}}
        </span>
        <span v-if="item.category != null">
          <a-icon type="home" />
          {{ item.category.displayName }}
        </span>
        <span v-if="item.tagList != null && item.tagList.length > 0">
          <a-icon type="home" />tags:
          <span v-for="tag in item.tagList" v-bind:key="tag.linkName">{{ tag.displayName }}</span>
        </span>
        <span>
          <a-icon type="home" />
          {{ item.publishedOn }}
        </span>
      </template>

      <h2>
        <router-link :to="{ name:'post-detail', params: { id: item.id } }">{{item.title}}</router-link>
      </h2>
      <p>{{ item.excerpt }}</p>
    </a-list-item>
  </a-list>
</template>

<script>
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
  }
}
</script>

<style lang="stylus" scoped></style>
