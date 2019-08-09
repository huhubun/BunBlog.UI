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
        </a-table>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { getList, add } from '@/api/category'

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
  }
]

export default {
  data() {
    return {
      form: this.$form.createForm(this),
      categoryTableLoading: true,
      categoryTableColumns,
      categoryList: []
    }
  },
  methods: {
    fillCategoryTable() {
      this.categoryTableLoading = true

      getList().then(categoryList => {
        this.categoryList = categoryList
        this.categoryTableLoading = false
      }).catch(error => {
        console.log(error)
        this.$message.error('获取分类列表失败')
      })
    },
    addCategory() {
      this.form.validateFields((errors, values) => {
        if (!errors) {
          let category = this.form.getFieldsValue()
          add(category).then(res => {
            this.form.resetFields()
            this.fillCategoryTable()

            this.$message.success('添加分类成功')
          }).catch(error => {
            let errorMessage = '添加分类失败'
            let errorResponse = error.response
            if (errorResponse.status === 400) {
              let errorData = errorResponse.data
              errorMessage += ` ${errorData.message}`
            }

            console.error(errorMessage)
            this.$message.error(errorMessage)
          })
        }
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
