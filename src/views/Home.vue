<template>
  <div class="home">
    <div>
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
        this.$message.info(`guid: ${res.data.guid}`)
      })
    }
  },
  components: {
  }
}
</script>
