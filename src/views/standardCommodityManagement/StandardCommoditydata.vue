<!--
 * @Descripttion: 创建商品 弹窗
 * @version: X3版本
 * @Author: 胡征
 * @Date: 2020-09-25 14:28:37
 * @LastEditors: huzheng
 * @LastEditTime: 2020-10-26 14:43:52
-->
<template>
  <el-dialog title="创建商品"
             :visible.sync="data.visible"
             width="30%">
    <el-form label-position="right"
             label-width="90px"
             ref="ruleForm"
             resetFields
             :rules="rules"
             :model="data.data">
      <el-form-item label="商品名称"
                    prop="goodsName">
        <el-input placeholder="请输入商品名称"
                  show-word-limit
                  maxlength="10"
                  v-model="data.data.goodsName"></el-input>
      </el-form-item>
      <el-form-item label="时长"
                    prop="useTime">
        <el-select v-model="data.data.useTime"
                   style="width: 100%;">
          <el-option v-for="item in data.options"
                     :key="item.value"
                     :label="item.value"
                     :value="item.label">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="价格"
                    prop="agentPrice">
        <el-input placeholder="输入价格"
                  v-model="data.data.agentPrice"></el-input>
      </el-form-item>
      <el-form-item label="上传图片"
                    prop="goodsImg">
        <div class="upload">
          <el-upload action="#"
                     ref="upload"
                     list-type="picture-card"
                     :on-change="uploadChange"
                     :limit="1"
                     :auto-upload="false">
            <i slot="default"
               class="el-icon-plus"></i>
            <div slot="file"
                 slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail"
                   :src="file.url"
                   alt="">
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file)">
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleDownload(file)">
                  <i class="el-icon-download"></i>
                </span>
                <span v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file)">
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%"
                 :src="dialogImageUrl"
                 alt="">
          </el-dialog>
        </div>
      </el-form-item>

      <el-form-item label="说明(选填)"
                    prop="goodsDesc">
        <el-input type="textarea"
                  v-model="data.data.goodsDesc"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  maxlength="100"
                  show-word-limit
                  placeholder="可填写商品使用注意事项">
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="submitForm(false)">取 消</el-button>
      <el-button type="primary"
                 @click="submitForm(true)">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import lrz from 'lrz'

export default {
  name: "StandardCommoditydata",
  props: ["data"],
  data () {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入商品名称！'));
      } else {
        if (value.length < 3) {
          callback(new Error("商品名称最少三个字符！"));
        } else {
          callback();
        }
      }
    };
    var checkImg = (rule, value, callback) => {
      console.log(value, this.imgtype, rule)
      if (!value) {
        if (this.imgtype) {
          return callback(new Error('图片上传中,请稍后再试!'));
        } else {
          return callback(new Error('请选择图片!'));
        }
      } else {
        callback();
      }
    };
    return {
      imgtype: false,
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      rules: {
        goodsName: [
          { validator: checkAge, trigger: 'blur', required: true, }
        ],
        useTime: [
          { required: true, message: '请选择时长', trigger: 'change' }
        ],
        goodsImg: [
          { validator: checkImg, trigger: 'blur', required: true, }
        ],
        agentPrice: [
          { required: true, message: '输入价格', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handleRemove (file) {
      let fileList = this.$refs.upload.uploadFiles;
      let index = fileList.findIndex((fileItem) => {
        return fileItem.uid === file.uid;
      });
      fileList.splice(index, 1);
      this.$refs.upload.clearFiles();//调用element官方的方法

    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload (file) {
      let a = document.createElement('a');
      // 下载图名字
      a.download = "门票图片"
      a.href = file.url;
      a.dispatchEvent(new MouseEvent('click'))
    },
    async uploadChange (file, fileList) {   //图片上传
      this.imgtype = true
      // 图片的大小
      if (file.size > 1048576 * 10) {
        this.$refs.upload.handleRemove(file, fileList)
        this.$notify({
          type: 'warning',
          message: this.$notify({ message: ' 图片太大' })
        })
        return
      }
      //图片判断格式
      let endName = file.name.split('.')[file.name.split('.').length - 1]
      if (endName !== 'jpg' && endName !== 'png' && endName !== 'jpeg' && endName != 'bmp') {
        // 获取上传文件这个dom元素
        // console.log(this.$refs.upload);
        // 调用这个dom上的方法
        // console.log(this.$refs.upload.handleRemove);
        this.$refs.upload.handleRemove(file, fileList)
        this.$notify({
          type: 'warning',
          message: '只能上传jpg/png的图片'
        })
        return
      }
      const rst = await lrz(file.raw, { quality: 0.2 })
      const fileRaw = new File([rst.file], rst.origin.name, {
        type: rst.origin.type
      })
      let formData = new FormData()
      formData.append('files', file.raw)
      console.log(formData, 55555, fileRaw)
      const data = this.$api.personalhzapi.ossupload(formData)
      data.then(res => {
        this.data.data.goodsImg = res.obj[0]
        this.imgtype = false
      })
    },
    submitForm (flg) {
      if (!flg) return this.$emit("func", flg)
      this.$refs.ruleForm.validate((valid, obj) => {
        if (obj.goodsImg && this.data.data.goodsImg) {
          this.$emit("func", flg)
        }
        if (valid) {
          this.$emit("func", flg)
        } else {
          return false;
        }
      });
    },

  }
}
</script>

<style lang="scss" scoped>
.upload {
  // padding-left: 90px;
  padding-bottom: 20px;
}
</style>
