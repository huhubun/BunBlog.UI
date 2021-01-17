<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" fixed temporary app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="`drawer_nav_item_${i}`"
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
    <v-app-bar flat app color="blue-grey darken-4 white--text">
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="hidden-sm-and-up white--text"
      />
      <v-toolbar-items>
        <v-btn text to="/" active-class="no-active" class="white--text title">
          {{ title }}
        </v-btn>
      </v-toolbar-items>

      <v-spacer />

      <v-toolbar-items class="hidden-xs-only">
        <template v-for="(item, i) in items">
          <v-btn
            text
            v-bind:key="`toolbar_item_${i}_btn`"
            :to="items[i].to"
            :href="items[i].href"
            class="white--text"
          >
            {{ items[i].title }}
          </v-btn>
        </template>
      </v-toolbar-items>
    </v-app-bar>

    <v-main>
      <nuxt />
    </v-main>

    <v-footer color="blue-grey darken-4 ">
      <v-row justify="center" no-gutters>
        <v-col class="text-center" cols="12">
          <site-links />
          <custom-footer />
          <powered-by />
          <copyright />
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import PoweredBy from '~/components/layout/PoweredBy.vue'
import Copyright from '~/components/layout/Copyright.vue'
import CustomFooter from '~/components/layout/CustomFooter.vue'
import SiteLinks from '~/components/layout/SiteLinks.vue'

export default {
  data() {
    return {
      drawer: false,
      title: '呼呼小笼包的博客',
      items: [
        {
          icon: 'mdi-home-outline',
          title: '首页',
          to: '/'
        },
        {
          icon: 'mdi-keyboard-return',
          title: '关于',
          to: '/about'
        }
      ]
    }
  },
  components: {
    PoweredBy,
    Copyright,
    CustomFooter,
    SiteLinks
  },
  middleware: ['loadSettings', 'loadSiteLinks']
}
</script>

<style lang="stylus" scoped>
.v-btn--active.no-active::before
  opacity: 0 !important
  transition: opacity 0.2s cubic-bezier(0.4, 0, 0.6, 1)

.v-btn--active.no-active:hover::before
  opacity: 0.04 !important
</style>