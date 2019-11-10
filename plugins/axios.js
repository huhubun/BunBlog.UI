export default function ({ $axios, store, redirect }) {
  $axios.onRequest(config => {

    let accessToken = store.state.currentUser.accessToken
    if (accessToken) {
      $axios.setToken(accessToken, 'Bearer')
    }
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    
    // TODO refresh token 
  })
}
