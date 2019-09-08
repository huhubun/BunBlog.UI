import Vue from 'vue'
import axios from 'axios'
import router from '../router'
import { message } from 'ant-design-vue'

import { BunAxios } from './axios'
import { loginByRefreshToken, clearLoginInfo } from '@/services/authentication'

const service = axios.create({
    baseURL: process.env.VUE_APP_BUN_BLOG_API_BASE_URL,
    timeout: 6000
})

const err = (error) => {
    console.log(error)

    let requestConfig = error.config
    if (error.response) {
        if (error.response.status === 401 && !requestConfig._isRetry) {
            requestConfig._isRetry = true

            return loginByRefreshToken().then(res => {
                let accessToken = Vue.sessionStorage.get('accessToken')
                requestConfig.headers['Authorization'] = `Bearer ${accessToken}`

                return axios(requestConfig)
            }).catch(e => {
                clearLoginInfo()
                router.replace({
                    path: '/admin/login'
                })
                message.info('您的登陆凭证已经失效，请重新登录')

                return Promise.reject(error)
            })
        }
    }
    return Promise.reject(error)
}

service.interceptors.request.use(config => {
    let accessToken = Vue.sessionStorage.get('accessToken')

    if (accessToken != null) {
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
