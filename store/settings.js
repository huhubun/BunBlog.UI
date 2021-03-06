export const state = () => ({
  settings: {}
})

export const mutations = {
  set(state, setting) {
    state.settings[setting.code] = setting.value
  }
}
