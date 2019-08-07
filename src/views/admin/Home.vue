<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider collapsible v-model="collapsed">
      <div class="logo">BunBlog Admin</div>
      <a-menu theme="dark" :defaultSelectedKeys="['1']" mode="inline">
        <a-menu-item key="1">
          <a-icon type="pie-chart" />
          <span>Option 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="desktop" />
          <span>Option 2</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <span slot="title">
            <a-icon type="user" />
            <span>User</span>
          </span>
          <a-menu-item key="3">Tom</a-menu-item>
          <a-menu-item key="4">Bill</a-menu-item>
          <a-menu-item key="5">Alex</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title">
            <a-icon type="team" />
            <span>Team</span>
          </span>
          <a-menu-item key="6">Team 1</a-menu-item>
          <a-menu-item key="8">Team 2</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="9">
          <a-icon type="file" />
          <span>File</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header>
        <a-menu theme="dark" mode="horizontal">
          <a-menu-item>
            <router-link to="/">
              <a-icon type="home" />查看博客
            </router-link>
          </a-menu-item>
          <a-menu-item>
            <router-link to="/">菜单二</router-link>
          </a-menu-item>
          <a-sub-menu>
            <span slot="title" class="submenu-title-wrapper">
              <a-icon type="setting" />Navigation Three - Submenu
            </span>
            <a-menu-item-group title="Item 1">
              <a-menu-item key="setting:1">Option 1</a-menu-item>
              <a-menu-item key="setting:2">Option 2</a-menu-item>
            </a-menu-item-group>
            <a-menu-item-group title="Item 2">
              <a-menu-item key="setting:3">Option 3</a-menu-item>
              <a-menu-item key="setting:4">Option 4</a-menu-item>
            </a-menu-item-group>
          </a-sub-menu>
        </a-menu>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>
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
import PoweredBy from '@/components/layout/PoweredBy'
import Copyright from '@/components/layout/Copyright'

export default {
  data() {
    return {
      collapsed: false
    }
  },
  components: {
    PoweredBy,
    Copyright
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

.ant-layout-header .ant-menu
  height: 32px

.ant-layout-header .ant-menu .ant-menu-item
  padding: 0 16px

// .ant-layout-header .ant-menu-submenu .ant-menu-submenu-title
// TODO ant-menu-submenu-title 这个 class 怎么应用不了样式？
// padding: 0 16px

.ant-layout-header .ant-menu .ant-menu-item, .ant-layout-header .ant-menu .ant-menu-submenu
  vertical-align: top
  margin: 4px 0 0 0
  line-height: 26px
  height: 26px

.ant-layout-footer
  padding: 10px 16px
</style>
