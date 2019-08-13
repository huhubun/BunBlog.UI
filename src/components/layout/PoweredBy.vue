<template>
  <div>
    <div class="bun-margin-top powered-by">
      <span class="bun-margin-right">
        <a-icon type="thunderbolt" />Powered by
      </span>
      <span>
        <a href="https://github.com/huhubun/BunBlog.UI">BunBlog.UI</a>
        {{ uiVersion }}
      </span>
      <a-divider type="vertical" />
      <span>
        <a href="https://github.com/huhubun/BunBlog.API">BunBlog.API</a>
        {{ apiVersion }}
      </span>
    </div>
  </div>
</template>

<script>
import { get as getInformation } from '@/api/information'

export default {
  name: 'PoweredBy',
  data() {
    return {
      uiVersion: process.env.BUN_BLOG_UI_VERSION,
      apiVersion: null
    }
  },
  mounted() {
    getInformation().then(res => {
      this.apiVersion = res.version
    })
  }
}
</script>

<style lang="stylus" scoped>
.powered-by a
  text-decoration: underline
  color: rgba(0, 0, 0, 0.65)

.powered-by i.anticon, .powered-by a
  margin-right: 8px
</style>
