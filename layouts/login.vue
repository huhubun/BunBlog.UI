<template>
  <client-only>
    <v-app>
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
  </client-only>
</template>

<script>
import PoweredBy from '~/components/layout/PoweredBy.vue'
import Copyright from '~/components/layout/Copyright.vue'
import Certifications from '~/components/layout/Certifications.vue'

export default {
  components: {
    PoweredBy,
    Copyright,
    Certifications
  }
}
</script>

<style lang="stylus" scoped></style>
