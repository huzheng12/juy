<!--
 * @Descripttion: 员工管理
 * @version: X3版本
 * @Author: 胡征
 * @Date: 2020-09-23 11:11:06
 * @LastEditors: huzheng
 * @LastEditTime: 2020-10-23 09:53:03
-->
<template>
  <div class="store-information">
    <Conditionquery @clicksearch="clicksearch"
                    :inputdata='inputarr'
                    :picker="true"
                    :select="true"
                    :selectvalue="selectvalue"
                    :options="options"
                    :pickertype='1'
                    :butdata="butArr">
    </Conditionquery>

    <Tablelist :column="column"
               :currentPage='currentPage'
               @currentPagefn="currentPagefn"
               :data="data">
    </Tablelist>
  </div>
</template>


<script>
import Conditionquery from '@/components/ConditionQuery'
import Tablelist from '@/components/TableList'
import Fun from '@/utils/dataIntegration'
export default {
  name: 'UsageRecords',
  components: { Conditionquery, Tablelist },
  data () {
    return {
      currentPage: {
        current: 1,
        size: 10,
        total: 0
      },
      inputarr: [
        {
          name: '门票名称',
          input: "",
          key: "ticketName"

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
          prop: "ticketName",
          label: "门票名称"
        },
        {
          prop: "ticketNumber",
          label: "门票编码"
        },
        {
          prop: "goodsPrice",
          label: "票价",
          type: 7
        },
        {
          prop: "useTime",
          label: "时长",
          type: 1
        },
        {
          prop: "deviceNumber",
          label: "设备编码"
        },
        {
          prop: "address",
          label: "使用门店"
        },
        {
          prop: "usedTime",
          label: "使用时间",
          type: 2
        },

        {
          prop: "useType",
          label: "使用人类型",
          type: 5
        }
      ],
      options: [{
        label: '0',
        value: '教练'
      }, {
        label: '1',
        value: '用户'
      }],
      selectvalue: {
        pickervalue: [],
        selectvalue: "",
        selectvalueplaceholder: "全部"
      },

      data: []
    }
  },
  created () {
    this.ticketUserecordlist()
  },
  methods: {
    ticketUserecordlist () {
      var params = Fun.searchData(this.inputarr, this.selectvalue, 'updateTime', 'useType')
      delete params.updateTime
      params.pageNum = this.currentPage.current
      params.pageSize = this.currentPage.size
      params.timeStart = this.selectvalue.pickervalue ? this.selectvalue.pickervalue[0] : ""
      params.timeEnd = this.selectvalue.pickervalue ? this.selectvalue.pickervalue[1] : ""
      const data = this.$api.personalhzapi.ticketUserecordlist(params)
      data.then(res => {
        if (res.code === '100') {
          this.currentPage.total = res.obj.total
          this.data = res.obj.records
        }
      })
    },
    clicksearch (key) {
      if (key === 0) {
        this.currentPage.current = 1
        this.ticketUserecordlist()
      }
    },
    currentPagefn (name, data) {
      if (name === "size") {
        this.currentPage.current = data
      } else {
        this.currentPage.current = 1
        this.currentPage.size = data
      }
      this.ticketUserecordlist()
    },
  }

}
</script>

<style>
.store-information {
  padding: 20px;
}
</style>