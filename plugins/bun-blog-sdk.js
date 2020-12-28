export default ({ $axios }, inject) => {

  const authentication = {
    async getToken(loginInfo) {
      return await $axios.post('/api/authentication/token', {
        username: loginInfo.username,
        password: loginInfo.password,
        grant_type: 'password'
      })
    }
  }

  const posts = {
    async getList(query) {
      query = query || {}

      const posts = await $axios.$get('/api/posts', {
        params: query
      })

      console.log(posts)

      return posts
    },

    getById(postId) {
      console.log('get id = ' + postId)

    },

    async getByLinkName(linkName) {
      if (!linkName) {
        throw 'linkname is required'
      }

      const post = await $axios.$get(`/api/posts/${linkName}`)

      console.log(post)

      return post
    }
  }

  const informations = {
    async get() {
      return await $axios.get(`/api/information`)
    }
  }

  const sdk = {
    authentication,
    posts,
    informations
  }

  inject('bunblog', sdk)
}