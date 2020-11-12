<!--
 * @Descripttion:  资金管理   运营
 * @version: X3版本
 * @Author: 胡征
 * @Date: 2020-09-23 11:11:06
 * @LastEditors: huzheng
 * @LastEditTime: 2020-11-03 16:45:22
-->
<template>
  <div class="store-information">

    <Conditionquery @clicksearch="clicksearch"
                    :inputdata='inputarr'
                    :picker="true"
                    :select="true"
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
  name: 'OrderDistributionRecord',
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
        label: '1',
        value: '教练'
      }, {
        label: '2',
        value: '用户'
      }],
      inputarr: [
        {
          name: '分发人ID',
          input: "",
          key: "createId"

        },
        {
          name: '批次号',
          input: "",
          key: "givingNumber"
        },
        {
          name: '门票ID',
          input: "",
          key: "ticketId"
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
          prop: "givingNumber",
          label: "批次号"
        },
        {
          prop: "ticketId",
          label: "票ID"
        },
        {
          prop: "createId",
          label: "分发人ID"
        },
        {
          prop: "useType",
          label: "分发人类型",
          type: 5
        },
        {
          prop: "createTime",
          label: "创建时间"
        },
        {
          prop: "updateTime",
          label: "更新时间",
        }
      ],
      data: []
    }
  },
  created () {
    this.rechargeorderlist()
  },
  methods: {
    rechargeorderlist () { //条件查询   搜索   列表
      var params = Fun.searchData(this.inputarr, this.selectvalue, 'createTime', 'useType')
      delete params.createTime
      params.pageNum = this.currentPage.current
      params.pageSize = this.currentPage.size
      params.startTime = this.selectvalue.pickervalue ? this.selectvalue.pickervalue[0] : ""
      params.endTime = this.selectvalue.pickervalue ? this.selectvalue.pickervalue[1] : ""
      const data = this.$api.personalhzapi.userOrderpageGivingRecord(params)
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

<style scoped>
.store-information {
  padding: 20px;
}
</style>