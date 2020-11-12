<!--
 * @Descripttion: 删除商品弹窗
 * @version: X3版本
 * @Author: 胡征
 * @Date: 2020-09-25 14:28:37
 * @LastEditors: huzheng
 * @LastEditTime: 2020-09-29 14:18:04
-->
<template>
  <el-dialog title="删除商品"
             :visible.sync="data.visible"
             width="30%">

    <div class="centent-model-box"
         style='line-height: 35px;
    display: flex;'>
      <i class="el-icon-success"
         style="font-size: 35px;margin-right: 10px;
    color: #52C41A;"></i>
      <span>确定要删除这件商品吗？</span>
    </div>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="click(false)">取 消</el-button>
      <el-button type="primary"
                 :loading="data.loading"
                 @click="click(true)">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "Deletegoods",
  props: ["data"],
  methods: {
    click (type) {
      this.$emit("func", type)
    }
  }
}
</script>

<style>
</style>