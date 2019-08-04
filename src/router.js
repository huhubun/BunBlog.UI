import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '',
          component: () => import('@/views/post/List')
        },
        {
          path: '/post/:id',
          name: 'post-detail',
          component: () => import('@/views/post/Detail')
        }
      ]
    },
    {
      path: '/admin/login',
      name: 'login',
      component: () => import('@/views/admin/Login')
    }
  ]
})
