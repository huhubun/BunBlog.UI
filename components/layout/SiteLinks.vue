<template>
  <div v-if="siteLinks.length" class="py-1">
    <v-chip
      label
      disabled
      color="transparent"
      class="blue-grey--text text--lighten-5"
    >
      友情链接
    </v-chip>

    <v-chip
      v-for="siteLink in siteLinks"
      :key="siteLink.link"
      :href="siteLink.link"
      label
      color="transparent"
      class="blue-grey--text text--lighten-5"
    >
      {{ siteLink.name }}
    </v-chip>
  </div>
</template>

<script>
export default {
  computed: {
    siteLinks() {
      return this.$store.state.siteLinks.siteLinks
    }
  }
}
</script>
