import { axios } from '@/utils/request'

export function getList(page, pageSize) {
    return axios({
        url: '/api/posts',
        method: 'get',
        params: {
            page,
            pageSize
        }
    })
}

export function getDetail(id) {
    return axios({
        url: `/api/posts/${id}`,
        method: 'get'
    })
}

export function getDetailByLinkName(linkName) {
    return axios({
        url: `/api/posts/${linkName}`,
        method: 'get'
    })
}

export function getDetailHeadByLinkName(linkName) {
    return axios({
        url: `/api/posts/${linkName}`,
        method: 'head'
    })
}

export function postNewBlogPost(blogPost) {
    return axios({
        url: `/api/posts`,
        method: 'post',
        data: blogPost
    })
}

export function editBlogPost(blogPost) {
    return axios({
        url: `/api/posts/${blogPost.id}`,
        method: 'put',
        data: blogPost
    })
}

export function UpdateVisits(id) {
    return axios({
        url: `/api/posts/${id}/visits`,
        method: 'post'
    })
}
