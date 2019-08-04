import { axios } from '@/utils/request'

export function getList() {
    return axios({
        url: '/posts',
        method: 'get'
    })
}
