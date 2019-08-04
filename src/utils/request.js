import axios from 'axios'

import { BunAxios } from './axios'

const service = axios.create({
    baseURL: 'http://localhost:52000/api',
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
