<template>
<div>
  <div v-html="footerTemplate"></div>
</div>
</template>

<script>
export default {
  computed:{
    footerTemplate(){
      return this.$store.state.customLayout.footerTemplate
    }
  }
}
</script>