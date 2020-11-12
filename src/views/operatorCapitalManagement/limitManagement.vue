<!--
 * @Descripttion:  资金管理   运营
 * @version: X3版本
 * @Author: 胡征
 * @Date: 2020-09-23 11:11:06
 * @LastEditors: huzheng
 * @LastEditTime: 2020-10-23 14:26:44
-->
<template>
  <div class="store-information">

    <Conditionquery @clicksearch="clicksearch"
                    :inputdata='inputarr'
                    :picker="true"
                    :pickertype='1'
                    :selectvalue="selectvalue"
                    :options="options"
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
  name: 'limitManagement',
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
        {
          name: '充值账户',
          input: "",
          key: "agentAccount"
        },
        {
          name: '充值代理',
          input: "",
          key: "agentName"
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
          prop: "rechargeOrderId",
          label: "时间"
        },
        {
          prop: "agentAccount",
          label: "额度"
        },
        {
          prop: "agentName",
          label: "已用额度"
        },
        {
          prop: "createTime",
          label: "剩余额度",
          type: 2
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
      const data = this.$api.personalhzapi.rechargeorderlist(params)
      data.then(res => {
        if (res.code === '100') {
          this.currentPage.total = res.obj.total
          this.data = res.obj.records
        }
      })
    },
    clicksearch (type) {   //butArr but 的点击事件  封装里面的but根据key来判断是那个按钮
      if (type === 0) {
        this.currentPage.current = 1
        this.rechargeorderlist()
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