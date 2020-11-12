<!--
 * @Descripttion: 
 * @version: X3版本
 * @Author: 胡征
 * @Date: 2020-10-28 16:12:12
 * @LastEditors: huzheng
 * @LastEditTime: 2020-10-28 16:13:04
-->
<template>
  <div>
    <script id="editor"
            type="text/plain"></script>
  </div>
</template>
<script>
import UE from "vue-quill-editor"
export default {
  name: 'UE',
  data () {
    return {
      editor: null
    }
  },
  props: {
    defaultMsg: {
      type: String
    },
    config: {
      type: Object
    }
  },
  mounted () {
    const _this = this;
    this.editor = UE.getEditor('editor', this.config); // 初始化UE
    this.editor.addListener("ready", function () {
      _this.editor.setContent(_this.defaultMsg) // 确保UE加载完成后，放入内容。
    });
  },
  methods: {
    getUEContent () { // 获取内容方法
      return this.editor.getContent()
    }
  },
  destroyed () {
    this.editor.destroy()
  }
}

</script>