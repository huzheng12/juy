<!--
 * @Descripttion:  资金管理   运营
 * @version: X3版本
 * @Author: 胡征
 * @Date: 2020-09-23 11:11:06
 * @LastEditors: huzheng
 * @LastEditTime: 2020-11-11 14:29:29
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
                  v-if="scope.row.applyStatus===0">
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
    <el-dialog :title="dialogdata.title"
               :visible.sync="dialogdata.visible"
               width="30%">
      <div v-if="dialogdata.type===1"
           style="text-align: center;">
        是否确定通过该订单退款？
      </div>
      <div v-if="dialogdata.type===2">
        <el-input type="textarea"
                  placeholder="请输入驳回理由"
                  v-model="dialogdata.textarea"
                  maxlength="30"
                  show-word-limit>
        </el-input>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogdata.visible=false">取 消</el-button>
        <el-button type="primary"
                   :loading="loading"
                   @click="jyShopsremoveShop(dialogdata.type)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
import Conditionquery from '@/components/ConditionQuery'
import Tablelist from '@/components/TableList'
import Fun from '@/utils/dataIntegration'
export default {
  name: 'Refundorder',
  components: { Conditionquery, Tablelist },
  data () {
    return {
      visibledel: false,
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
        value: '退票审核中',
        label: '0'
      }, {
        label: '1',
        value: '退票成功'
      }, {
        label: '2',
        value: '退票驳回'
      }],

      loading: false,
      inputarr: [
        {
          name: '订单号',
          input: "",
          key: "orderNumber"

        },
        {
          name: '用户ID',
          input: "",
          key: "userId"
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
          prop: "orderNumber",
          label: "订单号"
        },
        {
          prop: "userId",
          label: "用户ID"
        },
        {
          prop: "refundAmount",
          label: "退款金额",
          type: 7
        },
        {
          prop: "refundCount",
          label: "退票数量"
        },

        {
          prop: "applyReason",
          label: "申请理由"
        },
        {
          prop: "reasonsRejection",
          label: "驳回理由"
        },
        {
          prop: "refundStatus",
          label: "退款状态",
          type: 11
        },
        {
          prop: "applyStatus",
          label: "申请状态",
          type: 16
        }
      ],
      data: [],
      dialogdata: {
        title: "通过驳回",
        visible: false,
        type: 1,
        textarea: '',
        applyId: '',
      }
    }
  },
  created () {
    this.rechargeorderlist()
  },
  methods: {
    jyShopsremoveShop (type) {
      if (type === 1) {
        this.loading = true
        let params = {
          applyId: this.dialogdata.applyId,
          JSON: 1
        }
        const data = this.$api.personalhzapi.userrefunduserRefundPass(params)
        data.then(res => {
          console.log(9959559, res)
          if (res.code === '100') {
            this.dialogdata.visible = false
            this.rechargeorderlist()
          }
          console.log("9959559", res)
          this.loading = false
        })

      } else {

        let params = {
          applyId: this.dialogdata.applyId,
          reasonsRejection: this.dialogdata.textarea,
          JSON: 1
        }
        if (this.dialogdata.textarea) {
          this.loading = true
          const data = this.$api.personalhzapi.userrefunduserRefundNo(params)
          data.then(res => {
            if (res.code === '100') {
              this.dialogdata.visible = false
              this.rechargeorderlist()
            }
            this.loading = false
          })
        } else {
          return this.$message({
            message: '请输入驳回理由',
            type: 'warning'
          });
        }

      }
    },
    handleEdit (index, row, type) {
      if (type === 1) {
        this.dialogdata.visible = true
        this.dialogdata.title = "通过"
        this.dialogdata.type = 1
        this.dialogdata.applyId = row.applyId
      } else {
        this.dialogdata.visible = true
        this.dialogdata.title = "驳回"
        this.dialogdata.type = 2
        this.dialogdata.textarea = ''
        this.dialogdata.applyId = row.applyId
      }
    },
    rechargeorderlist () { //条件查询   搜索   列表
      var params = Fun.searchData(this.inputarr, this.selectvalue, 'createTime', 'applyStatus')
      delete params.createTime
      params.pageNum = this.currentPage.current
      params.pageSize = this.currentPage.size
      params.createStartTime = this.selectvalue.pickervalue ? this.selectvalue.pickervalue[0] : ""
      params.createEndYime = this.selectvalue.pickervalue ? this.selectvalue.pickervalue[1] : ""
      const data = this.$api.personalhzapi.userRefundApplyuserRefundApply(params)
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
    detailscurrentPagefn (name, data) {  //分页
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