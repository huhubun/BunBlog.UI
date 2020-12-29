<template>
  <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit">
    <v-row class="d-flex justify-center">
      <v-col cols="12" xl="4" lg="5" md="6">
        <v-card outlined id="SignInCard">
          <v-card-title class="justify-center"> Bun Blog Admin </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="username"
              :rules="usernameRules"
              label="Username"
              required
            ></v-text-field>

            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="Password"
              type="password"
              required
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn
              outlined
              block
              color="success"
              type="submit"
              :loading="waitForSignIn"
              >Sign in</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar
      :timeout="-1"
      :value="!!message"
      text
      top
      centered
      :color="messageType"
    >
      {{ message }}

      <template v-slot:action="{ attrs }">
        <v-btn :color="messageType" text v-bind="attrs" @click="message = ''">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-form>
</template>

<script>
import Vue from 'vue'

export default {
  layout: 'login',
  head() {
    return {
      title: '登录'
    }
  },
  data() {
    return {
      valid: true,
      username: null,
      usernameRules: [v => !!v || 'Username is required'],
      password: null,
      passwordRules: [v => !!v || 'Password is required'],

      waitForSignIn: false,

      message: null,
      messageType: null
    }
  },
  methods: {
    submit() {
      if (!this.$refs.form.validate()) {
        return
      }

      this.waitForSignIn = true
      this.message = null

      this.$bunblog.authentication
        .getToken({
          username: this.username,
          password: this.password
        })
        .then(token => {
          this.$store.commit('currentUser/login', {
            accessToken: token.access_token,
            refreshToken: token.refresh_token,
            username: this.username
          })

          this.$router.push('/admin')
        })
        .catch(e => {
          this.message = `登陆失败 ${e.message}`
          this.messageType = 'error'
        })
        .finally(() => {
          this.waitForSignIn = false
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
#SignInCard
  margin-top: 10em
</style>