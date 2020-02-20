<template>
  <div class="settings-container">
    <h1>设置</h1>

    <div>
      <a-radio-group v-model="selectedCategory">
        <a-radio-button
          v-for="category in settingCategories"
          :key="category"
          v-bind:value="category"
        >{{category}}</a-radio-button>
      </a-radio-group>
    </div>
    <div>
      <a-form>
        <a-form-item
          v-for="setting in filteredSettings"
          :key="setting.code"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          v-bind:label="setting.code"
        >
          <span slot="help">
            {{setting.description}}
            <br />
            类型 {{setting.valueType}}, 默认值 {{setting.defaultValue || 'null'}}
          </span>

          <a-row :gutter="8">
            <a-col :span="12">
              <a-input
                v-if="setting.type === 'text'"
                :id="setting.code"
                :placeholder="setting.value || 'null'"
                v-model="setting.value"
              />
              <a-textarea
                v-if="setting.type === 'textarea'"
                :id="setting.code"
                :placeholder="setting.value || 'null'"
                v-model="setting.value"
                rows="10"
              />
            </a-col>
            <a-col :span="12">
              <a-button
                type="danger"
                ghost
                @click="update(setting)"
                v-show="isValueChanged(setting)"
              >更新</a-button>
              <a-button
                type="primary"
                ghost
                @click="reset(setting)"
                v-show="isDifferentThenDefault(setting)"
              >恢复默认值</a-button>
            </a-col>
          </a-row>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  layout: 'admin',
  head() {
    return {
      title: '设置'
    }
  },
  data() {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      },
      settings: [],
      settingsOriginal: {},
      settingCategories: [],
      selectedCategory: null
    }
  },
  methods: {
    getList() {
      return this.$axios.get(`/api/settings`)
    },
    update(setting) {
      this.$axios
        .put(`/api/settings/${setting.code}`, { value: setting.value })
        .then(r => {
          // 更新原始值，以隐藏“更新”按钮
          Vue.set(this.settingsOriginal, setting.code, setting.value)
          this.$message.success('更新成功')
        })
        .catch(e => {
          console.log(e)
          this.$message.error('更新失败')
        })
    },
    reset(setting) {
      setting.value = setting.defaultValue || null
    },
    isDifferentThenDefault(setting) {
      return setting.value !== setting.defaultValue
    },
    isValueChanged(setting) {
      return setting.value !== this.settingsOriginal[setting.code]
    }
  },
  computed: {
    filteredSettings() {
      return this.settings.filter(s => s.category === this.selectedCategory)
    }
  },
  mounted() {
    this.getList().then(s => {
      let settings = s.data
      this.settings = settings

      for (let i = 0; i < settings.length; i++) {
        let item = settings[i]
        let category = item.category
        if (this.settingCategories.indexOf(category) == -1) {
          this.settingCategories.push(category)
        }

        Vue.set(this.settingsOriginal, item.code, item.value)
      }

      this.selectedCategory = this.settingCategories[0]
    })
  }
}
</script>

<style lang="stylus" scoped>
.settings-container
  margin-top: 10px
</style>