<template>
  <div class="post-container">
    <h1>博文</h1>
    <div>
      <a-button type="default" icon="edit" @click="goToNewPost">撰写博文</a-button>

      <a-table
        :row-key="row => row.id"
        :dataSource="postList"
        :columns="postTableColumns"
        :loading="postTableLoading"
        :pagination="postTablePagination"
        @change="fillPostTable"
      >
        <template slot="post-title" slot-scope="title, row">
          <router-link :to="{ name:'admin-post-edit', params: { id: row.id } }">{{title}}</router-link>
        </template>
        <template slot="operation" slot-scope="operation, row">
          <router-link :to="{ name:'admin-post-edit', params: { id: row.id } }">编辑</router-link>
          <a-divider type="vertical" />
          <router-link :to="{ name:'post-detail', params: { linkName: row.linkName } }">查看</router-link>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/post'

const postTableColumns = [
  {
    dataIndex: 'title',
    title: '标题',
    scopedSlots: { customRender: 'post-title' }
  },
  {
    dataIndex: 'publishedOn',
    title: '发表时间'
  },
  {
    dataIndex: 'operation',
    title: '操作',
    scopedSlots: {
      customRender: 'operation'
    }
  }
]

export default {
  data() {
    return {
      postList: [],
      postTableColumns,
      postTableLoading: true,
      postTablePagination: {
        current: 1,
        defaultCurrent: 1,
        total: 100
      }
    }
  },
  methods: {
    fillPostTable(pagination, pageSize) {
      this.postTableLoading = true

      if (!pagination) {
        pagination = this.postTablePagination
      } else {
        this.postTablePagination.current = pagination.current
      }

      getList(pagination.current, pagination.defaultPageSize).then(postList => {
        this.postList = postList
        this.postTableLoading = false
      }).catch(error => {
        console.log(error)
        this.$message.error('获取博文列表失败')
      })
    },
    goToNewPost() {
      this.$router.push('/admin/post/new')
    }
  },
  mounted() {
    this.fillPostTable()
  }
}
</script>

<style lang="stylus" scoped>
.post-container
  margin-top: 10px
</style>
