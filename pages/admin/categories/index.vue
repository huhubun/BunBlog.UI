<template>
  <div class="category-container">
    <h1>分类</h1>
    <a-row :gutter="32">
      <a-col :span="8">
        <h2>添加</h2>
        <a-form :form="form" @submit.prevent="addCategory">
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
            <a-button type="primary" html-type="submit">添加新分类</a-button>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :span="16">
        <h2>列表</h2>
        <a-table
          :rowKey="row => row.linkName"
          :dataSource="categoryList"
          :columns="categoryTableColumns"
          :loading="categoryTableLoading"
          class="category-table"
        >
          <span slot="displayNameHeader">
            <a-icon type="block" />显示名称
          </span>
          <span slot="linkNameHeader">
            <a-icon type="link" />链接名称
          </span>
          <span slot="operation" slot-scope="operation, record">
            <a-popconfirm
              v-if="categoryList.length"
              title="确定要删除该分类吗？"
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
const categoryTableColumns = [
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
      title: '分类管理'
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      categoryTableLoading: true,
      categoryTableColumns,
      categoryList: []
    }
  },
  methods: {
    getList() {
      return this.$axios.get(`/api/categories`)
    },
    add(category) {
      return this.$axios.post(`/api/categories`, category)
    },
    remove(linkName) {
      return this.$axios.delete(`/api/categories/${linkName}`)
    },
    fillCategoryTable() {
      this.categoryTableLoading = true

      this.getList()
        .then(categoryList => {
          this.categoryList = categoryList.data
          this.categoryTableLoading = false
        })
        .catch(error => {
          console.log(error)
          this.$message.error('获取分类列表失败')
        })
    },
    addCategory() {
      this.form.validateFields((errors, values) => {
        if (!errors) {
          let category = this.form.getFieldsValue()
          this.add(category)
            .then(res => {
              this.form.resetFields()
              this.fillCategoryTable()

              this.$message.success('添加分类成功')
            })
            .catch(error => {
              let errorMessage = '添加分类失败'
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
          this.$message.success(`已删除分类 ${displayName}`)
          this.fillCategoryTable()
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
    this.fillCategoryTable()
  }
}
</script>

<style lang="stylus" scoped>
.category-container
  margin-top: 10px

.category-table th .anticon
  margin-right: 6px
</style>
