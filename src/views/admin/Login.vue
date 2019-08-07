<template>
  <a-form :form="form" @submit.prevent="submit">
    <a-input placeholder="Username" v-model="username" ref="usernameInput">
      <a-icon slot="prefix" type="user" />
      <a-icon v-if="username" slot="suffix" type="close-circle" @click="emitEmpty" />
    </a-input>
    <a-input placeholder="Password" v-model="password" ref="passwordInput" type="password">
      <a-icon slot="prefix" type="key" />
    </a-input>
    <a-button type="primary" htmlType="submit">登陆</a-button>
  </a-form>
</template>

<script>
import { login } from '@/services/authentication'

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
    },
    submit() {
      login({
        username: this.username,
        password: this.password
      }).then(res => {
        this.$router.push({ name: 'admin-home' })
      }).catch(e => {
        this.$message.error(`登陆失败：${e.message}`)
      })
    }
  }
}
</script>

<style lang="stylus" scoped></style>
