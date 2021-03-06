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
          <n-link :to="`/admin/posts/edit/${row.id}`">{{title}}</n-link>
          <a-tag v-if="isDraft(row)">草稿</a-tag>
        </template>
        <template slot="operation" slot-scope="operation, row">
          <n-link :to="`/admin/posts/edit/${row.id}`">编辑</n-link>
          <a-divider type="vertical" />
          <n-link :to="`/posts/${row.linkName}`">查看</n-link>
          <template v-if="isDraft(row)">
            <a-divider type="vertical" />
            <a-popconfirm
              title="确定要删除该草稿吗？"
              okText="删除"
              okType="danger"
              cancelText="取消"
              @confirm="() => deleteDraft(row.linkName, row.title)"
            >
              <a href="javascript:;">删除</a>
            </a-popconfirm>
          </template>
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
        total: 0
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
          let response = postList.data

          this.postList = response.items
          this.postTablePagination.total = response.total
          this.postTableLoading = false
        })
        .catch(error => {
          console.log(error)
          this.$message.error('获取博文列表失败')
        })
    },
    deleteDraft(linkName, title) {
      this.$axios
        .delete(`/api/posts/${linkName}/draft`)
        .then(res => {
          this.$message.success(`已删除《${title}》的草稿`)
          this.fillPostTable()
        })
        .catch(error => {
          console.log(error)
          this.$message.error(`删除《${title}》的草稿失败`)
        })
    },
    goToNewPost() {
      this.$router.push('/admin/posts/new')
    },
    isDraft(post) {
      return post.type === "draft"
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
