<!--
 * @Descripttion: 
 * @version: X3版本
 * @Author: 胡征
 * @Date: 2020-10-26 09:59:30
 * @LastEditors: huzheng
 * @LastEditTime: 2020-11-04 09:13:34
-->
<template>
  <div class="from-box">
    <div class="header-title">
      {{visible.title}}
    </div>
    <div class="from-input">
      <el-form :model="visible.form"
               :inline="true"
               :rules="rules"
               ref="ruleForm"
               label-width="120px"
               class="demo-ruleForm">
        <el-form-item label="商品名称"
                      prop="goodsName"
                      style="width:48% ">
          <el-input v-model="form.goodsName"
                    placeholder="请输入商品名称"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="标准商品表信息"
                      prop="standardGoodsNumber"
                      style="width:48%">
          <el-select v-model="form.standardGoodsNumber"
                     clearable
                     style="width: 100%;">
            <el-option v-for="item in visible.option"
                       :key="item.goodsNumber"
                       :label="item.goodsName"
                       :value="item.goodsNumber">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品现价"
                      style="width:48%"
                      prop="goodsNowPrice">
          <el-input v-model="form.goodsNowPrice"
                    placeholder="请输入商品现价"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品原价"
                      style="width:48%"
                      prop="goodsOldPrice">
          <el-input v-model="form.goodsOldPrice"
                    placeholder="请输入商品原价"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品描述"
                      style="width:48%"
                      prop="goodsDesc">
          <el-input v-model="form.goodsDesc"
                    placeholder="请输入商品描述"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品规则"
                      style="width:48%"
                      prop="goodsRule">
          <el-input v-model="form.goodsRule"
                    placeholder="请输入商品规则"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品短语"
                      style="width:48%"
                      prop="goodsTag">
          <el-input v-model="form.goodsTag"
                    placeholder="请输入商品短语"
                    autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="门店id"
                      style="width:48%"
                      prop="shopNumber">
          <el-input v-model="form.shopNumber"
                    placeholder="请输入门店id"
                    autocomplete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="门店id"
                      prop="shopNumber"
                      style="width:48%">
          <el-select v-model="form.shopNumber"
                     clearable
                     style="width: 100%;">
            <el-option v-for="item in visible.optiongoodID"
                       :key="item.shopId"
                       :label="item.shopAddress"
                       :value="item.shopId">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="menp"
                      label="门票状态"
                      style="width:100%"
                      prop="goodsStatus">
          <el-select v-model="form.goodsStatus"
                     clearable
                     style="width: 100%;">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.value"
                       :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="使用时长"
                    prop="useTime">
        <el-select v-model="form.useTime"
                   clearable
                   style="width: 100%;">
          <el-option v-for="item in timeoptions"
                     :key="item.value"
                     :label="item.value"
                     :value="item.label">
          </el-option>
        </el-select>
      </el-form-item> -->

        <el-form-item label="上传图片"
                      style="width: 48%;"
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
              <div slot="fileList"
                   slot-scope="{fileList}">
                <img class="el-upload-list__item-thumbnail"
                     :src="fileList.url"
                     alt="">
                <span class="el-upload-list__item-actions">
                  <span class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(fileList)">
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleDownload(fileList)">
                    <i class="el-icon-download"></i>
                  </span>
                  <span v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleRemove(fileList)">
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
        <el-form-item label="商品头像"
                      style="width: 48%;"
                      prop="goodsImg">
          <div class="upload">
            <el-upload action="#"
                       ref="headupload"
                       :limit="1"
                       list-type="picture-card"
                       :file-list="visible.headfileList"
                       :on-change="uploadChangehead"
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
                        @click="headhandlePictureCardPreview(file)">
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleDownload(file)">
                    <i class="el-icon-download"></i>
                  </span>
                  <span v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="headhandleRemove(file)">
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
            <el-dialog :visible.sync="haderdialogVisible">
              <img width="100%"
                   :src="haderdialogImageUrl"
                   alt="">
            </el-dialog>
          </div>
        </el-form-item>
        <el-form-item label="商品详情"
                      style="width:48%;"
                      prop="goodsText">
          <FuncFormsEdit :content="form.goodsText"
                         @funkue="funkuek"></FuncFormsEdit>
        </el-form-item>
        <el-form-item label="手机显示"
                      style="width:48%;">
          <div class="w-box">
            <div class="n-box ql-snow ql-editor"
                 v-html="form.goodsText">

            </div>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer"
           style="margin-left: 120px;margin-bottom: 30px;"
           class="dialog-footer">
        <el-button @click="clicks(false)">取 消</el-button>
        <el-button type="primary"
                   @click="clicks(true)">确 定</el-button>

      </div>
    </div>
  </div>
</template>


<script>
import lrz from 'lrz'
import FuncFormsEdit from './uelis';
import { bus } from '@/utils/bus'

