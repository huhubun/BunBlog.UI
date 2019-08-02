import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { Button, Form, Input, Icon, Layout, Menu, Breadcrumb, message } from 'ant-design-vue'

import { BunAxios } from './utils/request'

Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Form)
Vue.use(Input)
Vue.use(Icon)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Breadcrumb)

// axios -> Vue.$http or this.$http
Vue.use(BunAxios)

Vue.prototype.$message = message

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
