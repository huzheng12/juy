<!--
 * @Descripttion: 
 * @version: X3版本
 * @Author: 胡征
 * @Date: 2020-10-26 09:59:30
 * @LastEditors: huzheng
 * @LastEditTime: 2020-11-04 09:12:12
-->
<template>
  <div>
    <div class="headertitle">
      {{visible.title}}
    </div>
    <el-form :model="form"
             :rules="rules"
             ref="ruleForm"
             label-width="120px"
             class="demo-ruleForm">
      <el-form-item label="门店名称"
                    prop="shopName">
        <el-input v-model="form.shopName"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="营业时间"
                    prop="businessStart">
        <el-time-picker is-range
                        v-model="visible.time"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        format="HH:mm"
                        placeholder="选择时间范围">
        </el-time-picker>

      </el-form-item>
      <el-form-item label="门店地址"
                    prop="shopAddress">
        <Baidumap></Baidumap>
      </el-form-item>
      <el-form-item label="门店联系电话"
                    prop="shopTelephone">
        <el-input v-model="form.shopTelephone"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="门店简介"
                    prop="shopIntroduction">
        <el-input v-model="form.shopIntroduction"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="门店短语"
                    prop="shopLabel">
        <el-input v-model="form.shopLabel"
                  autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="地理经纬度"
                    prop="shopName">
        <div style="float: left;
    width: 50%;
    display: flex;">
          <span style="margin-left: 10px;
    width: 30px;
    display: block;">X:</span>
          <el-input v-model="form.shopLongitude"
                    :disabled="true"
                    autocomplete="off"></el-input>
        </div>
        <div style="float: left;
    width: 50%;
    display: flex;">
          <span style="margin-left: 10px;
    width: 30px;
    display: block;">Y:</span>
          <el-input v-model="form.shopLatitude"
                    :disabled="true"
                    autocomplete="off"></el-input>
        </div>

      </el-form-item>
      <el-form-item label="上传图片"
                    prop="goodsImg">
        <div class="upload">
          <el-upload action="#"
                     ref="upload"
                     list-type="picture-card"
                     :file-list="visible.fileList"
                     :on-change="uploadChange"
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
    </el-form>
    <div slot="footer"
         class="dialog-footer">
      <el-button @click="cacls">取 消</el-button>
      <el-button type="primary"
                 @click="clicks">确 定</el-button>

    </div>
  </div>
</template>




<script>

import lrz from 'lrz'
import Baidumap from './newbaidu';
import { bus } from '@/utils/bus'

export default {
  name: "Newstore",
  components: { Baidumap },
  props: ["form", "visible"],
  data () {
    var checkImg = (rule, value, callback) => {
      console.log(value, this.imgtype, rule)
      callback();
    };
    return {

      imgtype: false,
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      formLabelWidth: '120px',
      rules: {
        shopName: [
          { validator: checkImg, trigger: 'blur', required: true, }
        ],
        shopAddress: [
          { validator: checkImg, trigger: 'blur', required: true, }
        ],
        shopTelephone: [
          { validator: checkImg, trigger: 'blur', required: true, }
        ],
        shopIntroduction: [
          { validator: checkImg, trigger: 'blur', required: true, }
        ],
        shopLabel: [
          { validator: checkImg, trigger: 'blur', required: true, }
        ],
        businessStart: [
          { validator: checkImg, trigger: 'blur', required: true, }
        ],
        goodsImg: [
          { validator: checkImg, trigger: 'blur', required: true, }
        ],
      }
    };
  },

  mounted () {
    bus.$off('baidu')
    bus.$on('baidu', (res, data) => {
      this.form.shopLongitude = data.lng
      this.form.shopLatitude = data.lat
      this.form.shopAddress = res.address
    })

  },
  beforeDestroy () {
    // 销毁监听事件
    // bus.$off('formdatadddd')
    // bus.$off('formdata')
  },
  methods: {

    clicks () {
      this.form.businessStart = this.$moment(this.visible.time[0]).format("HH:mm")
      this.form.businessEnd = this.$moment(this.visible.time[1]).format("HH:mm")
      console.log(this.form)
      for (var item in this.form) {
        if (!this.form[item]) {
          return this.$message({
            message: '请输入必填项',
            type: 'warning'
          });
        }
      }
      if (this.visible.title === "新增门店") {
        bus.$emit("formdata", this.form)
      } else {
        bus.$emit("formdatadddd", this.form)
      }

    },
    cacls () {
      bus.$emit("baidunoo")
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
        console.log(res)
        // this.data.data.goodsImg = res.obj[0]

        if (this.form.shopImg) {
          this.form.shopImg = this.form.shopImg + "," + res.obj[0]
        } else {
          this.form.shopImg = res.obj[0]
        }
        this.imgtype = false
      })
    },
    handleRemove (file) {
      let fileList = this.$refs.upload.uploadFiles;
      let index = fileList.findIndex((fileItem) => {
        return fileItem.uid === file.uid;
      });
      fileList.splice(index, 1);
      this.form.shopImg = ""
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
  }
}

</script>

<style scoped>
body .el-date-editor--timerange.el-input__inner {
  width: 100%;
}
.upload {
  padding-bottom: 20px;
}
.demo-ruleForm {
  overflow: hidden;
}
.el-form-item {
  float: left;
  width: 48%;
}
.dialog-footer {
  margin-left: 120px;
}
.headertitle {
  line-height: 60px;
  width: 120px;
  font-size: 20px;
  font-weight: bold;
  text-align: right;
}
</style>