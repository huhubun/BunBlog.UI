<template>
  <a-layout>
    <a-affix :offsetTop="0" class="header-affix">
      <a-layout-header>
        <a-menu mode="horizontal" theme="light">
          <a-menu-item class="title bun-left">
            <n-link to="/">呼呼小笼包的博客</n-link>
          </a-menu-item>
          <a-menu-item>
            <n-link to="/about">关于</n-link>
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
      <nuxt />
    </a-layout-content>
    <a-layout-footer>
      <powered-by />
      <follow />
      <copyright />
    </a-layout-footer>
  </a-layout>
</template>

<script>
import PoweredBy from '~/components/layout/PoweredBy.vue'
import Follow from '~/components/layout/Follow.vue'
import Copyright from '~/components/layout/Copyright.vue'

export default {
  components: {
    PoweredBy,
    Follow,
    Copyright
  }
}
</script>

<style lang="stylus" scoped>
.header-affix
  height: 64px

.ant-layout
  min-height: 100vh

.ant-layout-header
  text-align: right
  background-color: #FFF
  box-shadow: 0 0 10px 0px #999

.ant-input-search
  text-align: left

.ant-layout-header .ant-menu.ant-menu-root
  border-bottom: 0
  padding-top: 8px

.ant-layout-content
  background-color: #FFF

.ant-layout-footer
  background-color: #EAEAEA

.ant-layout-footer a
  color: rgba(0, 0, 0, 0.65)

.title
  font-size: 1.6em
  /* 消除 ant menu item 底部的蓝线效果 */
  transition: none

.title:hover
  border: 0

.title.ant-menu-item-selected, .title.ant-menu-item-actived
  border: 0

.title.ant-menu-item-selected a
  color: rgba(0, 0, 0, 0.65)

.title.ant-menu-item-selected a:hover
  color: #1890ff
</style>
