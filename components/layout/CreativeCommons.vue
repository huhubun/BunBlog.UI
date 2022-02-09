<template>
  <v-alert text>
    <div class="title">CC BY-NC-ND</div>

    <v-divider class="my-4"></v-divider>

    <div class="body-2">
      <span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">
        {{ post.title }}
      </span>

      由
      <a
        xmlns:cc="http://creativecommons.org/ns#"
        href="https://bun.plus"
        property="cc:attributionName"
        rel="cc:attributionURL"
        >huhubun</a
      >
      采用
      <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"
        >知识共享 署名-非商业性使用-禁止演绎 4.0 国际 许可协议</a
      >
      进行许可。

      <br />

      基于
      <a
        xmlns:dct="http://purl.org/dc/terms/"
        :href="`https://bun.plus/posts/${post.linkName}`"
        rel="dct:source"
        >https://bun.plus/posts/{{ post.linkName }}</a
      >
      上的作品创作。
    </div>
  </v-alert>
</template>

<script>
export default {
  name: 'CreativeCommons',
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped></style>