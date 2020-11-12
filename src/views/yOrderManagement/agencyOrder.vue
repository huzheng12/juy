<!--
 * @Descripttion:  资金管理   运营
 * @version: X3版本
 * @Author: 胡征
 * @Date: 2020-09-23 11:11:06
 * @LastEditors: huzheng
 * @LastEditTime: 2020-11-10 18:39:41
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
        <template slot-scope="scope">
          <span class="but-span"
                @click="handleEdit(scope.$index, scope.row)">
            详情
          </span>
        </template>
      </el-table-column>
    </Tablelist>
    <el-dialog title="订单详情"
               :visible.sync="visibledel"
               width="50%">
      <div>
        <Tablelist :column="detailscolumn"
                   :data="detailsdata">
          <!-- <el-table-column label="操作">
            <template slot-scope="scope">
              <span class="but-span"
                    @click="handleEdit(scope.$index, scope.row)">
                详情
              </span>

            </template>
          </el-table-column> -->
        </Tablelist>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <!-- <el-button @click="visibledel=false">取 消</el-button> -->
        <el-button type="primary"
                   @click="visibledel=false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
import Conditionquery from '@/components/ConditionQuery'
import Tablelist from '@/components/TableList'
import Fun from '@/utils/dataIntegration'
export default {
  name: 'yOrderManagement',
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
        value: '代理人',
        label: '1'
      }, {
        label: '2',
        value: '教练'
      }],
      inputarr: [
        {
          name: '代理编号',
          input: "",
          key: "agentNumber"

        },
        {
          name: '创建人ID',
          input: "",
          key: "createrId"
        },
        {
          name: '订单号',
          input: "",
          key: "orderNumber"
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
          prop: "agentNumber",
          label: "代理编号"
        },
        {
          prop: "orderPrice",
          label: "订单价格"
        },
        {
          prop: "createTime",
          label: "创建时间"
        },
        {
          prop: "createrId",
          label: "创建人id"
        },
        {
          prop: "createrType",
          label: "创建人类型",
          type: 5
        }
      ],
      data: [],
      detailsdata: [],
      detailscolumn: [
        {
          prop: "ticketNumber",
          label: "票编号"
        },
        {
          prop: "ticketName",
          label: "票名字"
        },
        {
          prop: "ticketStatus",
          label: "票领取状态",
          type: 13
        },
        {
          prop: "sendAttribute",
          label: "票分发状态",
          type: 14
        }
      ],
      detailscurrentPage: {
        current: 1,
        size: 10,
        total: 0,
      },
      detailsorderNumber: ""
    }
  },
  created () {
    this.rechargeorderlist()
  },
  methods: {
    detailscurrentPagefnlist () {
      const data = this.$api.personalhzapi.ticketUserecordpageAgentTicketById({ orderNumber: this.detailsorderNumber })
      data.then(res => {
        if (res.code === '100') {
          this.detailscurrentPage.total = res.obj.total
          this.detailsdata = res.obj.records
        }
      })
    },
    handleEdit (index, row) {
      this.visibledel = true
      this.detailsorderNumber = row.orderNumber
      this.detailscurrentPagefnlist()
    },
    rechargeorderlist () { //条件查询   搜索   列表
      var params = Fun.searchData(this.inputarr, this.selectvalue, 'createTime', 'createrType')
      delete params.createTime
      params.pageNum = this.currentPage.current
      params.pageSize = this.currentPage.size
      params.startDate = this.selectvalue.pickervalue ? this.selectvalue.pickervalue[0] : ""
      params.endDate = this.selectvalue.pickervalue ? this.selectvalue.pickervalue[1] : ""
      const data = this.$api.personalhzapi.ticketUserecordpageOrderByCondition(params)
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