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

    async getById(postId) {
      if (!postId) {
        throw 'postId is required'
      }

      const post = await $axios.$get(`/api/posts/${postId}`)

      return post
    },

    async getByLinkName(linkName) {
      if (!linkName) {
        throw 'linkname is required'
      }

      const post = await $axios.$get(`/api/posts/${linkName}`)

      return post
    },

    async new(blogPost) {
      return await $axios.$post('/api/posts', blogPost)
    },

    async edit(id, blogPost) {
      await $axios.$put(`/api/posts/${id}`, blogPost)
    },

    async editDraft(id, blogPostDraft) {
      await $axios.$put(`/api/posts/${id}/draft`, blogPostDraft)
    },

    async deleteDraft(linkName) {
      await $axios.$delete(`/api/posts/${linkName}/draft`)
    }
  }

  const setting = {
    async getList() {
      return await $axios.$get('/api/settings')
    },

    async update(setting) {
      return await $axios.$put(`/api/settings/${setting.code}`, { value: setting.value })
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
    setting,
    siteLink,
    tag
  }

  inject('bunblog', sdk)
}