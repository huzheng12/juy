<!--
 * @Descripttion:  资金管理   运营
 * @version: X3版本
 * @Author: 胡征
 * @Date: 2020-09-23 11:11:06
 * @LastEditors: huzheng
 * @LastEditTime: 2020-11-11 14:22:58
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
      <el-table-column label="操作">
        <template slot-scope="scope"
                  v-if="scope.row.applyStatus==0">
          <span class="but-span"
                @click="handleEdit(scope.$index, scope.row,1)">
            通过
          </span>
          <el-divider direction="vertical"></el-divider>
          <span class="but-span"
                @click="handleEdit(scope.$index, scope.row,2)">
            驳回
          </span>
        </template>
      </el-table-column>
    </Tablelist>
    <el-dialog title="提现驳回"
               :visible.sync="visibledel"
               width="30%">

      <div>
        <el-input type="textarea"
                  placeholder="请输入驳回理由"
                  v-model="textarea"
                  maxlength="30"
                  show-word-limit>
        </el-input>
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
// import Fun from '@/utils/dataIntegration'
export default {
  name: 'RechargeRecordindex',
  components: { Conditionquery, Tablelist },
  data () {
    return {
      textarea: "",
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
        value: '已审核',
        label: '1'
      }, {
        value: '已完成',
        label: '2'
      }, {
        value: '被驳回',
        label: '3'
      }],
      inputarr: [
        {
          name: '代理人编号',
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
          key: 0,
        }
      ],
      column: [
        {
          prop: "applyTime",
          label: "提现时间"
        },
        {
          prop: "applyWithdrawalAmount",
          label: "金额",
          type: 7
        },
        {
          prop: "updateTime",
          label: "通过时间"
        },
        {
          prop: "reasonsRejection",
          label: "驳回理由"
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
      visibledel: false,
      applyId: ""
    }
  },
  created () {

    this.rechargeorderlist()
  },
  methods: {
    jyShopsremoveShop () {
      if (!this.textarea) {
        return this.$message({
          message: '请输入驳回理由',
          type: 'warning'
        });
      }
      const data = this.$api.personalhzapi.withdrawalManagementwithdrawalApplyNo({ applyId: this.applyId, reasonsRejection: this.textarea })
      data.then(res => {
        if (res.code === '100') {
          this.rechargeorderlist()
          this.visibledel = false
        }
      })
    },
    handleEdit (index, row, type) {
      if (type === 1) {
        const data = this.$api.personalhzapi.withdrawalManagementwithdrawalApplyPass({ applyId: row.applyId })
        data.then(() => {
          this.rechargeorderlist()
        })
      } else {
        this.visibledel = true
        this.applyId = row.applyId
      }
    },
    rechargeorderlist () {
      var params = Fun.searchData(this.inputarr, this.selectvalue, 'createTime', 'applyStatus')
      delete params.createTime
      params.pageNum = this.currentPage.current
      params.pageSize = this.currentPage.size
      params.applyStartTime = this.selectvalue.pickervalue ? this.selectvalue.pickervalue[0] : ""
      params.applyEndTime = this.selectvalue.pickervalue ? this.selectvalue.pickervalue[1] : ""
      const data = this.$api.personalhzapi.ManagementpageWithdrawalApplyCondition(params)
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