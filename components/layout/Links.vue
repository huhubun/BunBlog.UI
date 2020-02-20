<template>
  <div class="bun-bottom-links bun-margin-top">
    <span class="bun-margin-right">友情链接</span>
    <span>
      <span v-for="link in links" v-bind:key="link.url">
        <a-divider type="vertical" v-if="link.url != links[0].url" />
        <a :href="link.url">{{ link.name }}</a>
      </span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Links',
  data() {
    return {
      links: [
        { name: "Kevin Jiang's Tech Blog", url: 'https://ksjiang.me/' },
        { name: 'JiChao Blog', url: 'https://jichao.dev/' }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.bun-bottom-links a
  text-decoration: underline
  color: rgba(0, 0, 0, 0.65)

.bun-bottom-links i.anticon
  margin-right: 8px
</style>