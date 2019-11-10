export const state = () => ({
  username: null,
  accessToken: null,
  refreshToken: null
})

export const mutations = {
  login(state, currentUser) {
    state.username = currentUser.username
    state.accessToken = currentUser.accessToken
    state.refreshToken = currentUser.refreshToken
  },
  logout(state) {
    state.username = null
    state.accessToken = null
    state.refreshToken = null
  }
}
