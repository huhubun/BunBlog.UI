export const state = () => ({
  siteLinks: []
})

export const mutations = {
  set(state, siteLinks) {
    state.siteLinks = siteLinks || []
  }
}
