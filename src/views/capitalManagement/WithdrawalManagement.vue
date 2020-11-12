<!--
 * @Descripttion:  资金管理 => 提现管理  代理
 * @version: X3版本
 * @Author: 胡征
 * @Date: 2020-09-23 11:11:06
 * @LastEditors: huzheng
 * @LastEditTime: 2020-11-12 11:00:00
-->
<template>
  <div class="store-information">

    <Conditionquery @clicksearch="clicksearch"
                    :inputdata='inputarr'
                    :picker="true"
                    :select="true"
                    :pickertype='1'
                    :modlebutdata='modlebutArr'
                    :selectvalue="selectvalue"
                    :options="options"
                    :butdata="butArr">

    </Conditionquery>

    <Tablelist :column="column"
               :currentPage="currentPage"
               @currentPagefn="currentPagefn"
               :data="data">
      <el-table-column label="操作">
        <template slot-scope="scope"
                  v-if="scope.row.applyStatus==0">
          <span class="but-span"
                @click="handleEdit(scope.$index, scope.row)">
            撤销
          </span>

        </template>
      </el-table-column>
    </Tablelist>
    <el-dialog title="提现"
               :visible.sync="visibletixian"
               width="30%">
      <div>
        <!-- :min="100" -->
        <el-input-number v-model="withdrawalAmount"
                         controls-position="right"
                         @change="handleChange"
                         :max="this.Apply.canCashOutAmount"></el-input-number>
        <div style="display: flex;
    justify-content: space-between;
    margin-top: 20px;">
          <span>
            可提现金额： {{   this.Apply.canCashOutAmount/100
      }}元
          </span>
          <span>
            冻结金额： {{  this.Apply.coldAmount/100
      }}元
          </span>
        </div>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="visibletixian=false">取 消</el-button>
        <el-button type="primary"
                   @click="withdrawalManagementwithdrawalApply()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
import Conditionquery from '@/components/ConditionQuery'
import Tablelist from '@/components/TableList'
import Fun from "@/utils/dataIntegration"
export default {
  name: 'WithdrawalManagement',

  components: { Conditionquery, Tablelist },
  data () {
    return {
      withdrawalAmount: 1,
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
      modlebutArr: [
        {
          name: '申请提现',
          icon: "el-icon-refresh-right",
          key: 1,
        }
      ],
      dialogVisible: false,
      options: [{
        label: '0',
        value: '待审核'
      }, {
        label: '1',
        value: '已审核'
      }, {
        label: '2',
        value: '被驳回'
      }, {
        label: '3',
        value: '代理提现已撤回'
      }],
      inputarr: [
        {
          name: '代理编码',
          input: "",
          key: "agentNumber"

        },

        {
          name: '手机',
          input: "",
          key: "mobile"
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
          prop: "agentNumber",
          label: "代理编号"
        },
        {
          prop: "applyTime",
          label: "提现时间"
        },
        {
          prop: "applyWithdrawalAmount",
          label: "提现金额",
          type: 7
        },
        {
          prop: "applyStatus",
          label: "申请状态",
          type: 12
        },
        {
          prop: "remitStatus",
          label: "提现状态",
          type: 11
        },

      ],
      data: [],
      visibletixian: false,
      Apply: {
        canCashOutAmount: 0,
        coldAmount: 0
      }
    }
  },
  created () {
    this.rechargeorderlist()
    this.withdrawalManagementcanCashOutAmountAndColdAmount()

  },
  methods: {
    withdrawalManagementcanCashOutAmountAndColdAmount () {
      const data = this.$api.personalhzapi.withdrawalManagementcanCashOutAmountAndColdAmount()
      data.then(res => {
        if (res.code === '100') {

          this.Apply = res.obj
        }
      })
    },
    withdrawalManagementwithdrawalApply () {
      var a = {
        withdrawalAmount: this.withdrawalAmount
      }
      const data = this.$api.personalhzapi.withdrawalManagementwithdrawalApply(a)
      data.then(res => {
        if (res.code === '100') {
          this.rechargeorderlist()
          this.visibletixian = false
          this.withdrawalManagementcanCashOutAmountAndColdAmount()
        }
      })
    },
    handleEdit (index, row) {


      const data = this.$api.personalhzapi.withdrawalManagementcancelWithdrawal(row.applyId)
      data.then(res => {
        if (res.code === '100') {
          this.rechargeorderlist()
          this.withdrawalManagementcanCashOutAmountAndColdAmount()
        }
      })
    },
    rechargeorderlist () {
      var params = Fun.searchDatas({
        _this: this,
        statusname: 'applyStatus',
        startTimeName: 'applyStartTime',
        endTimeName: 'applyEndTime',
      })
      const data = this.$api.personalhzapi.withdrawalManagementpageWithdrawalApplyCondition(params)
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
      } else if (type === 1) {
        this.visibletixian = true
      }
    },
    handleChange (value) {
      console.log(value);
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
.el-input-number {
  width: 100%;
}
</style>