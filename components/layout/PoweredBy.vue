<template>
  <div class="py-1">
    <v-chip
      v-for="i in by"
      :key="i.url"
      :href="i.url"
      label
      color="transparent"
      class="blue-grey--text text--lighten-5"
    >
      <v-avatar left>
        <v-icon small>{{ i.icon }}</v-icon>
      </v-avatar>

      {{ i.text }}
    </v-chip>
  </div>
</template>

<script>
export default {
  name: 'PoweredBy',
  data() {
    return {
      uiVersion: process.env.BUN_BLOG_UI_VERSION
    }
  },
  computed: {
    apiVersion() {
      return this.$store.state.apiInformation.version
    },
    os() {
      return this.$store.state.apiInformation.os
    },
    runtimeFramework() {
      return this.$store.state.apiInformation.runtimeFramework
    },

    by() {
      let result = [
        {
          icon: 'mdi-palette',
          text: `BunBlog.UI ${this.uiVersion}`,
          url: 'https://github.com/huhubun/BunBlog.UI'
        },
        {
          icon: 'mdi-lightning-bolt-outline',
          text: `BunBlog.API ${this.apiVersion}`,
          url: 'https://github.com/huhubun/BunBlog.API'
        }
      ]

      if (this.os) {
        result.push({
          icon: 'mdi-console',
          text: `${this.runtimeFramework} on ${this.os}`,
          url: 'https://dot.net/'
        })
      }

      return result
    }
  },
  methods: {
    getApiInformation() {
      this.$bunblog.informations.get().then(apiInfo => {
        this.$store.commit('apiInformation/set', apiInfo)
      })
    }
  },
  mounted() {
    if (this.os === null) {
      this.getApiInformation()
    }
  }
}
</script>