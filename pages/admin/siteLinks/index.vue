<template>
  <div class="site-links-container">
    <h1>{{ title }}</h1>
    <a-row :gutter="32">
      <a-col :span="8">
        <h2>添加</h2>
        <a-form :form="form" @submit.prevent="add">
          <a-form-item label="站点名称">
            <a-input
              v-decorator="[
            'name',
            { rules: [{required: true, message: '必须设置站点名称'}] }
            ]"
              autocomplete="off"
            >
              <a-icon slot="prefix" type="block" />
            </a-input>
          </a-form-item>

          <a-form-item label="站点链接">
            <a-input
              v-decorator="[
            'link',
            { rules: [{required: true, message: '必须设置站点链接'}] }
            ]"
              autocomplete="off"
            >
              <a-icon slot="prefix" type="link" />
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-button type="primary" html-type="submit">添加友情链接</a-button>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :span="16">
        <h2>列表</h2>
        <a-table
          :rowKey="row => row.linkName"
          :dataSource="siteLinksList"
          :columns="siteLinksTableColumns"
          :loading="siteLinksTableLoading"
          class="site-links-table"
        >
          <span slot="nameHeader">
            <a-icon type="block" />站点名称
          </span>
          <span slot="linkHeader">
            <a-icon type="link" />站点链接
          </span>
          <span slot="operation" slot-scope="operation, record">
            <a-popconfirm
              v-if="siteLinksList.length"
              title="确定要删除该友情链接吗？"
              okText="删除"
              okType="danger"
              cancelText="取消"
              @confirm="() => onDelete(record.id, record.name)"
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
const siteLinksTableColumns = [
  {
    dataIndex: 'name',
    slots: {
      title: 'nameHeader'
    }
  },
  {
    dataIndex: 'link',
    slots: {
      title: 'linkHeader'
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
      title: this.title
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      siteLinksTableLoading: true,
      siteLinksTableColumns,
      siteLinksList: [],
      title: '友情链接'
    }
  },
  methods: {
    add(siteLink) {
      this.form.validateFields((errors, values) => {
        if (!errors) {
          let siteLink = this.form.getFieldsValue()

          let result = this.$axios
            .$post(`/api/siteLinks`, siteLink)
            .then(res => {
              this.form.resetFields()
              this.fillSiteLinksTable()

              this.$message.success('添加友情链接成功')
            })
            .catch(error => {
              console.error(error)
              this.$message.error('添加友情链接失败')
            })
        }
      })
    },
    async fillSiteLinksTable() {
      this.siteLinksTableLoading = true

      try {
        this.siteLinksList = await this.$axios.$get(`/api/siteLinks`)
      } catch (error) {
        console.error(error)
        this.siteLinksList = []
        this.$message.error('获取友情链接列表失败')
      }

      this.siteLinksTableLoading = false
    },
    async onDelete(id, name) {
      try {
        await this.$axios.$delete(`/api/siteLinks/${id}`)
        this.$message.success(`已删除 ${name} 的友情链接`)
      } catch (error) {
        console.error(error)
        this.$message.error(`删除失败`)
      }

      await this.fillSiteLinksTable()
    }
  },
  async mounted() {
    await this.fillSiteLinksTable()
  }
}
</script>

<style lang="stylus" scoped>
.site-links-container
  margin-top: 10px

.site-links-table th .anticon
  margin-right: 6px
</style>