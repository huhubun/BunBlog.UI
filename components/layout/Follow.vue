<template>
  <div class="bun-margin-top follow">
    <span>
      <a-popover trigger="hover" placement="topLeft" arrowPointAtCenter>
        <template slot="content">
          <img src="https://img.bun.dev/wechat_qr.png" alt="wechat qr" style="width: 250px; height: 250px" />
        </template>
        <a-icon type="wechat" class="wechat-qr" />
      </a-popover>
    </span>

    <span class="bun-margin-left">
      <a href="https://github.com/huhubun" target="_blank" class="github-link">
        <a-icon type="github" />
      </a>
    </span>
  </div>
</template>

<style lang="stylus" scoped>
.follow
  font-size: 2em

.follow a
  color: inherit

.wechat-qr:hover
  color: rgb(26, 173, 25)
  cursor: pointer

.github-link:hover
  color: rgb(36, 41, 46)
</style>