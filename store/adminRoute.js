export const state = () => ({
  routes: {
    'admin': {
      icon: 'mdi-gauge',
      title: '仪表盘',
      to: '/admin'
    },
    'admin-posts': {
      icon: 'mdi-note-multiple',
      title: '博文管理',
      to: '/admin/posts'
    },
    'admin-categories': {
      icon: 'mdi-inbox-multiple',
      title: '分类管理',
      to: '/admin/categories'
    },
    'admin-tags': {
      icon: 'mdi-tag',
      title: '标签管理',
      to: '/admin/tags'
    },
    'admin-siteLinks': {
      icon: 'mdi-link',
      title: '友情链接管理',
      to: '/admin/siteLinks'
    },
    'admin-settings': {
      icon: 'mdi-cog',
      title: '设置',
      to: '/admin/settings'
    },
  },
  current: null
})

export const mutations = {
  SetCurrent(state, routeName) {
    state.current = state.routes[routeName]
  }
}
