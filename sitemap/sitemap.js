const axios = require('axios')

const sitemap = {
  // cache 12 hours
  cacheTime: 1000 * 60 * 60 * 12,
  gzip: true,
  exclude: [
    '/login',
    '/logout',
    '/admin',
    '/admin/**'
  ],
  routes: async () => {
    const { data } = await axios.get(process.env.BASE_URL + 'api/posts/linkNames')
    return data.map((linkName) => `/posts/${linkName}`)
  }
}

module.exports = sitemap