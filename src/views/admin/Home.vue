<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider collapsible v-model="collapsed">
      <div class="logo">BunBlog Admin</div>
      <a-menu theme="dark" :selectedKeys="selectedKeys" mode="inline">
        <a-menu-item key="/admin/post">
          <router-link to="/admin/post">
            <a-icon type="profile" />
            <span>博文</span>
          </router-link>
        </a-menu-item>

        <a-menu-item key="/admin/category">
          <router-link to="/admin/category">
            <a-icon type="inbox" />
            <span>分类</span>
          </router-link>
        </a-menu-item>

        <a-menu-item key="/admin/tag">
          <router-link to="/admin/tag">
            <a-icon type="tags" />
            <span>标签</span>
          </router-link>
        </a-menu-item>

        <a-menu-item key="/admin/page">
          <router-link to="/admin/page">
            <a-icon type="file" />
            <span>页面</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header>
        <a-menu mode="horizontal" theme="dark">
          <a-menu-item class="bun-left">
            <router-link to="/">
              <a-icon type="home" />查看博客
            </router-link>
          </a-menu-item>
          <a-menu-item class="bun-left">
            <router-link to="/">
              <a-icon type="edit" />撰写博文
            </router-link>
          </a-menu-item>
          <a-menu-item>
            <router-link to="/">
              <a-icon type="logout" />
              登出 {{ username }}
            </router-link>
          </a-menu-item>
        </a-menu>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer>
        <powered-by />
        <copyright />
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import Vue from 'vue'
import PoweredBy from '@/components/layout/PoweredBy'
import Copyright from '@/components/layout/Copyright'

export default {
  data() {
    return {
      collapsed: false,
      username: Vue.sessionStorage.get('username'),
      selectedKeys: []
    }
  },
  methods: {
    selectedMenuKeys() {
      const routes = this.$route.matched.concat()
      this.selectedKeys = [routes.pop().path]
    }
  },
  components: {
    PoweredBy,
    Copyright
  },
  watch: {
    '$route'(val) {
      this.selectedMenuKeys()
    }
  },
  created() {
    this.selectedMenuKeys()
  }
}
</script>

<style lang="stylus" scoped>
.logo
  color: #FFF

.ant-layout-header
  line-height: 32px
  height: 32px
  padding: 0
  text-align: right

.ant-layout-header .ant-menu
  height: 32px

.ant-layout-header .ant-menu .ant-menu-item
  padding: 0 16px

.ant-layout-header .ant-menu .ant-menu-item, .ant-layout-header .ant-menu .ant-menu-submenu
  vertical-align: top
  margin: 4px 0 0 0
  line-height: 26px
  height: 26px

.ant-layout-footer
  padding: 10px 16px
</style>
