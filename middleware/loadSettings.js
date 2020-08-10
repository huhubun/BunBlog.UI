// 因为 components 无法方便的在服务器端渲染（参见 https://zh.nuxtjs.org/faq/async-data-components ）
// 所以只能选这种折衷的方式获取自定义的 footer
export default function (context) {
  if (context.store.state.customLayout.isFooterTemplateHasBeenSet) {
    return Promise.resolve()
  }

  return context.app.$axios.$get('/api/settings/layout.footer').then(response => {
    let template = null;

    if (response.value != null) {
      template = response.value
    }

    context.store.commit('customLayout/setFooterTemplate', template)
  }).catch(e => {
    console.error('获取自定义 footer 时出错', e)
  })
}
