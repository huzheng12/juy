
<!--
 * @Descripttion: 
 * @version: X3版本
 * @Author: 胡征
 * @Date: 2020-09-24 11:11:27
 * @LastEditors: huzheng
 * @LastEditTime: 2020-09-29 10:10:15
-->

<template>
  <el-dialog title="修改个人信息"
             class="dialog-header"
             :visible="visible"
             @close="submitForm(false)"
             width="30%">
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             label-width="90px"
             class="demo-ruleForm">
      <el-form-item label="身份"
                    prop="pwd">
        <el-input v-model="ruleForm.pwd"
                  :disabled="true"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号码"
                    prop="newPwd">
        <el-input placeholder="请输入修改的手机号码"
                  v-model="ruleForm.newPwd"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱"
                    prop="rePwd">
        <el-input v-model="ruleForm.rePwd"
                  autocomplete="off"
                  placeholder="请输入邮箱(选填)"></el-input>
      </el-form-item>

    </el-form>

    <span slot="footer"
          class="dialog-footer">
      <el-button @click="submitForm(false)">取 消</el-button>
      <el-button type="primary"
                 @click="submitForm(true)">提 交</el-button>
    </span>
  </el-dialog>

</template>

<script>

export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入修改的手机号码'));
      } else {
        callback();
      }
    };

    return {
      ruleForm: {
        pwd: "111",
        newPwd: "",
        rePwd: "",
      },
      rules: {
        newPwd: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],

      }
    };
  },
  methods: {
    submitForm (flg) {
      if (!flg) return this.$emit("click", false, 'modifypasswordvisible')
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit("click", true, 'modifypasswordvisible', this.ruleForm)
        } else {
          return false;
        }
      });
    },
    resetForm () {
      this.$refs.ruleForm.resetFields();
    }
  },
  name: 'modifyInformation',
  props: ['visible'],
}


</script>

<style>
.el-input-group {
  margin-top: 20px;
}
</style>