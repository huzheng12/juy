<!--
 * @Descripttion: 
 * @version: X3版本
 * @Author: 胡征
 * @Date: 2020-09-25 09:50:50
 * @LastEditors: huzheng
 * @LastEditTime: 2020-09-25 10:33:51
-->
<template>
  <div>
    <div style="color:red">默认密码为"666666"，创建成功后请及时修改！</div>
    <el-input placeholder="输入用户账号"
              v-model="data.a">
      <template style="width:100px;"
                slot="prepend">用户账号</template>
    </el-input>
    <el-input placeholder="输入真实姓名"
              class="input-with-select"
              v-model="data.b">
      <template style="width:100px;"
                slot="prepend">用户姓名</template>
      <!-- <el-button slot="append"
                 @click="sendCode"> 发送验证码</el-button> -->
    </el-input>
    <el-input placeholder="手机号"
              v-model="data.c">
      <template style="width:100px;"
                slot="prepend">输入手机号</template>
    </el-input>
    <el-input placeholder="身份证"
              v-model="data.d">
      <template style="width:100px;"
                slot="prepend">输入身份证</template>
    </el-input>
    <div>
      <el-input placeholder="可填写负责的地区门店及其他说明"
                :autosize="{ minRows: 2, maxRows: 4}"
                maxlength="100"
                show-word-limit
                v-model="data.e">
        <template style="width:100px;"
                  slot="prepend">说明(选填)</template>
      </el-input>
    </div>

  </div>
</template>

<script>
export default {
  name: 'InputListcapit',
  props: ["data"]
}
</script>

<style>
</style>