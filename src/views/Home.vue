<template>
  <a-layout>
    <a-affix :offsetTop="0">
      <a-layout-header>
        <a-menu mode="horizontal" theme="light">
          <a-menu-item style="float: left;" class="title">
            <router-link to="/">呼呼小笼包的博客</router-link>
          </a-menu-item>
          <a-menu-item>
            <router-link to="/about">关于</router-link>
          </a-menu-item>
          <a-menu-item>
            <a-input-search placeholder="Search" />
          </a-menu-item>
        </a-menu>
      </a-layout-header>
    </a-affix>
    <a-layout-content>
      <router-view></router-view>
    </a-layout-content>
    <a-layout-footer>
      <div>
        <router-link to="/admin/login">admin</router-link>
      </div>
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
      <div class="bun-margin-top">
        <span>&copy; 2019 huhubun</span>
      </div>
    </a-layout-footer>
  </a-layout>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      version: process.env.BUN_BLOG_UI_VERSION
    }
  },
  methods: {
  },
  components: {
  }
}
</script>

<style lang="stylus" scoped>
.ant-layout
  min-height: 100vh

.ant-layout-header
  text-align: right
  background-color: #FFF
  box-shadow: 0 0 10px -5px #000

.ant-layout-header .ant-menu.ant-menu-root
  border-bottom: 0
  padding-top: 8px

.ant-layout-content
  background-color: #FFF
  padding: 0 50px

.ant-layout-footer a
  color: rgba(0, 0, 0, 0.65)

.ant-layout-footer .powered-by a
  text-decoration: underline

.ant-layout-footer .powered-by i.anticon, .ant-layout-footer .powered-by a
  margin-right: 8px

.title
  font-size: 1.6em
</style>
