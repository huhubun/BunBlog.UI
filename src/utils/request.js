import axios from 'axios'

import { BunAxios } from './axios'

const service = axios.create({
    baseURL: '',
    timeout: 6000
})

const installer = {
    install(Vue){
        Vue.use(BunAxios, service)
    }
}

export {
    installer as BunAxios,
    service as axios
  }
  