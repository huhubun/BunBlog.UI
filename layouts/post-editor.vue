<template>
  <client-only>
    <nuxt />
  </client-only>
</template>

<script>
export default {
  middleware: 'auth'
}
</script>