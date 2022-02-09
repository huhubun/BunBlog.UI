export const actions = {
  async nuxtServerInit({ commit }, { $bunblog }) {
    let siteLinkPromise = $bunblog.siteLink
      .getList()
      .then(siteLinks => {
        commit('siteLinks/set', siteLinks)
      })
      .catch(e => {
        console.error('获取友情链接时出错', e)
      })

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

    await Promise.all([siteLinkPromise, apiInfoPromise, settingsPromise])
  }
}
