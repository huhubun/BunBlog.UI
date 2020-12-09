<template>
  <div>
    <div
      v-html="footerTemplate"
      class="bun-blog-footer-link blue-grey--text text--lighten-5" />
  </div>
</template>

<script>
export default {
  computed: {
    footerTemplate() {
      return this.$store.state.customLayout.footerTemplate
    }
  }
}
</script>