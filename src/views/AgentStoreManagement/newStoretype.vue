<!--
 * @Descripttion:  资金管理   运营
 * @version: X3版本
 * @Author: 胡征
 * @Date: 2020-09-23 11:11:06
 * @LastEditors: huzheng
 * @LastEditTime: 2020-11-10 15:26:46
-->
<template>
  <div class="store-information">

    <Conditionquery @clicksearch="clicksearch"
                    :inputdata='inputarr'
                    :modlebutdata='modlebutArr'
                    :options="options"
                    :butdata="butArr">

    </Conditionquery>

    <Tablelist :column="column"
               :currentPage="currentPage"
               @currentPagefn='currentPagefn'
               :data="data">
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span class="but-span"
                @click="handleEdit(scope.$index, scope.row,1)">
            修改
          </span>
          <el-divider direction="vertical"></el-divider>
          <span class="but-span"
                @click="handleEdit(scope.$index, scope.row,2)">
            删除
          </span>
          <el-divider direction="vertical"></el-divider>
          <span class="but-span"
                @click="handleEdit(scope.$index, scope.row,3)">
            开店
          </span>
          <el-divider direction="vertical"></el-divider>
          <span class="but-span"
                @click="handleEdit(scope.$index, scope.row,4)">
            关店
          </span>

        </template>
      </el-table-column>
    </Tablelist>
    <el-dialog :title="visibledeldata.title"
               :visible.sync="visibledel"
               width="30%">

      <div class="centent-model-box"
           style='line-height: 35px;
    display: flex;'>
        <i class="el-icon-success"
           style="font-size: 35px;margin-right: 10px;
            color: #52C41A;"></i>

        <span>{{visibledeldata.content}}</span>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="visibledel=false">取 消</el-button>
        <el-button type="primary"
                   :loading="data.loading"
                   @click="jyShopsremoveShop()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
import Conditionquery from '@/components/ConditionQuery'
import Tablelist from '@/components/TableList'
import Fun from '@/utils/dataIntegration'
// import Newstore from "./newStore"
import { bus } from '@/utils/bus'

