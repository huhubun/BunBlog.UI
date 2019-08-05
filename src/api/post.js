import { axios } from '@/utils/request'

export function getList() {
    return axios({
        url: '/api/posts',
        method: 'get'
    })
}

export function getDetail(id) {
    return axios({
        url: `/api/posts/${id}`,
        method: 'get'
    })
}

export function UpdateVisits(id) {
    return axios({
        url: `/api/posts/${id}/visits`,
        method: 'put'
    })
}
