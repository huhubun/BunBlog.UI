import Vue from 'vue'
import { getToken } from '@/api/authentication'

export function loginByPassword(userInfo) {
    userInfo.grant_type = 'password'

    return login(userInfo)
}

export function loginByRefreshToken() {
    let userInfo = {
        grant_type: 'refresh_token',
        username: Vue.sessionStorage.get('username'),
        refresh_token: Vue.sessionStorage.get('refreshToken')
    }

    return login(userInfo)
}

export function login(userInfo) {
    return new Promise((resolve, reject) => {
        getToken(userInfo).then(response => {
            Vue.sessionStorage.set('accessToken', response.access_token, response.expires_in * 1000)
            Vue.sessionStorage.set('refreshToken', response.refresh_token)
            resolve(response)
        }).catch(error => {
            console.log(error)
            if (error.response.status === 400) {
                let data = error.response.data
                let badRequestError = new Error(data.message)
                badRequestError.name = data.code

                reject(badRequestError)
            }
        })
    })
}
