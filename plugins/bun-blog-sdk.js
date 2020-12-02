export default ({ $axios }, inject) => {

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

    }
  }

  const sdk = {
    posts
  }

  inject('bunblog', sdk)
}