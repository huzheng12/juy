<!--
 * @Descripttion: 
 * @version: X3版本
 * @Author: 胡征
 * @Date: 2020-09-24 14:06:22
 * @LastEditors: huzheng
 * @LastEditTime: 2020-09-27 17:11:04
-->
<template>
  <el-dialog :title="Data.title"
             class="dialog-header"
             :visible="Visible"
             @close="click(false)"
             width="30%">
    <slot></slot>
    <span style="margin-top: 10px;
    display: block;
    height: 20px;
    color: red;
    text-align: end;">{{massger}}</span>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="click(false)">{{Data.cancelText?Data.cancelText:"取 消"}}</el-button>
      <el-button type="primary"
                 @click="handleOk">{{Data.okText?Data.okText:"确 定"}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'Modelcomponent',
  props: ["Visible", "change", "Data", "massger"],
  methods: {
    click (type) {
      this.$emit("Visibleflg", type, this.Data.name)
    },
    handleOk () {
      var data = {}
      if (this.change) {
        this.change.map((item) => {
          data[item.key] = item.value
        })
        this.$emit("Visibleflg", true, this.Data.name, data)
      } else {
        this.$emit("Visibleflg", true, this.Data.name, data)
      }

    }
  }
}
</script>

<style>
</style>