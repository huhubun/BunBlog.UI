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
          <n-link :to="`/admin/post/edit/${row.id}`">{{title}}</n-link>
        </template>
        <template slot="operation" slot-scope="operation, row">
          <n-link :to="`/admin/post/edit/${row.id}`">编辑</n-link>
          <a-divider type="vertical" />
          <n-link :to="`/posts/${row.linkName}`">查看</n-link>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
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
  layout: 'admin',
  head() {
    return {
      title: '博文管理'
    }
  },
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
    getList(page, pageSize) {
      return this.$axios.get(`/api/posts`, {
        params: {
          page,
          pageSize
        }
      })
    },
    fillPostTable(pagination, pageSize) {
      this.postTableLoading = true

      if (!pagination) {
        pagination = this.postTablePagination
      } else {
        this.postTablePagination.current = pagination.current
      }

      this.getList(pagination.current, pagination.defaultPageSize)
        .then(postList => {
          this.postList = postList.data
          this.postTableLoading = false
        })
        .catch(error => {
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
