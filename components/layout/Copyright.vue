<template>
  <div class="py-1 body-1 blue-grey--text text--lighten-5">
    <v-tooltip top color="grey darken-4">
      <template v-slot:activator="{ on, attrs }">
        <v-chip
          label
          href="https://huhubun.com/"
          v-bind="attrs"
          v-on="on"
          color="transparent"
          class="blue-grey--text text--lighten-5"
        >
          <v-avatar left>
            <v-icon small>mdi-wechat</v-icon>
          </v-avatar>
          bundev
        </v-chip>
      </template>
      <div class="text-center my-2">
        <img
          src="https://cdn.bun.plus/blog/wechat_qr.png"
          alt="wechat qr"
          style="width: 150px; height: 150px"
        />
        <p class="mt-2 mb-0">
          欢迎关注微信公众号 bundev<br />
          接收第一手文章内容
        </p>
      </div>
    </v-tooltip>

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
