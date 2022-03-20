export const state = () => ({
  os: null,
  runtimeFramework: null,
  version: null
})

export const mutations = {
  set(state, apiInformation) {
    state.version = apiInformation.version
    state.os = apiInformation.os
    state.isOnKubernetes = apiInformation.isOnKubernetes
    state.runtimeFramework = apiInformation.runtimeFramework
  }
}
