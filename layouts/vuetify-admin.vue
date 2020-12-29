<template>
  <client-only>
    <v-app>
      <v-navigation-drawer v-model="drawer" app permanent expand-on-hover>
        <v-list>
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="title">
                Bun Blog Admin
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list nav dense>
          <v-list-item
            v-for="item in items"
            :key="item.to"
            :to="item.to"
            :href="item.href"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app dense flat>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-btn icon title="查看博客">
          <v-icon>mdi-home-outline</v-icon>
        </v-btn>
        <v-btn icon title="撰写博文">
          <v-icon>mdi-pencil-outline</v-icon>
        </v-btn>

        <v-toolbar-title>Application</v-toolbar-title>

      </v-app-bar>

      <v-main>
        <nuxt />
      </v-main>
    </v-app>
  </client-only>
</template>

<script>
import PoweredBy from '~/components/layout/PoweredBy.vue'
import Copyright from '~/components/layout/Copyright.vue'

export default {
  data() {
    return {
      collapsed: false,
      selectedKeys: [],

      drawer: true,
      items: [
        {
          icon: 'mdi-gauge',
          title: '仪表盘',
          to: '/admin'
        },
        {
          icon: 'mdi-note-multiple',
          title: '博文',
          to: '/admin/posts'
        },
        {
          icon: 'mdi-inbox-multiple',
          title: '分类',
          to: '/admin/categories'
        },
        {
          icon: 'mdi-inbox-multiple',
          title: '分类',
          to: '/admin/categories/index3'
        },
        {
          icon: 'mdi-tag',
          title: '标签',
          to: '/admin/tags'
        },
        {
          icon: 'mdi-link',
          title: '友情链接',
          to: '/admin/siteLinks'
        },
        {
          icon: 'mdi-cog',
          title: '设置',
          to: '/admin/setting'
        }
      ]
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