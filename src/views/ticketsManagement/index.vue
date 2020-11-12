<!--
 * @Descripttion: 运营门票
 * @version: X3版本
 * @Author: 胡征
 * @Date: 2020-09-23 11:11:06
 * @LastEditors: huzheng
 * @LastEditTime: 2020-11-12 14:53:17
-->
<template>
  <div class="store-information">
    <div style="color:red">可用余额：{{ticketPrice}}元</div>
    <Conditionquery @clicksearch="clicksearch"
                    :inputdata='inputarr'
                    :modlebutdata='modlebutArr'
                    :picker="true"
                    :pickertype='1'
                    :selectvalue="selectvalue"
                    :butdata="butArr">
    </Conditionquery>
    <Tablelist :column="column"
               :currentPage='currentPage'
               @currentPagefn="currentPagefn"
               :data="data">
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span class="but-span"
                @click="handleEdit(scope.$index, scope.row,1)">
            兑换
          </span>
        </template>
      </el-table-column>
    </Tablelist>
    <el-dialog title="兑换门票"
               :visible.sync="exchangeVisible"
               width="30%">
      <el-form label-position="right"
               label-width="90px"
               ref="ruleForm"
               :rules="rules"
               :model="exchangedataindex">
        <el-form-item label="商品名称"
                      prop="tradeName">
          <el-input :disabled="true"
                    v-model="exchangedata.tradeName"></el-input>
        </el-form-item>
        <el-form-item label="时长"
                      prop="duration">
          <el-input :disabled="true"
                    v-model="exchangedata.duration"></el-input>
        </el-form-item>
        <el-form-item label="价格"
                      prop="price">
          <el-input placeholder="输入价格"
                    :disabled="true"
                    v-model="exchangedata.price"></el-input>
        </el-form-item>
        <el-form-item label="数量"
                      prop="number">

          <el-input-number v-model="exchangedataindex.number"
                           class="input-but-code"
                           :precision='0'
                           :min="0"
                           :max="parseInt(ticketPrice / exchangedataindex.price)"
                           placeholder="输入兑换数量"
                           :step="1"></el-input-number>
          <el-button style="margin-left: 18px;"
                     @click="allNumber">全部</el-button>
        </el-form-item>

      </el-form>
      <div class="foot-wenzi">
        <p>可用余额：{{ticketPrice}}元</p>
        <p>花费金额：{{this | capitalize}}元</p>
      </div>
      <!-- <div class="foot-wenzi">
        <p>剩余门票：{{count}}张</p>

      </div> -->
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="cancelClick">取 消</el-button>
        <el-button type="primary"
                   @click="okClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Conditionquery from '@/components/ConditionQuery'
