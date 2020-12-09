<template>
  <section class="body-2 text-right">
      <h2 class="body-1">许可协议</h2>
      <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">
        <img
          class="mb-2"
          alt="知识共享许可协议：署名-非商业性使用-禁止演绎"
          src="https://cdn.bun.plus/cc/by-nc-nd_80x15.png"
          v-lazy="'https://cdn.bun.plus/cc/by-nc-nd_80x15.png'"
        />
      </a>

      <br />

      <span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">
        {{ post.title }}
      </span>

      由
      <a
        xmlns:cc="http://creativecommons.org/ns#"
        href="https://bun.plus"
        property="cc:attributionName"
        rel="cc:attributionURL"
      >
        huhubun
      </a>
      采用
      <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">
        知识共享 署名-非商业性使用-禁止演绎 4.0 国际 许可协议
      </a>
      进行许可。

      <br />

      基于
      <a
        xmlns:dct="http://purl.org/dc/terms/"
        :href="`https://bun.plus/posts/${post.linkName}`"
        rel="dct:source"
      >
        https://bun.plus/posts/{{ post.linkName }}
      </a>
      上的作品创作。
  </section>
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

<style lang="stylus" scoped>

</style>