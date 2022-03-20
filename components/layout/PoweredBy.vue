<template>
  <div class="py-1">
    <v-chip
      label
      disabled
      color="transparent"
      class="blue-grey--text text--lighten-5 text-uppercase"
    >
      Powered By
    </v-chip>

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

      {{ $vuetify.breakpoint.smAndDown ? i.shortText : i.text }}
    </v-chip>

    <v-chip
      v-if="sponsor"
      :href="sponsor.url"
      label
      :color="sponsor.color"
      class="blue-grey--text text--lighten-5"
    >
      <v-avatar left>
        <v-icon small>{{ sponsor.icon }}</v-icon>
      </v-avatar>

      {{ sponsor.text }}
    </v-chip>
  </div>
</template>

<script>
export default {
  name: 'PoweredBy',
  data() {
    return {
      uiVersion: this.$config.uiVersion
    }
  },
  computed: {
    apiVersion() {
      return this.$store.state.apiInformation.version
    },
    os() {
      return this.$store.state.apiInformation.os
    },
    isOnKubernetes() {
      return this.$store.state.apiInformation.isOnKubernetes
    },
    runtimeFramework() {
      return this.$store.state.apiInformation.runtimeFramework
    },

    by() {
      let result = [
        {
          icon: 'mdi-palette',
          text: `BunBlog.UI ${this.uiVersion}`,
          shortText: `UI ${this.uiVersion}`,
          url: 'https://github.com/huhubun/BunBlog.UI'
        },
        {
          icon: 'mdi-lightning-bolt-outline',
          text: `BunBlog.API ${this.apiVersion}`,
          shortText: `API ${this.apiVersion}`,
          url: 'https://github.com/huhubun/BunBlog.API'
        }
      ]

      if (this.isOnKubernetes || this.os) {
        result.push({
          icon: 'mdi-console',
          text: `${this.runtimeFramework} on ${this.isOnKubernetes ? 'Kubernetes' : this.os}`,
          shortText: this.runtimeFramework,
          url: 'https://dot.net/'
        })
      }

      return result
    },

    sponsor() {
      let sponsor = this.$store.state.settings.settings['s.poweredby']
      if (sponsor) {
        return JSON.parse(sponsor)
      }

      return null
    }
  }
}
</script>