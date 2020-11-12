<!--
 * @Descripttion: 
 * @version: X3版本
 * @Author: 胡征
 * @Date: 2020-09-25 10:23:50
 * @LastEditors: huzheng
 * @LastEditTime: 2020-09-25 10:29:45
-->
<template>
  <div>
    <el-input :disabled="true"
              v-model="data.a">
      <template slot="prepend">充值账号</template>
    </el-input>
    <el-input :disabled="true"
              v-model="data.b">
      <template slot="prepend">充值姓名</template>
    </el-input>
    <el-input placeholder="请输入输入都金额"
              v-model="data.c">
      <template slot="prepend">充值金额</template>
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'Rechargeinput',
  props: ['data']
}
</script>

<style>
</style>