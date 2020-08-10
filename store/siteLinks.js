export const state = () => ({
  siteLinks: [],
  issiteLinksHasBeenSet: false
})

export const mutations = {
  set(state, siteLinks) {
    state.siteLinks = siteLinks || []
    state.issiteLinksHasBeenSet = true
  }
}
