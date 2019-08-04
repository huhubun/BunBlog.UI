<template>
  <a-layout>
    <a-layout-header>
      <a-menu mode="horizontal" theme="light">
        <a-menu-item style="float: left;">
          <router-link to="/">bun.dev</router-link>
        </a-menu-item>
        <a-menu-item>
          <router-link to="/about">关于</router-link>
        </a-menu-item>
        <a-menu-item>
          <a-input-search placeholder="Search" />
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content>
      <router-view></router-view>
    </a-layout-content>
    <a-layout-footer>
      <div>
        <router-link to="/admin/login">admin</router-link>
      </div>
      <div>&copy; 2019 huhubun</div>
    </a-layout-footer>
  </a-layout>
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
.ant-layout-header
  text-align: right
  background-color: #FFF

.ant-layout-content
  background-color: #FFF
  padding: 0 50px

.ant-layout-footer a
  color: black
</style>
