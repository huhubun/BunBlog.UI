import Vue from 'vue'

const BunHelperImpl = {
  tryParseModelValidationError(response) {
    if (response && response.code === 'MODEL_VALIDATION_ERROR') {
      let errors = response.errors
      let message = []

      for (let propName in errors) {
        let prop = errors[propName]

        for (let i = 0; i < prop.length; i++) {
          message.push(prop[i])
        }
      }

      return message.join('')
    }

    return null
  }
}

const BunHelper = {
  install(Vue) {
    Vue.prototype.$bunHelper = BunHelperImpl
  }
}

Vue.use(BunHelper)