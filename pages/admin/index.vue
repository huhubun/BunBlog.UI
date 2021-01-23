<template>
  <v-container>
    <v-row>
      <v-col>
        <v-alert text type="warning">
          This page is under development and will be available later {{ this.$auth.user }}
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'admin',
  head() {
    return {
      title: 'Dashboard'
    }
  }
}
</script>

<style lang="stylus" scoped></style>
