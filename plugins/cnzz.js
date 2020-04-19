export default ({ app: { router } }) => {
  router.afterEach((to, from) => {
    try {
      var content_url = to.fullPath
      var referer_url = from.fullPath
      _czc.push(['_trackPageview', content_url, referer_url])
    } catch (e) {
    }
  })
}
