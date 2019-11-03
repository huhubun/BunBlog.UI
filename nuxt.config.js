var webpack = require('webpack');

module.exports = {
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
    titleTemplate: '%s - 呼呼小笼包的博客 bun.dev',
    htmlAttrs: {
      lang: 'zh-cmn-Hans'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    'ant-design-vue/dist/antd.css'
  ],
  styleResources:{
    stylus: './assets/style.styl'
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/antd-ui',
    '@/plugins/axios',
    '@/plugins/bun-helper',
    '@/plugins/dayjs'
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
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:52000' : 'https://api.bun.dev'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    plugins: [
      new webpack.DefinePlugin({
        'process.env.BUN_BLOG_UI_VERSION': JSON.stringify(require('./package.json').version),
        'process.env.BUN_BLOG_API_BASE_URL': JSON.stringify(process.env.NODE_ENV === 'development' ? 'http://localhost:52000' : 'https://api.bun.dev')
      })
    ],
    extend(config, ctx) {
    }
  }
}
