import { axios } from '@/utils/request'

export function getToken(userInfo) {
    return axios({
        url: '/api/authentication/token',
        method: 'post',
        data: userInfo
    })
}
