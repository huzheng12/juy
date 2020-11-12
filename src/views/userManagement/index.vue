<!--
 * @Descripttion:  资金管理   运营
 * @version: X3版本
 * @Author: 胡征
 * @Date: 2020-09-23 11:11:06
 * @LastEditors: huzheng
 * @LastEditTime: 2020-11-09 11:54:27
-->
<template>
  <div class="store-information">

    <Conditionquery @clicksearch="clicksearch"
                    :inputdata='inputarr'
                    :butdata="butArr">

    </Conditionquery>

    <Tablelist :column="column"
               :currentPage="currentPage"
               @currentPagefn='currentPagefn'
               :data="data">
    </Tablelist>

  </div>
</template>


<script>
import Conditionquery from '@/components/ConditionQuery'
import Tablelist from '@/components/TableList'
import Fun from '@/utils/dataIntegration'
export default {
  name: 'AgencyPerformance',
  components: { Conditionquery, Tablelist },
  data () {
    return {
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
        value: '待审核',
        label: '0'
      }, {
        label: '1',
        value: '通过'
      }, {
        label: '2',
        value: '驳回'
      }],

      inputarr: [
        {
          name: '充值单号',
          input: "",
          key: "rechargeOrderId"

        },
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
          prop: "created",
          label: "注册时间",
          type: 2
        },
        {
          prop: "mobilePhone",
          label: "手机号"
        },
        {
          prop: "trueName",
          label: "姓名"
        },
        {
          prop: "cardId",
          label: "身份证号码"
        },
        {
          prop: "country",
          label: "城市"
        },

      ],
      data: []
    }
  },
  created () {
    this.rechargeorderlist()
  },
  methods: {
    rechargeorderlist () { //条件查询   搜索   列表
      var params = Fun.searchData(this.inputarr, this.selectvalue, 'createTime', 'status')
      delete params.createTime
      params.pageNum = this.currentPage.current
      params.pageSize = this.currentPage.size
      params.startDate = this.selectvalue.pickervalue ? this.selectvalue.pickervalue[0] : ""
      params.endDate = this.selectvalue.pickervalue ? this.selectvalue.pickervalue[1] : ""
      const data = this.$api.personalhzapi.jyusergetUserList(params)
      data.then(res => {
        if (res.code === '100') {
          var dataArr = []
          res.obj.records.map((item) => {
            var obj = {
              created: item.created,
              mobilePhone: item.appPersonInfo.mobilePhone,
              trueName: item.appPersonInfo.trueName,
              cardId: item.appPersonInfo.cardId,
              country: item.appPersonInfo.country
            }
            dataArr.push(obj)
          })
          this.currentPage.total = res.obj.total
          this.data = dataArr
        }
      })
    },
    clicksearch (key) {   //butArr but 的点击事件  封装里面的but根据key来判断是那个按钮

      if (key === 0) {
        this.currentPage.current = 1
        this.rechargeorderlist()
      } else if (key === 1) {

        this.currentPage.current = 1
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

<style>
.store-information {
  padding: 20px;
}
</style>