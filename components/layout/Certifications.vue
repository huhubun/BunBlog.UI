<template>
  <div class="py-1">
    <v-chip
      v-for="certification in certifications"
      :key="certification.url"
      :href="certification.url"
      label
      color="transparent"
      class="blue-grey--text text--lighten-5"
    >
      {{ certification.text }}
    </v-chip>
  </div>
</template>

<script>
export default {
  computed: {
    certifications() {
      let certifications =
        this.$store.state.settings.settings['certification.list'] || '[]'
      return JSON.parse(certifications)
    }
  }
}
</script>