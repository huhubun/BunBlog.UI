<template>
  <div class="tag-container">
    <h1>标签</h1>
    <a-row :gutter="32">
      <a-col :span="8">
        <h2>添加</h2>
        <a-form :form="form" @submit.prevent="addTag">
          <a-form-item label="显示名称">
            <a-input
              v-decorator="[
            'displayName',
            { rules: [{required: true, message: '必须设置显示名称'}] }
            ]"
              autocomplete="off"
            >
              <a-icon slot="prefix" type="block" />
            </a-input>
          </a-form-item>

          <a-form-item label="链接名称">
            <a-input
              v-decorator="[
            'linkName',
            { rules: [{required: true, message: '必须设置链接名称'}] }
            ]"
              autocomplete="off"
            >
              <a-icon slot="prefix" type="link" />
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-button type="primary" html-type="submit">添加新标签</a-button>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :span="16">
        <h2>列表</h2>
        <a-table
          :rowKey="row => row.linkName"
          :dataSource="tagList"
          :columns="tagTableColumns"
          :loading="tagTableLoading"
          class="tag-table"
        >
          <span slot="displayNameHeader">
            <a-icon type="block" />显示名称
          </span>
          <span slot="linkNameHeader">
            <a-icon type="link" />链接名称
          </span>
          <span slot="operation" slot-scope="operation, record">
            <a-popconfirm
              v-if="tagList.length"
              title="确定要删除该标签吗？"
              okText="删除"
              okType="danger"
              cancelText="取消"
              @confirm="() => onDelete(record.linkName, record.displayName)"
            >
              <a href="javascript:;">Delete</a>
            </a-popconfirm>
          </span>
        </a-table>
      </a-col>
    </a-row>
  </div>
</template>

<script>
const tagTableColumns = [
  {
    dataIndex: 'displayName',
    slots: {
      title: 'displayNameHeader'
    }
  },
  {
    dataIndex: 'linkName',
    slots: {
      title: 'linkNameHeader'
    }
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
      title: '标签管理'
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      tagTableLoading: true,
      tagTableColumns,
      tagList: []
    }
  },
  methods: {
    getList() {
      return this.$axios.get(`/api/tags`)
    },
    add(tag) {
      return this.$axios.post(`/api/tags`, tag)
    },
    remove(linkName) {
      return this.$axios.delete(`/api/tags/${linkName}`)
    },
    fillTagTable() {
      this.tagTableLoading = true

      this.getList()
        .then(tagList => {
          this.tagList = tagList.data
          this.tagTableLoading = false
        })
        .catch(error => {
          console.log(error)
          this.$message.error('获取标签列表失败')
        })
    },
    addTag() {
      this.form.validateFields((errors, values) => {
        if (!errors) {
          let tag = this.form.getFieldsValue()
          this.add(tag)
            .then(res => {
              this.form.resetFields()
              this.fillTagTable()

              this.$message.success('添加标签成功')
            })
            .catch(error => {
              let errorMessage = '添加标签失败'
              let errorResponse = error.response
              if (errorResponse.status === 400) {
                let errorData = errorResponse.data

                let modelValidationErrorMessage = this.$bunHelper.tryParseModelValidationError(
                  errorData
                )
                if (modelValidationErrorMessage) {
                  errorMessage += ` ${modelValidationErrorMessage}`
                } else {
                  errorMessage += ` ${errorData.message}`
                }
              }

              console.error(errorMessage)
              this.$message.error(errorMessage)
            })
        }
      })
    },
    onDelete(linkName, displayName) {
      this.remove(linkName)
        .then(res => {
          this.$message.success(`已删除标签 ${displayName}`)
          this.fillTagTable()
        })
        .catch(error => {
          console.error(error)

          let message = `删除失败`
          let errorResponse = error.response
          if (errorResponse.status === 400) {
            message += ` ${errorResponse.data.message}`
          }

          this.$message.error(message)
        })
    }
  },
  mounted() {
    this.fillTagTable()
  }
}
</script>

<style lang="stylus" scoped>
.tag-container
  margin-top: 10px

.tag-table th .anticon
  margin-right: 6px
</style>
