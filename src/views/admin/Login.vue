<template>
  <a-layout style="min-height: 100vh">
    <header>
      <h1>Bun Blog Admin</h1>
    </header>
    <a-layout-content>
      <a-row type="flex" justify="center">
        <a-col :span="6">
          <a-form :form="form" @submit.prevent="submit">
            <a-form-item>
              <a-input
                placeholder="Username"
                ref="usernameInput"
                class="bun-margin-top-2x"
                auto-focus
                v-decorator="[
                  'username',
                  { rules: [{required: true, message: '请输入用户名'}] }
                  ]"
              >
                <a-icon slot="prefix" type="user" />
              </a-input>
            </a-form-item>

            <a-form-item>
              <a-input
                placeholder="Password"
                ref="passwordInput"
                type="password"
                v-decorator="[
                  'password',
                  { rules: [{required: true, message: '请输入密码'}] }
                  ]"
              >
                <a-icon slot="prefix" type="key" />
              </a-input>
            </a-form-item>

            <div class="login-operation bun-margin-top-2x">
              <a-button type="primary" html-type="submit" block>登录</a-button>
            </div>
          </a-form>
        </a-col>
      </a-row>
    </a-layout-content>
    <a-layout-footer>
      <powered-by />
      <copyright />
    </a-layout-footer>
  </a-layout>
</template>

<script>
import Vue from 'vue'
import { loginByPassword } from '@/services/authentication'
import PoweredBy from '@/components/layout/PoweredBy'
import Copyright from '@/components/layout/Copyright'

export default {
  data() {
    return {
      form: this.$form.createForm(this)
    }
  },
  methods: {
    submit() {
      this.form.validateFields((errors, values) => {
        if (!errors) {
          let loginInfo = this.form.getFieldsValue()

          loginByPassword({
            username: loginInfo.username,
            password: loginInfo.password
          }).then(res => {
            Vue.sessionStorage.set('username', this.username)
            this.$router.push('/admin')

            this.$notification.success({
              message: `${loginInfo.username}，欢迎回来！`,
              description: '',
              icon: <a-icon type="smile" style="color: #52c41a" />
            })
          }).catch(e => {
            this.$message.error(`登录失败：${e.message}`)
          })
        }
      })
    }
  },
  components: {
    PoweredBy,
    Copyright
  }
}
</script>

<style lang="stylus" scoped>
.ant-layout
  min-height: 100vh

header
  text-align: center
  padding-top: 128px

  h1
    font-weight: 200

.login-operation
  text-align: center

.ant-layout-footer
  text-align: center
</style>
