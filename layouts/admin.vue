<template>
  <client-only>
    <a-layout style="min-height: 100vh">
      <a-layout-sider collapsible v-model="collapsed">
        <div class="logo">Bun Blog Admin</div>
        <a-menu theme="dark" :selectedKeys="selectedKeys" mode="inline">
          <a-menu-item key="/admin">
            <n-link to="/admin">
              <a-icon type="dashboard" />
              <span>仪表盘</span>
            </n-link>
          </a-menu-item>

          <a-menu-item key="/admin/post">
            <n-link to="/admin/post">
              <a-icon type="profile" />
              <span>博文</span>
            </n-link>
          </a-menu-item>

          <a-menu-item key="/admin/category">
            <n-link to="/admin/category">
              <a-icon type="inbox" />
              <span>分类</span>
            </n-link>
          </a-menu-item>

          <a-menu-item key="/admin/tag">
            <n-link to="/admin/tag">
              <a-icon type="tags" />
              <span>标签</span>
            </n-link>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header>
          <a-menu mode="horizontal" theme="dark">
            <a-menu-item class="bun-left">
              <n-link to="/">
                <a-icon type="home" />查看博客
              </n-link>
            </a-menu-item>
            <a-menu-item class="bun-left">
              <n-link to="/admin/post/new">
                <a-icon type="edit" />撰写博文
              </n-link>
            </a-menu-item>
            <a-menu-item>
              <span @click="logout">
                <a-icon type="logout" />
                登出 {{ username }}
              </span>
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
  </client-only>
</template>

<script>
import PoweredBy from '~/components/layout/PoweredBy.vue'
import Copyright from '~/components/layout/Copyright.vue'

export default {
  data() {
    return {
      collapsed: false,
      selectedKeys: []
    }
  },
  methods: {
    selectedMenuKeys() {
      const routes = this.$route.matched.concat()
      this.selectedKeys = [routes.pop().path]
    },
    logout() {
      this.$store.commit('currentUser/logout')
      this.$router.push('/login')
    }
  },
  computed: {
    username() {
      return this.$store.state.currentUser.username
    }
  },
  middleware: 'auth',
  components: {
    PoweredBy,
    Copyright
  },
  watch: {
    $route(val) {
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
  line-height: 32px
  font-size: 20px
  font-weight: 100
  padding-left: 24px

.ant-layout-sider-collapsed .logo
  line-height: 24px
  font-size: 20px
  padding: 8px 0 8px 8px

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