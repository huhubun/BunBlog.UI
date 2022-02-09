export default function ({ store, route }) {
  store.commit('adminRoute/SetCurrent', route.name)
}
