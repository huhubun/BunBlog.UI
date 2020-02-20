// 因为 components 无法方便的在服务器端渲染（参见 https://zh.nuxtjs.org/faq/async-data-components ）
// 所以只能选这种折衷的方式获取友情链接
export default function (context) {
  return context.app.$axios.$get('/api/siteLinks').then(siteLinks => {
    context.store.commit('siteLinks/set', siteLinks)
  }).catch(e => {
  })
}
