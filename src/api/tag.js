import { axios } from '@/utils/request'

export function getList() {
    return axios({
        url: '/api/tags',
        method: 'get'
    })
}

export function getDetail(linkName) {
    return axios({
        url: `/api/tags/${linkName}`,
        method: 'get'
    })
}

export function add(tag) {
    return axios({
        url: `/api/tags`,
        method: 'post',
        data: tag
    })
}

export function update(linkName, tag) {
    return axios({
        url: `/api/tags/${linkName}`,
        method: 'put',
        data: tag
    })
}

export function remove(linkName) {
    return axios({
        url: `/api/tags/${linkName}`,
        method: 'delete'
    })
}
