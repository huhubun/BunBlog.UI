export const state = () => ({
  footerTemplate: null,
  isFooterTemplateHasBeenSet: false
})

export const mutations = {
  setFooterTemplate(state, template) {
    state.footerTemplate = template
    state.isFooterTemplateHasBeenSet = true
  }
}
