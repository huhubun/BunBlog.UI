<template>
  <a-layout>
    <a-affix :offsetTop="0">
      <a-layout-header>
        <a-menu mode="horizontal" theme="light">
          <a-menu-item style="float: left;" class="title">
            <router-link to="/">呼呼小笼包的博客</router-link>
          </a-menu-item>
          <a-menu-item>
            <router-link to="/about">关于</router-link>
          </a-menu-item>
          <a-menu-item>
            <a-input-search placeholder="Search" />
          </a-menu-item>
        </a-menu>
      </a-layout-header>
    </a-affix>
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
.ant-layout
  min-height: 100vh

.ant-layout-header
  text-align: right
  background-color: #FFF
  box-shadow: 0 0 10px -5px #000

.ant-layout-header .ant-menu.ant-menu-root
  border-bottom: 0
  padding-top: 8px

.ant-layout-content
  background-color: #FFF
  padding: 0 50px

.ant-layout-footer a
  color: black

.title
  font-size: 1.6em;
</style>
