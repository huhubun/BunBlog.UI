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
        </a-table>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { getList, add } from '@/api/tag'

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
  }
]

export default {
  data() {
    return {
      form: this.$form.createForm(this),
      tagTableLoading: true,
      tagTableColumns,
      tagList: []
    }
  },
  methods: {
    fillTagTable() {
      this.tagTableLoading = true

      getList().then(tagList => {
        this.tagList = tagList
        this.tagTableLoading = false
      }).catch(error => {
        console.log(error)
        this.$message.error('获取标签列表失败')
      })
    },
    addTag() {
      this.form.validateFields((errors, values) => {
        if (!errors) {
          let tag = this.form.getFieldsValue()
          add(tag).then(res => {
            this.form.resetFields()
            this.fillTagTable()

            this.$message.success('添加标签成功')
          }).catch(error => {
            let errorMessage = '添加标签失败'
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
