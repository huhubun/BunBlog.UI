<template>
  <v-spacer>
    <v-app-bar app dense flat elevate-on-scroll elevation="1" color="white">
      <v-btn
        to="/admin/posts"
        exact
        :text="!$vuetify.breakpoint.smAndDown"
        :icon="$vuetify.breakpoint.smAndDown"
      >
        <v-icon :left="!$vuetify.breakpoint.smAndDown">mdi-arrow-left</v-icon>
        <span v-if="!$vuetify.breakpoint.smAndDown">返回博文列表</span>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon class="hidden-xs-only">
        <v-icon>mdi-image-outline</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        :text="!$vuetify.breakpoint.smAndDown"
        :icon="$vuetify.breakpoint.smAndDown"
      >
        <v-icon :left="!$vuetify.breakpoint.smAndDown"
          >mdi-progress-upload</v-icon
        >
        <span v-if="!$vuetify.breakpoint.smAndDown">存为草稿</span>
      </v-btn>

      <v-btn
        :text="!$vuetify.breakpoint.smAndDown"
        :icon="$vuetify.breakpoint.smAndDown"
        @click.stop="drawer = !drawer"
      >
        <v-icon :left="!$vuetify.breakpoint.smAndDown">mdi-send-outline</v-icon>
        <span v-if="!$vuetify.breakpoint.smAndDown">发布博文</span>
      </v-btn>
    </v-app-bar>

    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="editorPost.title"
            single-line
            autofocus
            label="标题"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-textarea
            v-model="editorPost.content"
            auto-grow
            counter
            outlined
            rows="20"
            label="博文内容"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-container>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      right
      temporary
      :width="$vuetify.breakpoint.smAndDown ? '80%' : '40%'"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>博文设置</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item>
          <v-list-item-content>
            <v-text-field
              v-model="editorPost.linkName"
              outlined
              label="链接名称"
              prepend-inner-icon="mdi-link-variant"
            ></v-text-field>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-select
              :items="categoryList"
              :value="editorPost.category"
              outlined
              label="分类"
              item-text="displayName"
              item-value="linkName"
              :loading="waitForCategoryList"
              prepend-inner-icon="mdi-inbox-multiple"
            >
              <template v-slot:append-outer>
                <div class="bun-selecter-append-outer">
                  <v-btn icon large @click="getCategoryList">
                    <v-icon>mdi-refresh</v-icon>
                  </v-btn>
                </div>
              </template>
            </v-select>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-autocomplete
              :items="tagList"
              :value="editorPost.tagList"
              outlined
              multiple
              small-chips
              deletable-chips
              label="标签"
              item-text="displayName"
              item-value="linkName"
              :loading="waitForTagList"
              prepend-inner-icon="mdi-tag"
            >
              <template v-slot:append-outer>
                <div class="bun-selecter-append-outer">
                  <v-btn icon large @click="getTagList">
                    <v-icon>mdi-refresh</v-icon>
                  </v-btn>
                </div>
              </template>
            </v-autocomplete>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-textarea
              v-model="editorPost.excerpt"
              auto-grow
              counter
              outlined
              rows="5"
              label="摘要"
              prepend-inner-icon="mdi-text-short"
            ></v-textarea>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-btn block class="primary"> 确认发布 </v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-spacer>
</template>

<script>
import hotkeys from 'hotkeys-js'

export default {
  name: 'PostEditorVuetify',
  props: {
    // 传入的 post 对象
    post: {
      type: Object,
      // default: function () {
      //   return {
      //     id: null,
      //     title: '',
      //     excerpt: '',
      //     content: '',
      //     linkName: '',
      //     category: '',
      //     tagList: []
      //   }
      // },
      default: null,
      required: false
    }
  },
  data() {
    return {
      drawer: null,

      categoryList: [],
      waitForCategoryList: false,
      tagList: [],
      waitForTagList: false,

      editorPost: {}
    }
  },
  methods: {
    async getCategoryList() {
      this.waitForCategoryList = true
      this.categoryList = await this.$bunblog.category.getList()
      this.waitForCategoryList = false
    },
    async getTagList() {
      this.waitForTagList = true
      this.tagList = await this.$bunblog.tag.getList()
      this.waitForTagList = false
    }
  },
  mounted() {
    this.getCategoryList()
    this.getTagList()

    if (this.post) {
      this.editorPost = this.post
    }
  }
}
</script>

<style scoped>
/* 受到 .v-input__icon .v-input__icon--append-outer 的启发 */
.bun-selecter-append-outer {
  width: 44px;
  /* 不要修改 height，否则会错位 */
  height: 24px;
  align-items: center;
  display: inline-flex;
  flex: 1 0 auto;
  justify-content: center;
}
</style>