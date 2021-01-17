<template>
  <client-only>
    <v-app>
      <v-navigation-drawer
        v-model="drawer"
        app
        :expand-on-hover="!$vuetify.breakpoint.smAndDown"
      >
        <v-list>
          <v-list-item>
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
        <v-app-bar-nav-icon
          @click="drawer = !drawer"
          v-if="$vuetify.breakpoint.smAndDown"
        />

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              href="/"
              target="_blank"
              :class="{ 'app-bar-first-icon': !$vuetify.breakpoint.smAndDown }"
            >
              <v-icon>mdi-home-outline</v-icon>
            </v-btn>
          </template>
          <span>
            查看博客
            <v-icon color="white" small>mdi-open-in-new</v-icon>
          </span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" to="/admin/posts/new">
              <v-icon>mdi-pencil-outline</v-icon>
            </v-btn>
          </template>
          <span>撰写博文</span>
        </v-tooltip>

        <!--
  TODO 
        <v-divider class="ml-2 mr-4" vertical></v-divider>

        <v-toolbar-title>Application</v-toolbar-title>
        -->
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
          to: '/admin/settings'
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
// 由于顶部 icon 增加了tooltip，导致 icon 不是 app-bar 里的第一个元素，无法应用 :first-child 样式，这里自定义这个样式避免错位
.app-bar-first-icon
  margin-left: -12px
</style>