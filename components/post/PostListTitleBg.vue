<template>
  <div class="pa-3 pb-0">
    <v-card flat disabled height="16px" :style="style" :class="cssClass" />
  </div>
</template>

<script>
export default {
  props: {
    styling: {
      required: true
    }
  },
  data() {
    let style, cssClass

    if (this.styling) {
      let styling = this.$bunHelper.parseStyling(this.styling)
      if (styling && styling.titleBg) {
        style = styling.titleBg
      }
    }

    if (!style) {
      cssClass = 'blue-grey darken-1'
    }

    return {
      style,
      cssClass
    }
  }
}
</script>

<style>
</style>