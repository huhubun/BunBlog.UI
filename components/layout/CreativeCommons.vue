<template>
  <section>
    <div id="cc-container" style>
      <h2>许可协议</h2>
      <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">
        <img alt="知识共享许可协议" style="border-width:0" src="https://cdn.bun.plus/cc/by-nc-nd_80x15.png" />
      </a>
      <br />
      <span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">{{ post.title }}</span> 由
      <a
        xmlns:cc="http://creativecommons.org/ns#"
        href="https://bun.plus"
        property="cc:attributionName"
        rel="cc:attributionURL"
      >huhubun</a>
      采用
      <a
        rel="license"
        href="http://creativecommons.org/licenses/by-nc-nd/4.0/"
      >知识共享 署名-非商业性使用-禁止演绎 4.0 国际 许可协议</a> 进行许可。
      <br />基于
      <a
        xmlns:dct="http://purl.org/dc/terms/"
        :href="`https://bun.plus/posts/${post.linkName}`"
        rel="dct:source"
      >https://bun.plus/posts/{{ post.linkName }}</a> 上的作品创作。
    </div>
  </section>
</template>

<script>
export default {
  name: 'CreativeCommons',
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="stylus" scoped>
#cc-container
  text-align: right
  padding-right: 5%
  font-size: 0.9em
  line-height: 1.6em
  margin-top: 48px

  h2
    font-size: 1.17em

  img
    margin-bottom: 16px
    box-shadow: 0px 0px 12px 0 #999

  a
    color: rgba(0, 0, 0, 1)
    text-decoration: underline
</style>