<!--
 * @Descripttion: 员工管理
 * @version: X3版本
 * @Author: 胡征
 * @Date: 2020-09-23 11:11:06
 * @LastEditors: huzheng
 * @LastEditTime: 2020-10-23 09:53:23
-->
<template>
  <div class="store-information">
    <Conditionquery @clicksearch="clicksearch"
                    :inputdata='inputarr'
                    :picker="true"
                    :select="false"
                    :pickertype='1'
                    :selectvalue="selectvalue"
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
  name: 'ExchangeRecords',
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
          key: "goodsName"
        },
        // {
        //   name: '时长',
        //   input: "",
        //   key: ""
        // },
        {
          name: "价格",
          input: "",
          key: "goodsPrice"
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
          label: "门票名称"
        },
        {
          prop: "goodsPrice",
          label: "价格",
          type: 7
        },
        {
          prop: "count",
          label: "数量"
        },
        {
          prop: "orderPrice",
          label: "花费金额",
          type: 7
        },
        {
          prop: "createTime",
          label: "创建时间"
        },
        {
          prop: "createrId",
          label: "创建人ID"
        }
      ],
      data: [],
      selectvalue: {
        pickervalue: [],
        selectvalue: "",

      },
    }
  },
  created () {
    this.ticketExchangeInfolist()
  },
  methods: {
    ticketExchangeInfolist () {
      var params = Fun.searchData(this.inputarr, this.selectvalue, 'updateTime', 'ticketStatus')
      delete params.updateTime
      params.pageNum = this.currentPage.current
      params.pageSize = this.currentPage.size
      params.timeStart = this.selectvalue.pickervalue ? this.selectvalue.pickervalue[0] : ""
      params.timeEnd = this.selectvalue.pickervalue ? this.selectvalue.pickervalue[1] : ""
      const data = this.$api.personalhzapi.ticketExchangeInfolist(params)
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
        this.ticketExchangeInfolist()
        // console.log('我时搜所')
      }
    },
    currentPagefn (name, data) {
      if (name === "size") {
        this.currentPage.current = data
      } else {
        this.currentPage.current = 1
        this.currentPage.size = data
      }
      this.ticketExchangeInfolist()
    },
  }

}
</script>

<style>
.store-information {
  padding: 20px;
}
</style>