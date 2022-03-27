<template>
  <header class="blue-grey lighten-5" style="height: 100%">
    <v-card flat tile class="blue-grey darken-1 white--text">
      <v-container
        class="d-flex justify-center align-center"
        :style="{ height: '260px' }"
      >
        <v-card-title class="text-h4 text-md-h3 text-lg-h2">
          {{ title }}
        </v-card-title>
      </v-container>
    </v-card>
  </header>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped></style>
