<!--
 * @Descripttion: 
 * @version: X3版本
 * @Author: 胡征
 * @Date: 2020-09-23 10:44:54
 * @LastEditors: huzheng
 * @LastEditTime: 2020-09-23 11:03:01
-->
<template>
  <el-button @click="closeNotice"
             type="primary"> <i class="el-icon-user-solid"></i>
    刷新列表</el-button>

</template>

<script>
export default {
  name: "Refresh",
  data () {
    return {

    }
  },
  methods: {
    closeNotice () {
      this.$emit('clickref') //点击确定传值给父组件
    }

  }

}
</script>

<style>
</style>