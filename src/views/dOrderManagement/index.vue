<!--
 * @Descripttion:  资金管理   运营
 * @version: X3版本
 * @Author: 胡征
 * @Date: 2020-09-23 11:11:06
 * @LastEditors: huzheng
 * @LastEditTime: 2020-11-12 11:07:57
-->
<template>
  <div class="store-information">

    <Conditionquery @clicksearch="clicksearch"
                    :inputdata='inputarr'
                    :modlebutdata='modlebutArr'
                    :picker="true"
                    :select="true"
                    :pickertype='1'
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

        </template>
      </el-table-column>
    </Tablelist>
    <!-- <Newstore :visible="newdata"
              :form="form"
              @func="Newstorefn">
    </Newstore> -->
    <el-dialog title="删除门店"
               :visible.sync="visibledel"
               width="30%">

      <div class="centent-model-box"
           style='line-height: 35px;
    display: flex;'>
        <i class="el-icon-success"
           style="font-size: 35px;margin-right: 10px;
    color: #52C41A;"></i>
        <span>确定要删除这个门店吗？</span>
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
import { bus } from '@/utils/bus'
export default {
  name: 'StoreManagementList',
  components: { Conditionquery, Tablelist },
  data () {
    return {
      form: {
        goodsName: '',
        goodsAvatar: '',
        shopNumber: '',
        goodsDesc: '',
        goodsNowPrice: '',
        goodsOldPrice: "",
        goodsRule: '',
        goodsTag: '',
        standardGoodsNumber: '',
        goodsStatus: "",
        goodsImg: "",
        goodsText: "",
      },
      newdata: {
        dialogFormVisible: false,
        fileList: [],
        headfileList: [],
        option: [],
        optiongoodID: [],
        title: "创建门票"

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
        label: 0
      }, {
        label: 1,
        value: '已下架'
      }, {
        label: 2,
        value: '失效'
      }],
      modlebutArr: [
        {
          name: '新建门票',
          icon: "el-icon-refresh-right",
          key: 1,
        }
      ],
      inputarr: [
        {
          name: '商品名称',
          input: "",
          key: "goodsName"

        },
        {
          name: '商品编号',
          input: "",
          key: "goodsNumber"
        },
        {
          name: '门店ID',
          input: "",
          key: "shopNumber"
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
          prop: "goodsName",
          label: "商品名称"
        },
        {
          prop: "goodsNumber",
          label: "商品编码"
        },
        {
          prop: "shopNumber",
          label: "门店ID"
        },
        {
          prop: "createTime",
          label: "创建时间",
          type: 2
        },
        {
          prop: "goodsDesc",
          label: "商品详情介绍"
        },
        {
          prop: "goodsStatus",
          label: "商品状态",
          type: 15
        }
      ],
      data: [],
      visibledel: false,
      goodsNumber: ""
    }
  },
  created () {
    this.rechargeorderlist()
    const data = this.$api.personalhzapi.shopGoodslistTicketInfo()
    data.then(res => {
      if (res.code === '100') {
        this.newdata.option = res.obj
      }
    })
    const goodID = this.$api.personalhzapi.shopGoodslistShopByAgentId()
    goodID.then(res => {
      if (res.code === '100') {
        this.newdata.optiongoodID = res.obj
      }
    })
  },
  mounted () {
    bus.$off("Newstorefn")
    bus.$off("oldtorefns")
    bus.$on('Newstorefn', form => {
      form.JSON = 1
      const data = this.$api.personalhzapi.shopGoodssaveShopGoods(form)
      data.then(res => {
        if (res.code === '100') {
          this.rechargeorderlist()
          this.newdata.dialogFormVisible = false
          bus.$emit("noo")
        }
      })
    })
    bus.$on('oldtorefns', form => {
      form.JSON = 1
      const data = this.$api.personalhzapi.shopGoodsupdateShopGoodsById(form)
      data.then(res => {
        if (res.code === '100') {
          this.rechargeorderlist()
          this.newdata.dialogFormVisible = false
          bus.$emit("noo")
        }
      })
    })
  },
  methods: {
    handleEdit (index, row, type) {
      if (type === 1) {
        this.newdata.dialogFormVisible = true
        if (row.goodsImg) {
          var arr = row.goodsImg.split(",")
          var goodsImg = []
          for (var i = 0; i < arr.length; i++) {
            goodsImg.push({
              name: arr[i],
              url: this.$ALI_OSS_URL + arr[i]
            })
          }
          this.newdata.fileList = goodsImg
        }
        if (row.goodsAvatar) {
          var arrss = row.goodsAvatar.split(",")
          var goodsAvatar = []
          for (var j = 0; j < arrss.length; j++) {
            goodsAvatar.push({
              name: arrss[j],
              url: this.$ALI_OSS_URL + arrss[j]
            })
          }
          this.newdata.headfileList = goodsAvatar
        }
        delete row.goodsSellCount
        delete row.useTime
        row.goodsStatus = row.goodsStatus.toString()
        this.form = row
        this.newdata.title = "修改门票"
        bus.$emit("active", this.newdata, this.form)
        bus.$emit("activecontent", row.goodsText)
      } else if (type === 2) { //删除商品
        this.visibledel = true
        this.goodsNumber = row.goodsNumber
      }
    },
    Newstorefn () {
      this.form.JSON = 1
      const data = this.$api.personalhzapi.shopGoodsupdateShopGoodsById(this.form)
      data.then(res => {
        if (res.code === '100') {
          this.rechargeorderlist()
          this.newdata.dialogFormVisible = false
        }
      })

    },
    jyShopsremoveShop () {//删除
      const data = this.$api.personalhzapi.shopGoodsdelShopGoodsById({ goodsNumber: this.goodsNumber, JSON: 1 })
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
      const data = this.$api.personalhzapi.shopGoodsjyShopsshopList(params)
      data.then(res => {
        if (res.code === '100' && res.obj.records) {
          for (var i = 0; i < res.obj.records.length; i++) {
            res.obj.records[i].goodsNowPrice = res.obj.records[i].goodsNowPrice / 100
            res.obj.records[i].goodsOldPrice = res.obj.records[i].goodsOldPrice / 100
          }
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
        this.newdata.fileList = []
        this.newdata.dialogFormVisible = true
        this.form = {
          goodsName: '',
          shopNumber: '',
          goodsDesc: '',
          goodsNowPrice: '',
          goodsOldPrice: "",
          goodsRule: '',
          goodsAvatar: '',
          goodsTag: '',
          standardGoodsNumber: '',
          goodsStatus: "",
          goodsImg: "",
          goodsText: "",
        }
        this.newdata.title = "创建门票"
        bus.$emit("active", this.newdata, this.form)
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
body .el-dialog__body {
  padding: 30px 50px 30px 20px;
}
</style>