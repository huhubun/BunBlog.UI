export default ({ $axios }, inject) => {

  const authentication = {
    async getToken(loginInfo) {
      return await $axios.$post('/api/authentication/token', {
        username: loginInfo.username,
        password: loginInfo.password,
        grant_type: 'password'
      })
    }
  }

  const category = {
    async getList() {
      return await $axios.$get('/api/categories')
    },

    async add(category) {
      return await $axios.$post('/api/categories', category)
    },

    async remove(linkName) {
      return await $axios.$delete(`/api/categories/${linkName}`)
    }
  }

  const informations = {
    async get() {
      return await $axios.$get(`/api/information`)
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

  const siteLink = {
    async getList() {
      return await $axios.$get('/api/siteLinks')
    },

    async add(siteLink) {
      return await $axios.$post('/api/siteLinks', siteLink)
    },

    async remove(id) {
      return await $axios.$delete(`/api/siteLinks/${id}`)
    }
  }

  const tag = {
    async getList() {
      return await $axios.$get('/api/tags')
    },

    async add(tag) {
      return await $axios.$post('/api/tags', tag)
    },

    async remove(linkName) {
      return await $axios.$delete(`/api/tags/${linkName}`)
    }
  }


  const sdk = {
    authentication,
    category,
    informations,
    posts,
    siteLink,
    tag
  }

  inject('bunblog', sdk)
}