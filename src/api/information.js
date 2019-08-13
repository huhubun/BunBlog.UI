import { axios } from '@/utils/request'

export function get() {
    return axios({
        url: '/api/information',
        method: 'get'
    })
}
