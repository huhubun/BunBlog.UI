<template>
  <v-container>
    <v-row>
      <v-col
        v-for="post in posts.items"
        :key="post.linkName"
        cols="12"
        xl="3"
        lg="4"
        md="6"
        sm="6"
      >
        <v-card :to="'/posts/' + post.linkName" hover>
          <v-card-subtitle v-if="post.category">
            {{ post.category.displayName }}
          </v-card-subtitle>
          <v-card-title>{{ post.title }}</v-card-title>
          <v-card-text>{{ post.excerpt }}</v-card-text>
          <v-card-text class="text-right">
            <v-chip
              v-for="tag in post.tagList"
              :key="tag.linkName"
              small
              class="mr-2"
            >
              {{ tag.displayName }}
            </v-chip>
          </v-card-text>
          <v-card-text>{{ post.publishedOn }}</v-card-text>
          <v-card-text v-if="post.metadataList">
            <span v-for="metadata in post.metadataList" :key="metadata.key">
              {{ metadata.value }}
            </span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'vuetify-default',
  async asyncData({ $bunblog }) {
    const posts = await $bunblog.posts.getList({
      type: 'post'
    })

    return { posts }
  },
  data() {
    return {
      clipped: true,
      drawer: false,
      items: [
        {
          icon: 'mdi-home-outline',
          title: '首页',
          to: '/'
        },
        {
          icon: 'mdi-file-document-outline',
          title: '文档',
          href: 'https://github.com/huhubun/DDNSSharp'
        },
        {
          icon: 'mdi-history',
          title: '更新记录',
          href: 'https://github.com/huhubun/DDNSSharp/releases'
        },
        {
          icon: 'mdi-keyboard-return',
          title: 'BUN.DEV',
          href: 'https://bun.dev/'
        }
      ],
      title: 'DDNSSharp',
      footers: [
        {
          text: '源代码',
          href: 'https://github.com/huhubun/DDNSSharp'
        },
        {
          text: 'bun.dev 旗下作品',
          href: 'https://bun.dev'
        }
      ]
    }
  }
}
</script>
