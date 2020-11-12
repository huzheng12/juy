<!--
 * @Descripttion: 
 * @version: X3版本
 * @Author: 胡征
 * @Date: 2020-09-23 14:21:26
 * @LastEditors: huzheng
 * @LastEditTime: 2020-11-10 16:06:14
-->
  <template>
  <div>
    <el-table :data="data"
              style="width: 100%">

      <el-table-column v-for="item of column"
                       :key="item.label"
                       :prop="item.prop"
                       :label="item.label">
        <template slot-scope="scope">
          <div>
            <span v-if="item.type===1">
              {{scope.row[item.prop] }}分钟
            </span>
            <span v-if="item.type===2">
              {{ scope.row[item.prop] | capitalize }}
            </span>
            <span v-if="item.type===3">
              <!-- -未使用，1-已使用 -->
              {{ scope.row[item.prop]!=1?"上架":"未上架" }}
            </span>
            <span v-if="item.type===4">
              {{scope.row[item.prop] }}元
            </span>
            <span v-if="item.type===7">
              {{scope.row[item.prop]/100 }}元
            </span>
            <span v-if="item.type===5">
              {{ scope.row[item.prop]==1?"用户":"教练" }}
            </span>
            <span v-if="item.type===6">
              {{ scope.row[item.prop]==0?"待审核":scope.row[item.prop]===1?"通过":"驳回" }}
            </span>
            <span v-if="item.type===8">
              {{ scope.row[item.prop]==0?"未支付":"已支付" }}
            </span>
            <span v-if="item.type===10">
              {{ scope.row[item.prop]==0?"开启门店":"关闭门店" }}
            </span>
            <span v-if="item.type===9">
              {{ scope.row[item.prop]==0?"默认状态":scope.row[item.prop]===1?"订单已完成":scope.row[item.prop]===2?"订单已取消":"订单已退票" }}
            </span>
            <span v-if="item.type===11">
              {{ scope.row[item.prop]==0?"未到账":scope.row[item.prop]===1?"已到账":"到账异常" }}
            </span>
            <span v-if="item.type===12">
              {{ scope.row[item.prop]==0?"待审核":scope.row[item.prop]===1?"已审核":scope.row[item.prop]===2?"被驳回":"代理提现已撤销" }}
            </span>
            <span v-if="item.type===13">
              {{ scope.row[item.prop]==0?"未领取":scope.row[item.prop]===1?"领取":"已使用" }}
            </span>
            <span v-if="item.type===14">
              {{ scope.row[item.prop]==0?"未分发":"已分发" }}
            </span>
            <span v-if="item.type==15">

              {{ scope.row[item.prop]==0?"可售":scope.row[item.prop]===1?"已下架":"失效" }}
            </span>
            <span v-if="item.type===16">
              {{ scope.row[item.prop]==0?"退票审核中":scope.row[item.prop]===1?"退票成功":"退票驳回" }}
            </span>
            <span v-if="!item.type"> {{scope.row[item.prop]?scope.row[item.prop]:"..." }}</span>
          </div>
        </template>
      </el-table-column>

      <slot></slot>
    </el-table>
    <template>
      <div v-if="currentPage">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       class="pagination-box"
                       :current-page.sync="currentPage.current"
                       :page-sizes="[10, 20, 50, 100]"
                       :page-size="currentPage.size"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="currentPage.total">
        </el-pagination>
      </div>

    </template>

  </div>
</template>

  <script>
import moment from 'moment'
export default {
  name: 'Tablelist',
  props: ["column", "data", "currentPage"]   //通过props接收父组件传值
  ,
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      return moment(value).format("YYYY-MM-DD HH:mm:ss")
    }
  },

  methods: {
    handleSizeChange (val) {
      this.$emit("currentPagefn", "current", val)
    },
    handleCurrentChange (val) {
      this.$emit("currentPagefn", "size", val)
    }
  },

}
  </script>
<style lang="scss" scoped>
.pagination-box {
  margin-top: 20px;
}
</style>

