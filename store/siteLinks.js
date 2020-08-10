export const state = () => ({
  siteLinks: [],
  isSiteLinksHasBeenSet: false
})

export const mutations = {
  set(state, siteLinks) {
    state.siteLinks = siteLinks || []
    state.isSiteLinksHasBeenSet = true
  }
}
