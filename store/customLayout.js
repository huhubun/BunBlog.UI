export const state = () => ({
  footerTemplate: null
})

export const mutations = {
  setFooterTemplate(state, template) {
    state.footerTemplate = template
  }
}
