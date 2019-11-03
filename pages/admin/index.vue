<template>
  <div class="dashboard-container">
    <h1>Dashboard</h1>
    <a-alert
      message="Coming Soon"
      description="This page is under development and will be available later"
      type="warning"
    />

  </div>
</template>

<script>
export default {
  layout: 'admin',
  head() {
    return {
      title: 'Dashboard'
    }
  }
}
</script>

<style lang="stylus" scoped>
.dashboard-container
  margin-top: 10px
</style>
