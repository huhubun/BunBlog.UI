export const actions = {
  async nuxtServerInit({ commit }, { $bunblog }) {
    let apiInfoPromise = $bunblog.informations.get().then(apiInfo => {
      commit('apiInformation/set', apiInfo)
    }).catch(e => {
      console.error('获取 apiInformation 时出错', e)
    })

    let settingsPromise = $bunblog.setting.getList(['certification.list', 's.poweredby']).then(settings => {
      settings.forEach(s => { commit('settings/set', s) })
    }).catch(e => {
      console.error('获取 settings 时出错', e)
    })

    await Promise.all([apiInfoPromise, settingsPromise])
  }
}
