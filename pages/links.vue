<template>
  <article class="blue-grey lighten-5" style="height: 100%">
    <header class="blog-header">
      <v-card flat tile class="blue-grey darken-1 white--text">
        <v-container
          class="d-flex justify-center align-center"
          :style="{ height: '260px' }"
        >
          <v-card-title class="text-h4 text-md-h3 text-lg-h2">
            友情链接
          </v-card-title>
        </v-container>
      </v-card>
    </header>

    <v-container>
      <v-row>
        <v-col
          v-for="link in links"
          :key="link.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          xl="2"
        >
          <v-btn depressed block :href="link.link" plain class="text-truncate">
            {{ link.name }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </article>
</template>

<script>
export default {
  async asyncData({ $bunblog }) {
    const links = await $bunblog.siteLink.getList()

    return { links }
  },
  data() {
    return {}
  }
}
</script>

<style>
</style>