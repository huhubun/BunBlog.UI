<template>
  <div class="home">
    <div>
      <h1>Welcome!!</h1>
      <a-button type="primary" @click="login">Login</a-button>

      <a-button type="primary" @click="ajax">Ajax test</a-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  methods: {
    login() {
      this.$router.push({ name: 'login' })
    },
    ajax() {
      this.$http.post('https://api.lab.bun.dev/v1/ids/guids').then(res => {
        this.$message.success(`guid: ${res.data.guid}`)
      })
    }
  },
  components: {
  }
}
</script>

<style lang="stylus" scoped>
h1
  color: red
  font-weight: 800
</style>
