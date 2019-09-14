import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Storage from 'vue-ls'

import { Button, Form, Input, Icon, Layout, Menu, Breadcrumb, List, Skeleton, Divider, Tag, Affix, Row, Col, Table, Popconfirm, Alert, Tooltip, Dropdown, Drawer, Select, Modal, Upload, message, notification } from 'ant-design-vue'

import { BunAxios } from './utils/request'
import { BunHelper } from './utils/bunHelper'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import '@babel/polyfill'

Vue.config.productionTip = false

Vue.use(Storage, {
  namespace: 'bunblog_ui__', // key prefix
  name: 'sessionStorage', // name variable Vue.[ls] or this.[$ls],
  storage: 'session' // storage name session, local, memory
})

Vue.use(Button)
Vue.use(Form)
Vue.use(Input)
Vue.use(Icon)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Breadcrumb)
Vue.use(List)
Vue.use(Skeleton)
Vue.use(Divider)
Vue.use(Tag)
Vue.use(Affix)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(Popconfirm)
Vue.use(Alert)
Vue.use(Tooltip)
Vue.use(Dropdown)
Vue.use(Drawer)
Vue.use(Select)
Vue.use(Modal)
Vue.use(Upload)

// axios -> Vue.$http or this.$http
Vue.use(BunAxios)
// bunHelper -> Vue.$bunHelper or this.$bunHelper
Vue.use(BunHelper)

Vue.prototype.$message = message
Vue.prototype.$notification = notification

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
