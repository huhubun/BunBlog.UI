<template>
  <a-layout>
    <a-affix :offsetTop="0">
      <a-layout-header>
        <a-menu mode="horizontal" theme="light">
          <a-menu-item class="title bun-left">
            <router-link to="/">呼呼小笼包的博客</router-link>
          </a-menu-item>
          <a-menu-item>
            <router-link to="/about">关于</router-link>
          </a-menu-item>
          <a-menu-item>
            <a-tooltip placement="bottom" title="(lll￢ω￢) 该功能尚未实装">
              <a-input-search placeholder="搜索" />
            </a-tooltip>
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
      <powered-by />
      <copyright />
    </a-layout-footer>
  </a-layout>
</template>

<script>
import PoweredBy from '@/components/layout/PoweredBy'
import Copyright from '@/components/layout/Copyright'

export default {
  name: 'home',
  methods: {
  },
  components: {
    PoweredBy,
    Copyright
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

.ant-layout-footer a
  color: rgba(0, 0, 0, 0.65)

.title
  font-size: 1.6em
</style>
