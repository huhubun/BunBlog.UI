<template>
  <div>
    <a-form :form="form" @submit.prevent="submit">
      <a-input placeholder="Username" v-model="username" ref="usernameInput">
        <a-icon slot="prefix" type="user" />
        <a-icon v-if="username" slot="suffix" type="close-circle" @click="emitEmpty" />
      </a-input>
      <a-input placeholder="Password" v-model="password" ref="passwordInput" type="password">
        <a-icon slot="prefix" type="key" />
      </a-input>
      <a-button type="primary" html-type="submit">登录</a-button>
    </a-form>
  </div>
</template>

<script>
import Vue from 'vue'
import { loginByPassword } from '@/services/authentication'

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
      loginByPassword({
        username: this.username,
        password: this.password
      }).then(res => {
        Vue.sessionStorage.set('username', this.username)
        this.$router.push('/admin')
      }).catch(e => {
        this.$message.error(`登录失败：${e.message}`)
      })
    }
  }
}
</script>

<style lang="stylus" scoped></style>
