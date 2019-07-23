<template>
  <a-form :form="form">
    <a-input placeholder="Username" v-model="username" ref="usernameInput">
      <a-icon slot="prefix" type="user" />
      <a-icon v-if="username" slot="suffix" type="close-circle" @click="emitEmpty" />
    </a-input>
    <a-input placeholder="Password" v-model="password" ref="passwordInput" type="password">
      <a-icon slot="prefix" type="key" />
    </a-input>
  </a-form>
</template>

<script>
export default {
  data() {
    return {
      form: this.$form.createForm(this),
      username: '',
      password: ''
    }
  },
  methods: {
    emitEmpty() {
      this.$refs.usernameInput.focus()
      this.username = ''
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
