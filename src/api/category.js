import { axios } from '@/utils/request'

export function getList() {
    return axios({
        url: '/api/categories',
        method: 'get'
    })
}

export function getDetail(linkName) {
    return axios({
        url: `/api/categories/${linkName}`,
        method: 'get'
    })
}

export function add(category) {
    return axios({
        url: `/api/categories`,
        method: 'post',
        data: category
    })
}

export function update(linkName, category) {
    return axios({
        url: `/api/categories/${linkName}`,
        method: 'put',
        data: category
    })
}

export function remove(linkName) {
    return axios({
        url: `/api/categories/${linkName}`,
        method: 'delete'
    })
}
