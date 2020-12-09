<template>
  <div class="py-1 body-1 blue-grey--text text--lighten-5">
    <v-chip
      label
      href="https://huhubun.com/"
      color="transparent"
      class="blue-grey--text text--lighten-5"
    >
      <v-avatar left>
        <v-icon small>mdi-copyright</v-icon>
      </v-avatar>
      {{ year }} huhubun
    </v-chip>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'Copyright',
  data() {
    return {
      year: dayjs().year()
    }
  }
}
</script>
