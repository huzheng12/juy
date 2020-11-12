<!--
 * @Descripttion:  上架商品 弹窗 或 下架商品 弹窗
 * @version: X3版本
 * @Author: 胡征
 * @Date: 2020-09-25 14:10:11
 * @LastEditors: huzheng
 * @LastEditTime: 2020-10-15 10:44:01
-->
<template>

  <el-dialog :title="data.title"
             :visible.sync="data.visible"
             width="30%">

    <div class="centent-model-box">
      <p>{{data.title}}：{{data.data.goodsName}}</p>
      <p>时 长：{{data.data.useTime}}分钟</p>
      <p>价 格：{{data.data.agentPrice/100}}元</p>
    </div>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="click(false)">取 消</el-button>
      <el-button type="primary"
                 :loading="data.loading"
                 @click="click(true)">{{data.but}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'Shelfgoods',
  props: ["data", 'func'],
  methods: {
    click (type) {
      this.$emit("func", type)
    }
  },

}
</script>

<style>
</style>