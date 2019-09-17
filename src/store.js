import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiInformation: {
      os: null,
      runtimeFramework: null,
      version: null
    }
  },
  mutations: {
    setApiInformation(state, apiInformation) {
      state.apiInformation.version = apiInformation.version
      state.apiInformation.os = apiInformation.os
      state.apiInformation.runtimeFramework = apiInformation.runtimeFramework
    }
  },
  actions: {

  }
})
