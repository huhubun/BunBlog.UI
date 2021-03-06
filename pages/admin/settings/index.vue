<template>
  <div class="mx-2">
    <v-row>
      <v-col class="pt-0">
        <v-card flat>
          <v-tabs v-model="selectedCategoryIndex">
            <v-tab v-for="category in settingCategories" :key="category">
              {{ category }}
            </v-tab>

            <v-tab-item v-for="category in settingCategories" :key="category">
              <v-form>
                <v-card
                  flat
                  v-for="setting in filteredSettings"
                  :key="setting.code"
                >
                  <v-card-text>
                    <v-text-field
                      v-if="setting.type === 'text'"
                      v-model="setting.value"
                      :label="setting.code"
                      :placeholder="getDefaultValue(setting)"
                      :hint="generateHint(setting)"
                      persistent-hint
                    ></v-text-field>
                    <v-textarea
                      v-if="setting.type === 'textarea'"
                      v-model="setting.value"
                      :label="setting.code"
                      :placeholder="getDefaultValue(setting)"
                      :hint="generateHint(setting)"
                      persistent-hint
                      rows="10"
                    ></v-textarea>
                    <v-card outlined v-if="setting.type === 'object'">
                      <v-card-title>
                        {{ setting.code }}
                      </v-card-title>
                      <v-card-text>
                        <v-row>
                          <v-col
                            v-for="property in setting.schema.split(',')"
                            :key="property"
                            cols="12"
                            md="2"
                          >
                            <v-text-field
                              :label="property"
                              :placeholder="property"
                              :value="getObjectPropertyValue(property, setting)"
                              @change="
                                onObjectPropertyChange(
                                  $event,
                                  property,
                                  setting
                                )
                              "
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-card-text>
                      <v-card-subtitle>
                        {{ setting.code }}
                      </v-card-subtitle>
                    </v-card>
                    <div v-if="setting.type === 'list'"></div>
                  </v-card-text>

                  <v-card-actions
                    v-if="
                      isValueChanged(setting) || isDifferentThenDefault(setting)
                    "
                  >
                    <v-btn
                      outlined
                      color="error"
                      v-show="isValueChanged(setting)"
                      :loading="setting.loading"
                      @click="update(setting)"
                    >
                      更新
                    </v-btn>
                    <v-btn
                      outlined
                      color="info"
                      v-show="isDifferentThenDefault(setting)"
                      @click="reset(setting)"
                    >
                      恢复默认值
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-form>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar
      :color="messageType"
      :value="!!message"
      timeout="-1"
      text
      top
      centered
    >
      {{ message }}

      <template v-slot:action="{ attrs }">
        <v-btn
          :color="messageType"
          icon
          small
          v-bind="attrs"
          @click="message = null"
        >
          <v-icon small>mdi-close-circle</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  layout: 'admin',
  data() {
    return {
      tab: null,

      settings: [],
      settingsOriginal: {},
      settingCategories: [],
      selectedCategoryIndex: 0,

      message: null,
      messageType: null
    }
  },
  computed: {
    filteredSettings() {
      return this.settings.filter(s => s.category === this.selectedCategory)
    },
    selectedCategory() {
      return this.settingCategories[this.selectedCategoryIndex]
    }
  },
  methods: {
    async getSettings() {
      this.settings = await this.$bunblog.settingDefinitions.getList()
    },
    update(setting) {
      setting.loading = true
      this.clearMessage()
      this.$bunblog.setting
        .update(setting)
        .then(() => {
          this.showSuccessMessage('更新成功')
          // 更新原始值，以隐藏“更新”按钮
          Vue.set(this.settingsOriginal, setting.code, setting.value)
        })
        .catch(e => {
          console.error(e)
          this.showErrorMessage('更新失败')
        })
        .finally(() => {
          setting.loading = false
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
    },
    getDefaultValue(setting) {
      return setting.defaultValue || 'null'
    },
    generateHint(setting) {
      return `${setting.description} | 类型 ${
        setting.valueType
      }, 默认值 ${this.getDefaultValue(setting)}`
    },
    onObjectPropertyChange(newValue, propertyName, setting) {
      let obj = JSON.parse(setting.value || '{}')
      obj[propertyName] = newValue

      setting.value = JSON.stringify(obj)
    },
    generateObject(setting) {
      let obj = new Object()
      setting.schema.split(',').forEach(i => (obj[i] = null))
      return obj
    },
    getObjectPropertyValue(propertyName, setting) {
      let value = setting.value || '{}'
      return JSON.parse(value)[propertyName] || null
    },
    showSuccessMessage(message) {
      this.message = message
      this.messageType = 'success'
    },
    showErrorMessage(message) {
      this.message = message
      this.messageType = 'error'
    },
    clearMessage() {
      this.message = null
    }
  },
  async mounted() {
    await this.getSettings()

    for (let i = 0; i < this.settings.length; i++) {
      let item = this.settings[i]
      let category = item.category
      if (this.settingCategories.indexOf(category) == -1) {
        this.settingCategories.push(category)
      }

      Vue.set(this.settingsOriginal, item.code, item.value)
    }

    this.selectedCategoryIndex = 0
  }
}
</script>

<style lang="stylus" scoped></style>