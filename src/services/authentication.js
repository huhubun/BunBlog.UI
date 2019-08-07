import Vue from 'vue'
import { getToken } from '@/api/authentication'

export function login(userInfo) {
    return new Promise((resolve, reject) => {
        getToken(userInfo).then(response => {
            Vue.sessionStorage.set('accessToken', response.accessToken)
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
