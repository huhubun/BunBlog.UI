<template>
  <article fluid>
    <mini-header :title="title" />

    <v-container>
      <v-row>
        <v-col cols="12" xs="12" md="8" lg="9" xl="10">
          <p>
            2019年，Google 推出了 `.dev`
            域名，又燃起了我写博客的欲望，虽然几年前我就想自己开发个博客后端，但是没坚持下来，这次拖拉了许久，终于还是做了出来。
          </p>
          <p>
            现在市面上那么多博客平台/软件，为什么要自己开发？自己开发能将最新的技术应用起来，接触工作中没有接触过的内容，个人觉得是有好处的。而且嘛，自己开发的博客，自己大概不会好几个月一篇都不写吧。（我也不知道，逃）
          </p>
          <p>
            由于 .dev 域名无法备案，于是开通了 .plus 域名
            <a href="https://bun.plus">bun.plus</a> 作为博客的域名。
          </p>

          <h3>技术栈</h3>
          <ul>
            <li>
              <a href="https://github.com/huhubun/BunBlog.UI" target="_blank">
                BunBlog.UI
              </a>
              采用 Vue.js 开发，由于需要 SEO，还使用了 Nuxt.js
              以便进行服务器端渲染
            </li>
            <li>
              <a href="https://github.com/huhubun/BunBlog.API" target="_blank">
                BunBlog.API
              </a>
              采用 ASP.NET Core 开发，和服务器、数据库交互的逻辑都在 API 中
            </li>
            <li>数据库使用 PostgreSQL</li>
            <li>
              <del>
                一共使用了两台 Vultr 的虚拟机，均位于日本（dev
                域名，大陆无法备案）：一台 512M 内存部署了 UI、API 以及
                nginx；另一台 1G 内存，部署了 PostgreSQL
              </del>
            </li>
            <li>
              <del>
                2019-11-10 由于 Vultr 访问实在不稳定，迁入 Azure（香港），试用
              </del>
            </li>
            <li>
              <del>
                2020-02-23 由于 Azure 香港访问也不稳定，更换多个 IP 无果，遂迁入
                Azure 中国（由世纪互联运营）：标准 B1ms (1 vcpu，2 GiB
                内存)，UI、API 及 PostgreSQL 都部署在这里
              </del>
            </li>
            <li>
              2020-08-07 Azure
              实在太贵了啊，用不起了😭……迁入腾讯云：标准型S5（1核 2GB）
            </li>
            <li>
              2022-03-26 在腾讯云上自建了 Kubernetes 集群，将博客迁入
            </li>
          </ul>
          <p>
            UI 以及 API 在 Github
            上开源，但目前都是适用于我自己的定制内容，样式功能上也没有特别完善（目前也就勉强能用的样子），欢迎大家一起学习。
          </p>
        </v-col>

        <v-col cols="12" xs="12" md="4" lg="3" xl="2">
          <v-btn href="https://nzc.me/" target="_blank" outlined block>
            关于站长：呼呼小笼包
            <v-icon right> mdi-open-in-new </v-icon>
          </v-btn>

          <v-btn
            href="https://cdn.bun.plus/blog/wechat_qr.png"
            target="_blank"
            depressed
            block
            color="light-green"
            class="white--text mt-2"
          >
            <v-icon left>mdi-wechat</v-icon>
            微信公众号 bundev
          </v-btn>

          <div class="text-center mt-2">
            <v-img
              src="https://cdn.bun.plus/blog/wechat_qr.png"
              alt="wechat qr"
              class="d-inline-block"
              max-height="150"
              max-width="150"
            />

            <p>
              欢迎大家关注微信公众号
              <a href="https://cdn.bun.plus/blog/wechat_qr.png">bundev</a>
              与我学习交流，并获取第一手文章内容
            </p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </article>
</template>

<script>
import MiniHeader from '@/components/layout/MiniHeader.vue'

export default {
  data() {
    return {
      title: '关于'
    }
  },
  components: {
    MiniHeader
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            '本页包含站长“呼呼小笼包”的介绍，以及本博客的介绍、开办动向。另外欢迎大家关注微信公众号 bundev 与站长互动交流。'
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            '呼呼小笼包,huhubun,bun,bun.plus,关于,about,介绍,简介,技术,软件,开发,个人博客,博客,文章,精品软件,推荐'
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped></style>