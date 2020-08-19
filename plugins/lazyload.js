import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  loading: 'https://cdn.bun.plus/blog/common/loading.gif',
  attempt: 1
})