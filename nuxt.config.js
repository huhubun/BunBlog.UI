require('dotenv').config();

module.exports = {
  telemetry: false,

  // Disable the progress bar
  loading: false,

  server: {
    port: 17088
  },

  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - 呼呼小笼包的博客 bun.plus',
    htmlAttrs: {
      lang: 'zh-cmn-Hans'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', href: 'https://cdn.bun.plus/blog/icon-512x512.png' },
      // 解决 Google 字体国内访问慢的问题
      { rel: 'stylesheet', href: 'https://fonts.loli.net/css?family=Roboto|Roboto+Mono&display=swap' },
      // 因为 defaultAssets 设为了 false，这里需要手动引入 Material Design Icons
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css' },
    ],
    script: [
      { src: 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.4.1/build/highlight.min.js' }
    ]
  },

  /*
  ** Global CSS
  */
  css: [
    '@/static/bun.css'
  ],

  styleResources: {
    stylus: ['@/assets/style.styl']
  },

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/axios',
    '@/plugins/bun-blog-sdk',
    '@/plugins/bun-helper',
    '@/plugins/dayjs',
    '@/plugins/highlight',
    '@/plugins/hotkeys',
    '@/plugins/lazyload',
    '@/plugins/showdown',
    { src: '@/plugins/cnzz', ssr: false }
  ],

  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // https://nuxtjs.org/blog/moving-from-nuxtjs-dotenv-to-runtime-config
  publicRuntimeConfig: {
    uiVersion: require('./package.json').version
  },

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/style-resources'
  ],

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.BASE_URL || 'http://localhost:22070'
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    // 生成文件分析，当需要分析时解除注释
    // npx nuxt build --analyze
    // analyze: true,

    // 设为 true 可将 CSS 提取到一个文件里，避免服务器端生成的 HTML 开头部分全是 CSS
    // https://zh.nuxtjs.org/api/configuration-build/#extractcss
    extractCSS: true,

    // 正式发布时需要将 client 的内容上传到 CDN 以提高访问速度
    // https://zh.nuxtjs.org/api/configuration-build/#publicpath
    publicPath: process.env.CLIENT_JS_PATH || '/_nuxt/'
  },

  components: true,

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    // 关闭默认字体，因为默认字体总是从 Google 获取字体，国内访问很慢，改为在 `head` 里引入国内源的 Roboto 字体
    // https://github.com/nuxt-community/vuetify-module#defaultassets
    defaultAssets: false,
    theme: {
      dark: false,
      themes: {
      }
    }
  }
}