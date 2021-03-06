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

  const image = {
    async upload(image) {
      let formData = new FormData();
      formData.append('image', image);

      return await $axios.$post('/api/images', formData, {
        headers: {
          'Content-Type': 'multipart/form'
        }
      })
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

    async deleteDraft(id) {
      await $axios.$delete(`/api/posts/${id}/draft`)
    },

    async visits(id) {
      await $axios.$post(`/api/posts/${id}/visits`)
    }
  }

  const setting = {
    async getList(codes) {
      let params = new URLSearchParams()
      codes.forEach(c => params.append('code', c))

      return await $axios.$get('/api/settings', { params })
    },

    async update(setting) {
      return await $axios.$put(`/api/settings/${setting.code}`, { value: setting.value })
    }
  }

  const settingDefinitions = {
    async getList() {
      return await $axios.$get('/api/settingDefinitions')
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
    image,
    informations,
    posts,
    setting,
    settingDefinitions,
    siteLink,
    tag
  }

  inject('bunblog', sdk)
}