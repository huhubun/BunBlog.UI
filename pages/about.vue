<template>
  <div class="about-container">
    <a-row class="about-me-container">
      <a-col :xs="0" :md="3"></a-col>
      <a-col :xs="24" :md="18">
        <a-row>
          <a-col span="16">
            <h1>关于</h1>
            <h2>呼呼小笼包</h2>
            <p>昵称“呼呼小笼包”，90后，2014年大学毕业，现在居住在大连，从事软件开发相关工作，主要使用 ASP.NET 等相关技术。</p>
            <p>高中因为好玩，开始学习网站开发，当时购买过一个域名 huhu-box.com 做了一个软件下载站“呼呼小盒子”，从此接触了 HTML、JavaScript、ASP、PHP、MySQL 等技术，不过后来由于自己玩心太重，一年左右就关闭了网站。同期还购买了 nzc.me 域名，用 WordPress 搭建了个人博客，不过也不怎么更新，2018年底一狠心关掉了主机，现在还没想好用这个域名做什么…开始工作后在“博客园”也有注册博客，仍苦于自己不务正业，也可能工作太忙，一共也没发表过几篇文章 - -||</p>
            <p>喜欢动漫和摄影，希望未来自己能坚持写博客，博客内容也会涉及开发之外的内容哦。</p>
            <p>也欢迎大家扫描右侧微信公众号二维码关注 `bundev`，并与我互动~</p>

            <h2>关于博客</h2>
            <p>今年（2019年）Google 推出了 `.dev` 域名，又燃起了我写博客的欲望，虽然几年前我就想自己开发个博客后端，但是没坚持下来，这次拖拉了许久，终于还是做了出来。</p>
            <p>现在市面上那么多博客平台/软件，为什么要自己开发？自己开发能将最新的技术应用起来，接触工作中没有接触过的内容，个人觉得是有好处的。而且嘛，自己开发的博客，自己大概不会好几个月一篇都不写吧。（我也不知道，逃）</p>
            <p>
              由于 .dev 域名无法备案，于是开通了 .plus 域名
              <a href="https://bun.plus">bun.plus</a> 作为博客的域名。
            </p>

            <h3>技术栈</h3>
            <ul>
              <li>
                <a href="https://github.com/huhubun/BunBlog.UI" target="_blank">
                  <a-icon type="github" />BunBlog.UI
                </a> 采用 Vue.js 开发，由于需要 SEO，还使用了 Nuxt.js 以便进行服务器端渲染
              </li>
              <li>
                <a href="https://github.com/huhubun/BunBlog.API" target="_blank">
                  <a-icon type="github" />BunBlog.API
                </a> 采用 ASP.NET Core 开发，和服务器、数据库交互的逻辑都在 API 中
              </li>
              <li>数据库使用 PostgreSQL</li>
              <li>
                <del>一共使用了两台 Vultr 的虚拟机，均位于日本（dev 域名，大陆无法备案）：一台 512M 内存部署了 UI、API 以及 nginx；另一台 1G 内存，部署了 PostgreSQL</del>
              </li>
              <li>
                <del>2019-11-10 由于 Vultr 访问实在不稳定，迁入 Azure（香港），试用</del>
              </li>
              <li>
                <del>2020-02-23 由于 Azure 香港访问也不稳定，更换多个 IP 无果，遂迁入 Azure 中国（由世纪互联运营）：标准 B1ms (1 vcpu，2 GiB 内存)，UI、API 及 PostgreSQL 都部署在这里</del>
              </li>
              <li>2020-08-07 Azure 实在太贵了啊，用不起了😭……迁入腾讯云：标准型S5（1核 2GB）</li>
            </ul>

            <p>UI 以及 API 在 Github 上开源，但目前都是适用于我自己的定制内容，样式功能上也没有特别完善（目前也就勉强能用的样子），欢迎大家一起学习。</p>

            <h3>内容</h3>目前计划是以开发相关的内容为主，当然也不局限，可能会有软件推荐（以前做“呼呼小盒子”的时候其实想涉足这一块）、二次元、游戏等等内容（幻想ing…）
          </a-col>
          <a-col span="8" class="about-me-image-container">
            <div>
              <img src="https://cdn.bun.plus/blog/about_me.jpg" alt="about me" />
              <br />
              <span>博主（于 2016 ignite 大会）</span>
            </div>

            <div class="bun-margin-top-2x">
              <img src="https://cdn.bun.plus/blog/wechat_qr.png" alt="微信公众号二维码" />
              <br />

              <span>
                <a-icon type="wechat" />
                <code>bundev</code>
              </span>
            </div>
          </a-col>
        </a-row>

      </a-col>
    </a-row>
  </div>
</template>

<script>

export default {
  head() {
    return {
      title: '关于',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '本页包含站长“呼呼小笼包”的介绍，以及本博客的介绍、开办动向。另外欢迎大家关注微信公众号 bundev 与站长互动交流。'
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            '呼呼小笼包,huhubun,bun,bun.dev,bun.plus,关于,about,介绍,简介,技术,软件,开发,个人博客,博客,文章,精品软件,推荐'
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.about-container
  padding: 16px 0 0 0

  a
    color: rgba(0, 0, 0, 0.65)
    text-decoration: underline

    .anticon
      margin-right: 0.25em

.about-me-image-container
  text-align: center
</style>