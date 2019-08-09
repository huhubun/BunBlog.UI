import Vue from 'vue'
import axios from 'axios'

import { BunAxios } from './axios'

const service = axios.create({
    baseURL: process.env.VUE_APP_BUN_BLOG_API_BASE_URL,
    timeout: 6000
})

const err = (error) => {
    console.log(error)

    return Promise.reject(error)
}

service.interceptors.request.use(config => {
    let accessToken = Vue.sessionStorage.get('accessToken')
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`
    }

    return config
}, err)

service.interceptors.response.use((response) => {
    return response.data
}, err)

const installer = {
    install(Vue) {
        Vue.use(BunAxios, service)
    }
}

export {
    installer as BunAxios,
    service as axios
}
