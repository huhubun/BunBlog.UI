<template>
  <div>
    <div class="bun-margin-top powered-by">
      <span class="bun-margin-right">
        <a-icon type="thunderbolt" />Powered by
      </span>
      <span>
        <a href="https://github.com/huhubun/BunBlog.UI">BunBlog.UI</a>
        {{ version }}
      </span>
      <a-divider type="vertical" />
      <span>
        <a href="https://github.com/huhubun/BunBlog.API">BunBlog.API</a>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PoweredBy',
  data() {
    return {
      version: process.env.BUN_BLOG_UI_VERSION
    }
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