export default {
  name: 'StoreManag',
  components: { Conditionquery, Tablelist },
  data () {
    return {
      form: {
        shopName: '',
        shopIntroduction: '',
        shopLabel: '',
        businessStart: '',
        businessEnd: "",
        shopLongitude: '',
        shopLatitude: '',
        shopAddress: '',
        shopTelephone: "",
        shopImg: ""
      },
      newdata: {
        dialogFormVisible: false,
        title: "新增门店",
        fileList: [],
        time: [new Date(2016, 9, 10, 6, 0), new Date(2016, 9, 10, 23, 0)],
      },
      startTime: "",
      endTime: "",
      selectvalue: {
        pickervalue: [],
        selectvalue: "",
        selectvalueplaceholder: "全部"
      },
      currentPage: {
        current: 1,
        size: 10,
        total: 0,
      },
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
      modlebutArr: [
        {
          name: '录入门店信息',
          icon: "el-icon-refresh-right",
          key: 1,
        }
      ],
      inputarr: [
        {
          name: '商店名称',
          input: "",
          key: "shopName"

        },
        {
          name: '门店地址',
          input: "",
          key: "shopAddress"
        },
        {
          name: '门店联系电话',
          input: "",
          key: "shopTelephone"
        }
        ,
        {
          name: '代理人ID',
          input: "",
          key: "agentId"
        }
      ],
      butArr: [
        {
          name: '搜索',
          icon: "el-icon-search",
          key: 0
        }
      ],

      column: [
        {
          prop: "shopName",
          label: "门店名称"
        },
        {
          prop: "shopAddress",
          label: "门店地址"
        },
        {
          prop: "createTime",
          label: "创建时间"
        },
        {
          prop: "shopIntroduction",
          label: "简介"
        },
        {
          prop: "shopStatus",
          label: "店铺状态",
          type: 10
        },
      ],
      data: [],
      visibledel: false,
      goodsNumber: "",
      visibledeldata: {
        title: "",
        content: "",
        type: 0
      }
    }
  },
  created () {
    this.rechargeorderlist()
  },
  beforeDestroy () {
    // 销毁监听事件
    // bus.$off('baidumapcener')
  },
  mounted () {
    bus.$off('formdata')
    bus.$off('formdatadddd')
    bus.$on('formdata', (res) => {
      this.Newstorefn(res)

    })
    bus.$on('formdatadddd', (res) => {
      this.jyShopsupdateGoodsInfo(res)

    })
  },

  methods: {
    handleEdit (index, row, type) {
      if (type === 1) {
        this.newdata.dialogFormVisible = true
        if (row.shopImg) {
          var arr = row.shopImg.split(",")
          var shopImg = []
          for (var i = 0; i < arr.length; i++) {
            shopImg.push({
              name: arr[i],
              url: this.$ALI_OSS_URL + arr[i]
            })
          }
          this.newdata.fileList = shopImg
        }
        this.newdata.time = [new Date(2016, 9, 10, row.businessStart.split(":")[0], row.businessStart.split(":")[1]),
        new Date(2016, 9, 10, row.businessEnd.split(":")[0], row.businessEnd.split(":")[1])],
          delete row.deleted
        delete row.shopStatus
        this.form = row
        this.newdata.title = "修改门店"
        bus.$emit("baiduactive", this.newdata, this.form)
        bus.$emit("baidumapcener", this.form)
      } else if (type === 2) { //删除商品

        this.visibledeldata.title = "删除商品"
        this.visibledeldata.content = "确定要删除这个门店吗？"
        this.visibledeldata.type = type
        this.visibledel = true
        this.goodsNumber = row.shopId

      } else if (type === 3) { //开店
        this.visibledeldata.title = "开启店铺"
        this.visibledeldata.content = "确定要开启这个门店吗？"
        this.visibledeldata.type = type
        this.visibledel = true
        this.goodsNumber = row.shopId
      } else if (type === 4) { //关店
        this.visibledeldata.title = "关闭店铺"
        this.visibledeldata.content = "确定要关闭这个门店吗？"
        this.visibledeldata.type = type
        this.visibledel = true
        this.goodsNumber = row.shopId
      }
    },
    Newstorefn (form) {
      console.log("我是新增")
      form.JSON = 1
      const data = this.$api.personalhzapi.jyShopssaveShop(form)
      data.then(res => {
        if (res.code === '100') {
          this.rechargeorderlist()
          bus.$emit("baidunoo")
        }
      })

    },
    jyShopsupdateGoodsInfo (form) {
      form.JSON = 1
      const data = this.$api.personalhzapi.jyShopsupdateGoodsInfo(form)
      data.then(res => {
        if (res.code === '100') {
          // this.newdata.dialogFormVisible = false
          bus.$emit("baidunoo")

        }
      })

    },
    jyShopsremoveShop () {//删除
      var URl = 'jyShopsremoveShop'
      if (this.visibledeldata.type === 3) {
        URl = 'jyShopsshopOn'
      } else if (this.visibledeldata.type === 4) { //开店
        URl = 'jyShopsshopOff'
      }
      const data = this.$api.personalhzapi[URl](this.goodsNumber)
      data.then(res => {
        if (res.code === '100') {
          this.rechargeorderlist()
          this.visibledel = false
        }
      })

    },
    rechargeorderlist () { //条件查询   搜索   列表
      var params = Fun.searchData(this.inputarr, this.selectvalue, 'createTime', 'goodsStatus')
      delete params.createTime
      params.pageNum = this.currentPage.current
      params.pageSize = this.currentPage.size
      params.startTime = this.selectvalue.pickervalue ? this.selectvalue.pickervalue[0] : ""
      params.endTime = this.selectvalue.pickervalue ? this.selectvalue.pickervalue[1] : ""
      const data = this.$api.personalhzapi.shopGoodsPageShopByCondition(params)
      data.then(res => {
        if (res.code === '100') {
          this.currentPage.total = res.obj.total
          this.data = res.obj.records
        }
      })
    },
    clicksearch (key) {   //butArr but 的点击事件  封装里面的but根据key来判断是那个按钮

      if (key === 0) {
        this.currentPage.current = 1
        this.rechargeorderlist()
      } else if (key === 1) {
        // 这个是录入门店信息按钮
        this.newdata.title = "新增门店"
        this.newdata.fileList = []
        this.newdata.dialogFormVisible = true
        this.form = {
          shopName: '',
          shopIntroduction: '',
          shopLabel: '',
          businessStart: '',
          businessEnd: "",
          shopLongitude: '',
          shopLatitude: '',
          shopAddress: '',
          shopTelephone: "",
          shopImg: ""
        }
        bus.$emit("baiduactive", this.newdata, this.form)
      }
    },
    currentPagefn (name, data) {  //分页
      if (name === "size") {
        this.currentPage.current = data
        this.rechargeorderlist()
      } else {
        this.currentPage.current = 1
        this.currentPage.size = data
        this.rechargeorderlist()
      }
    },
  }

}
</script>

<style scoped>
.store-information {
  padding: 20px;
}
</style>