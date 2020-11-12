<!--
 * @Descripttion:  资金管理 => 充值记录    代理
 * @version: X3版本
 * @Author: 胡征
 * @Date: 2020-09-23 11:11:06
 * @LastEditors: huzheng
 * @LastEditTime: 2020-11-12 11:07:45
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
               @currentPagefn="currentPagefn"
               :data="data">
    </Tablelist>
  </div>
</template>
<script>
import Conditionquery from '@/components/ConditionQuery'
import Tablelist from '@/components/TableList'
import Fun from "@/utils/dataIntegration"
export default {
  name: 'Management',
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
      dialogVisible: false,
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
          name: '充值人',
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
          label: "充值单号"
        },
        {
          prop: "agentAccount",
          label: "充值账号"
        },
        {
          prop: "createTime",
          label: "充值时间",
          type: 2
        },
        {
          prop: "rechargeAmount",
          label: "充值金额",
          type: 4
        },
        {
          prop: "hotAmount",
          label: "可用金额",
          type: 4
        },
        {
          prop: "agentName",
          label: "充值人"
        }
      ],
      data: []
    }
  },
  created () {
    this.rechargeorderlist()
  },
  methods: {
    rechargeorderlist () {
      var params = Fun.searchDatas({
        _this: this,
      })
      const data = this.$api.personalhzapi.rechargeorderlist(params)
      data.then(res => {
        if (res.code === '100') {
          this.currentPage.total = res.obj.total
          this.data = res.obj.records
        }
      })
    },
    clicksearch (type) {
      if (type === 0) {
        this.currentPage.current = 1
        this.rechargeorderlist()
      }
    },
    currentPagefn (name, data) {
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