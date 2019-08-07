<template>
  <div class="bun-margin-top">
    <span>&copy; {{ year }} huhubun</span>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'Copyright',
  data() {
    return {
      year: dayjs().year()
    }
  }
}

</script>
