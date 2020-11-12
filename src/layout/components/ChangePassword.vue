<!--
 * @Descripttion: 
 * @version: X3版本
 * @Author: 胡征
 * @Date: 2020-09-24 11:11:27
 * @LastEditors: huzheng
 * @LastEditTime: 2020-10-12 14:16:58
-->

<template>
  <el-dialog
    title="修改登录密码"
    class="dialog-header"
    :visible="visible"
    @close="submitForm(false)"
    width="30%"
  >
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="90px"
      class="demo-ruleForm"
    >
      <el-form-item label="旧密码" prop="pwd">
        <el-input
          type="password"
          placeholder="请输入旧密码"
          v-model="ruleForm.pwd"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd">
        <el-input
          type="password"
          placeholder="请填写新密码"
          v-model="ruleForm.newPwd"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码"  prop="rePwd">
        <el-input
          v-model="ruleForm.rePwd"
          type="password"
          autocomplete="off"
          placeholder="请再次填写新密码"
        ></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="submitForm(false)">取 消</el-button>
      <el-button type="primary" @click="submitForm(true)">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入旧密码"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请填写新密码"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次填写新密码"));
      } else if (value !== this.ruleForm.newPwd) {
        callback(new Error("两次填写密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pwd: "",
        newPwd: "",
        rePwd: "",
      },
      rules: {
        pwd: [{ required: true, validator: checkAge, trigger: "blur" }],
        newPwd: [{ required: true, validator: validatePass, trigger: "blur" },{ min: 5, message: '密码长度至少五位', trigger: 'blur' }],
        rePwd: [{ required: true, validator: validatePass2, trigger: "blur" },{ min: 5, message: '密码长度至少五位', trigger: 'blur' }],
      },
    };
  },
  methods: {
    submitForm(flg) {
      if (!flg) return this.$emit("click", false, "Changepasswordvisible");
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          var data = {};
          for (var i in this.ruleForm) {
            data[i] = this.$md5.md5(this.ruleForm[i]);
          }
          this.$emit("click", true, "Changepasswordvisible", data);
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
  },
  name: "Change",
  props: ["visible"],
};
</script>

<style>
.el-input-group {
  margin-top: 20px;
}
</style>