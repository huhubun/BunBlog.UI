<template>
  <div class="bun-bottom-links bun-margin-top" v-if="siteLinks.length">
    <span class="bun-margin-right">友情链接</span>
    <span>
      <span v-for="(siteLink, index) in siteLinks" v-bind:key="siteLink.id">
        <a :href="siteLink.link || '#'">{{ siteLink.name }}</a>
        <a-divider type="vertical" v-if="index < siteLinks.length - 1" />
      </span>
    </span>
  </div>
</template>

<script>
export default {
  computed: {
    siteLinks() {
      return this.$store.state.siteLinks.siteLinks
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