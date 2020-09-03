var webpack = require('webpack');
var path = require('path');
var AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

module.exports = {
  telemetry: false,
  mode: 'universal',

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
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.16.2/build/styles/solarized-light.min.css' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/ant-design-vue@1.6.4/dist/antd.css' },
    ],
    script: [
      { src: 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.16.2/build/highlight.min.js' }
    ]
  },

  /*
  ** Global CSS
  */
  css: [
    '@/static/bun.css'
  ],

  styleResources: {
    stylus: './assets/style.styl'
  },

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/antd-ui',
    '@/plugins/axios',
    '@/plugins/bun-helper',
    '@/plugins/dayjs',
    '@/plugins/highlight',
    '@/plugins/hotkeys',
    { src: '@/plugins/cnzz', ssr: false }
  ],

  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],

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
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:52000' : 'https://api.bun.plus'
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
    publicPath: process.env.NODE_ENV === 'development' ? '/_nuxt/' : 'https://cdn.bun.plus/blog/client/',

    plugins: [
      new webpack.DefinePlugin({
        'process.env.BUN_BLOG_UI_VERSION': JSON.stringify(require('./package.json').version),
        'process.env.BUN_BLOG_API_BASE_URL': JSON.stringify(process.env.NODE_ENV === 'development' ? 'http://localhost:52000' : 'https://api.bun.plus')
      }),
      new AntdDayjsWebpackPlugin()
    ],
    extend(config, ctx) {
      // antd icons 按需加载，能大幅降低 antd icons 占用的空间，提高加载速度
      config.resolve.alias['@ant-design/icons/lib/dist$'] = path.resolve(__dirname, './assets/antd-icons.js')
    }
  }
}
