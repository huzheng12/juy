<!--
 * @Descripttion: 修改商品信息 弹窗
 * @version: X3版本
 * @Author: 胡征
 * @Date: 2020-09-25 14:28:37
 * @LastEditors: huzheng
 * @LastEditTime: 2020-09-30 16:07:53
-->
//  goodsName: row.goodsName, buseTime: row.useTime, agentPrice: row.goodsPrice, goodsDesc: row.goodsDesc
<template>
  <el-dialog title="修改商品信息"
             :visible.sync="data.visible"
             width="30%"
             class="dialogs">

    <el-form label-position="right"
             label-width="90px"
             ref="ruleForm"
             :rules="rules"
             :model="data.data">
      <el-form-item label="商品名称">
        <el-input v-model="data.data.goodsName"
                  :disabled='true'></el-input>
      </el-form-item>
      <el-form-item label="时长">
        <el-input v-model="data.data.buseTime"
                  :disabled='true'></el-input>
      </el-form-item>
      <el-form-item label="价格"
                    prop="agentPrice">
        <el-input placeholder="输入价格"
                  v-model="data.data.agentPrice"></el-input>
      </el-form-item>
      <el-form-item label="说明(选填)">
        <el-input type="textarea"
                  v-model="data.data.goodsDesc"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  maxlength="100"
                  show-word-limit
                  placeholder="可填写商品使用注意事项">
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer"
         class="dialog-footer">
      <el-button @click="click(false)">取 消</el-button>
      <el-button type="primary"
                 :loading="data.loading"
                 @click="click(true)">提 交</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "Modifygoods",
  props: ["data"],
  data () {
    return {
      rules: {
        agentPrice: [
          { required: true, message: '请输入价格', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    click (flg) {
      if (!flg) return this.$emit("func", flg)
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit("func", flg)
        } else {
          return false;
        }
      });
    }
  }
}
</script>

<style>
</style>