export default {
  name: "Newgoods",
  components: {
    FuncFormsEdit
  },
  props: ["visible", "form"],
  data () {
    var checkImg = (rule, value, callback) => {
      callback();
    };
    var goodsStatusCe = (rule, value, callback) => {
      callback();
    };
    return {
      imgtype: false,
      dialogImageUrl: '',
      haderdialogImageUrl: '',
      options: [{
        value: '可售',
        label: '0'
      }, {
        label: '1',
        value: '已下架'
      }, {
        label: '2',
        value: '失效'
      }],
      timeoptions: [{
        value: '30分钟',
        label: 30
      }, {
        label: 60,
        value: '60分钟'
      }, {
        label: 100,
        value: '100分钟'
      }],
      dialogVisible: false,
      haderdialogVisible: false,
      disabled: false,
      formLabelWidth: '120px',
      rules: {
        goodsName: [
          { validator: checkImg, trigger: 'blur', required: true, }
        ],
        shopNumber: [
          { validator: checkImg, trigger: 'blur', required: true, }
        ],
        goodsDesc: [
          { validator: checkImg, trigger: 'blur', required: true, }
        ],
        goodsNowPrice: [
          { validator: checkImg, trigger: 'blur', required: true, }
        ],
        goodsOldPrice: [
          { validator: checkImg, trigger: 'blur', required: true, }
        ],
        goodsStatus: [
          { validator: goodsStatusCe, trigger: 'change', required: true, }
        ],
        goodsImg: [
          { validator: checkImg, trigger: 'blur', required: true, }
        ],
        goodsRule: [
          { validator: checkImg, trigger: 'blur', required: true, }
        ],
        goodsTag: [
          { validator: checkImg, trigger: 'blur', required: true, }
        ],
        goodsText: [
          { validator: checkImg, trigger: 'blur', required: true, }
        ],
      }
    };
  },
  // beforeDestroy () {
  //   // 销毁监听事件
  //   bus.$off('Newstorefn')
  //   bus.$off('oldtorefns')

  // },
  methods: {
    funkuek (data) {
      this.form.goodsText = data
    },
    clicks (tyep) {
      if (!tyep) {
        return bus.$emit("noo")
      }
      console.log(this.form)
      for (var item in this.form) {
        if (this.form[item] !== 0) {
          if (!this.form[item] && item !== "standardGoodsNumber") {
            return this.$message({
              message: '请输入必填项',
              type: 'warning'
            });
          }
        }
      }

      if (this.visible.title === "创建门票") {
        bus.$emit("Newstorefn", this.form)
      } else {
        bus.$emit("oldtorefns", this.form)
      }

    },
    async uploadChangehead (file, fileList) { //头像上传
      this.imgtype = true
      // 图片的大小
      if (file.size > 1048576 * 10) {
        this.$refs.headupload.headhandleRemove(file, fileList)
        this.$notify({
          type: 'warning',
          message: this.$notify({ message: ' 图片太大' })
        })
        return
      }
      //图片判断格式
      let endName = file.name.split('.')[file.name.split('.').length - 1]
      if (endName !== 'jpg' && endName !== 'png' && endName !== 'jpeg' && endName != 'bmp') {

        this.$refs.headupload.headhandleRemove(file, fileList)
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
        // headfileList

        if (this.form.goodsAvatar) {

          this.form.goodsAvatar = this.form.goodsAvatar + "," + res.obj[0]
        } else {

          this.form.goodsAvatar = res.obj[0]
        }
        this.imgtype = false
      })
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


        if (this.form.goodsImg) {

          this.form.goodsImg = this.form.goodsImg + "," + res.obj[0]
        } else {

          this.form.goodsImg = res.obj[0]
        }
        this.imgtype = false
      })
    },
    headhandleRemove (file) {
      let fileList = this.$refs.headupload.uploadFiles;
      let index = fileList.findIndex((fileItem) => {
        return fileItem.uid === file.uid;
      });
      fileList.splice(index, 1);
      this.form.goodsAvatar = ""
      this.$refs.headupload.clearFiles();//调用element官方的方法

    },
    handleRemove (file) {
      let fileList = this.$refs.upload.uploadFiles;
      let index = fileList.findIndex((fileItem) => {
        return fileItem.uid === file.uid;
      });
      fileList.splice(index, 1);
      this.form.goodsImg = ""
      this.$refs.upload.clearFiles();//调用element官方的方法

    },
    headhandlePictureCardPreview (file) {
      this.haderdialogImageUrl = file.url;
      this.haderdialogVisible = true;
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

<style>
body .el-date-editor--timerange.el-input__inner {
  width: 100%;
}
.header-title {
  line-height: 60px;
  width: 120px;
  font-size: 20px;
  font-weight: bold;
  text-align: right;
}

.upload {
  padding-bottom: 20px;
}
.el-form-item__content {
  width: calc(100% - 120px);
}
.menp .el-form-item__content {
  width: calc(48% - 120px);
}
.w-box {
  width: 100%;
  height: 720px;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.n-box {
  height: 100%;
  border: 1px solid #ebeef5;
  overflow: auto;
}
</style>