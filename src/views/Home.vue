<template>
  <div class="home">
    <div>
      <a-button type="primary" @click="displayMessage">My button</a-button>
    </div>

    <HelloWorld msg="Welcome to My Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  methods: {
    displayMessage() {
      this.$message.info('button clicked')
    }
  },
  components: {
    HelloWorld
  }
}
</script>