import Tablelist from '@/components/TableList'
import Fun from '@/utils/dataIntegration'
export default {
  name: 'UsageRecordsindex',
  components: { Conditionquery, Tablelist },
  filters: {
    capitalize (_this) {
      var num = _this.exchangedataindex.price * _this.exchangedataindex.number
      num = num.toFixed(2);
      return num
    }
  },
  data () {
    return {
      selectvalue: {
        pickervalue: [],
        selectvalue: "",
        selectvalueplaceholder: "全部"
      },
      exchangedata: {
        tradeName: "",
        duration: "",
        price: "",
      },
      exchangedataindex: {
        tradeName: "",
        duration: "",
        price: "",
        number: "",
      },
      options: [{
        label: '0',
        value: '未上架'
      }, {
        label: '1',
        value: '上架'
      }],
      rules: {
        number: { required: true, message: '输入兑换数量', trigger: 'change' }
      },
      currentPage: {
        current: 1,
        size: 10,
        total: 0
      },
      exchangeVisible: false,
      inputarr: [
        {
          name: '门票名称',
          input: "",
          key: "ticketName"
        },
        {
          name: '时长',
          input: "",
          key: "useTime"
        },
        {
          name: "价格",
          input: "",
          key: "agentPrice"
        }
      ],
      butArr: [
        {
          name: '搜索',
          icon: "el-icon-search",
          key: 0
        }
      ],
      goodsNumber: "",
      modlebutArr: [],
      column: [
        {
          prop: "goodsName",
          label: "门票名称"
        },
        {
          prop: "useTime",
          label: "时长",
          type: 1
        },
        {
          prop: "agentPrice",
          label: "价格",
          type: 7
        },
        {
          prop: "createTime",
          label: "创建时间",
          type: 2
        },
        {
          prop: "createrId",
          label: "创建人ID"
        },
        // {
        //   prop: "addres3s",
        //   label: "可用门票"
        // }
      ],
      data: [],
      ticketPrice: '0.00',
      count: 0
    }
  },
  created () {
    this.ticketlist()
    this.ticketfindHotAmount()
  },
  methods: {
    ticketfindHotAmount () {
      const data = this.$api.personalhzapi.ticketfindHotAmount()
      data.then(res => {
        if (res.code === '100') {
          this.ticketPrice = res.obj / 100
        }
      })
    },

    ticketlist () {
      var params = Fun.searchData(this.inputarr, this.selectvalue, 'updateTime', 'ticketStatus')
      delete params.updateTime
      params.pageNum = this.currentPage.current
      params.pageSize = this.currentPage.size
      params.timeStart = this.selectvalue.pickervalue ? this.selectvalue.pickervalue[0] : ""
      params.timeEnd = this.selectvalue.pickervalue ? this.selectvalue.pickervalue[1] : ""
      const data = this.$api.personalhzapi.ticketlist(params)
      data.then(res => {
        if (res.code === '100') {
          this.currentPage.total = res.obj.total
          this.data = res.obj.records
        }
      })
    },
    allNumber () {
      this.exchangedataindex.number = parseInt(this.ticketPrice / this.exchangedataindex.price)
    },
    cancelClick () {
      this.$refs.ruleForm.resetFields();
      this.exchangeVisible = false
    },
    okClick () {
      // 
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.exchangedataindex.number > 0) {
            var params = {
              goodsNumber: this.goodsNumber,
              count: this.exchangedataindex.number,
              JSON: true,
            }
            const data = this.$api.personalhzapi.operationTicketconversion(params)
            data.then(res => {
              if (res.code === '100') {
                this.ticketfindHotAmount()
                this.exchangeVisible = false
                this.$message({
                  type: 'success',
                  message: res.msg
                })
              }
            })
          }

        } else {
          return false;
        }
      });
    },
    clicksearch (key) {
      if (key === 0) {
        this.currentPage.current = 1
        this.ticketlist()
      }
    },
    handleEdit (index, row) {
      this.exchangeVisible = true
      this.exchangedata = {
        tradeName: row.goodsName,
        duration: row.useTime + '分钟',
        price: row.agentPrice / 100 + '元',
      }
      this.goodsNumber = row.goodsNumber
      this.exchangedataindex = {
        tradeName: row.goodsName,
        duration: row.useTime,
        price: row.agentPrice / 100,
        number: ""
      }

      // const data = this.$api.personalhzapi.operationTicketnotUsedTicketCount({ goodsNumber: row.goodsNumber, JSON: 1 })
      // data.then(res => {
      //   if (res.code === '100') {
      //     this.count = res.obj
      //   }
      // })

    },
    currentPagefn (name, data) {
      if (name === "size") {
        this.currentPage.current = data
      } else {
        this.currentPage.current = 1
        this.currentPage.size = data
      }
      this.ticketlist()
    },

  }

}
</script>

<style  scoped>
.store-information {
  padding: 20px;
}
.input-but-code {
  width: calc(100% - 88px);
}
.foot-wenzi {
  display: flex;
  justify-content: space-between;
  color: #a60505;
}
</style>

<style lang="scss" scoped>
</style>