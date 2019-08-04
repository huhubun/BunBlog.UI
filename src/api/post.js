import { axios } from '@/utils/request'

export function getList() {
    return axios({
        url: '/posts',
        method: 'get'
    })
}

export function getDetail(id) {
    return axios({
        url: `/posts/${id}`,
        method: 'get'
    })
}

export function UpdateVisits(id) {
    return axios({
        url: `/posts/${id}/visits`,
        method: 'put'
    })
}
