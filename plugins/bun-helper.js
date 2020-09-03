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
  },

  generateAnchors(rootElement) {
    if (rootElement === null) {
      return []
    }

    let elements = rootElement.querySelectorAll('h2,h3')

    if (elements === null) {
      return []
    }

    let anchors = []

    for (let i = 0; i < elements.length; i++) {
      let header = elements[i]
      let anchor = header.querySelector('a')

      if (anchor === null) {
        continue
      }

      let content = {
        title: header.textContent,
        href: `#${anchor.id}`,
        subList: []
      }

      if (header.nodeName === 'H2') {
        anchors.push(content)
      } else if (header.nodeName === 'H3') {
        if (anchors.length === 0) {
          continue
        }

        anchors[anchors.length - 1].subList.push(content)
      }
    }

    return anchors
  }
}

const BunHelper = {
  install(Vue) {
    Vue.prototype.$bunHelper = BunHelperImpl
  }
}

Vue.use(BunHelper)