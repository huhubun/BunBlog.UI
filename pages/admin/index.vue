<template>
  <v-container>
    <v-row>
      <v-col>
        <v-alert text type="warning">
          This page is under development and will be available later
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'vuetify-admin',
  head() {
    return {
      title: 'Dashboard'
    }
  }
}
</script>

<style lang="stylus" scoped></style>
