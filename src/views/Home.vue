<template>
  <a-layout>
    <a-layout-header>
      <a-menu mode="horizontal" theme="light">
        <a-menu-item style="float: left;">bun.dev</a-menu-item>
        <a-menu-item>首页</a-menu-item>
        <a-menu-item>关于</a-menu-item>
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

.ant-layout-footer a
  color: black
</style>
