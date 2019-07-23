const BunAxios = {
    install(Vue, instance) {
        if (this.installed) {
            return
        }
        this.installed = true

        Vue.axios = instance

        Object.defineProperties(Vue.prototype, {
            $http: {
                get() {
                    return instance
                }
            }
        })
    }
}

export {
    BunAxios
}