<template>
  <article >
    <mini-header :title="title" />

    <v-container>
      <v-row>
        <v-col
          v-for="link in links"
          :key="link.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          xl="2"
        >
          <v-btn depressed block :href="link.link" plain class="text-truncate">
            {{ link.name }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </article>
</template>

<script>
import MiniHeader from '@/components/layout/MiniHeader.vue'

export default {
  async asyncData({ $bunblog }) {
    const links = await $bunblog.siteLink.getList()

    return { links }
  },
  data() {
    return {
      title: '友情链接'
    }
  },
  components: {
    MiniHeader
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '呼呼小笼包博客的友情链接页面，记录了各位小伙伴的站点地址。'
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: '呼呼小笼包,huhubun,bun,bun.plus,博客,友情链接'
        }
      ]
    }
  }
}
</script>

<style>
</style>