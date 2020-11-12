<!--
 * @Descripttion: 
 * @version: X3版本
 * @Author: 胡征
 * @Date: 2020-10-28 16:14:14
 * @LastEditors: huzheng
 * @LastEditTime: 2020-11-10 19:26:53
-->
<template>
  <div>
    <el-card style="height: 720px;">
      <quill-editor v-model="conten"
                    ref="myQuillEditor"
                    style="height: 500px;"
                    :options="editorOption">
      </quill-editor>
    </el-card>

  </div>
</template>

<script>
import {
  quillEditor
} from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { bus } from '@/utils/bus'

export default {
  name: 'FuncFormsEdit',
  components: {
    quillEditor
  },
  props: ["content"],
  data () {
    return {
      conten: null,
      editorOption: {

      }
    }
  },
  created () {
    this.conten = this.content
  },
  mounted () {
    bus.$off("activecontent")
    bus.$on('activecontent', (res) => {
      this.conten = res

    })

  },
  watch: {
    conten: {
      handler (newName) {
        this.$emit("funkue", newName)
      },
      immediate: true
    }
  }
}

</script>

<style scoped>
</style>
