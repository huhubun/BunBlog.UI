import axios from 'axios'

import { BunAxios } from './axios'

const service = axios.create({
    baseURL: process.env.VUE_APP_BUN_BLOG_API_BASE_URL,
    timeout: 6000
})

const installer = {
    install(Vue) {
        Vue.use(BunAxios, service)
    }
}

export {
    installer as BunAxios,
    service as axios
}
