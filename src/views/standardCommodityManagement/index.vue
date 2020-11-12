<!--
 * @Descripttion: 标准商品（门票）管理
 * @version: X3版本
 * @Author: 胡征
 * @Date: 2020-09-23 11:11:06
 * @LastEditors: huzheng
 * @LastEditTime: 2020-10-26 15:24:45
-->
<template>
  <div class="store-information">

    <Conditionquery @clicksearch="clicksearch"
                    :inputdata='inputarr'
                    :modlebutdata='modlebutArr'
                    :picker="true"
                    :select="true"
                    :pickertype='1'
                    :options="options"
                    :selectvalue="selectvalue"
                    :butdata="butArr" />

    <Tablelist :column="column"
               :currentPage='currentPage'
               @currentPagefn="currentPagefn"
               :data="data">

      <el-table-column label="操作">
        <template slot-scope="scope">
          <span class="but-span"
                @click="handleEdit(scope.$index, scope.row,1)">
            修改
          </span>
          <el-divider direction="vertical"></el-divider>
          <span class="but-span"
                @click="handleEdit(scope.$index, scope.row,2)">
            删除
          </span>
          <el-divider direction="vertical"></el-divider>
          <span class="but-span"
                @click="handleEdit(scope.$index, scope.row,3)">
            上架
          </span>
          <el-divider direction="vertical"></el-divider>
          <span class="but-span"
                @click="handleEdit(scope.$index, scope.row,4)">
            下架
          </span>
        </template>
      </el-table-column>
    </Tablelist>

    <div v-if="this.establishgoods.visible">
      <Establishgoods :data="establishgoods"
                      @func="establishgoodsfunc" />
    </div>

    <Shelfgoods :data="shelfgoods"
                @func="shelfgoodsfunc" />
    <Deletegoods :data="delgoods"
                 @func="delgoodsfunc" />
    <Modifygoods :data="modifygoods"
                 @func="modifygoodsfunc" />
  </div>
</template>


<script>
import Conditionquery from '@/components/ConditionQuery'
import Tablelist from '@/components/TableList'
import Shelfgoods from './shelfgoods'
import Deletegoods from './Deletegoods'
import Modifygoods from './modifygoods'
import Establishgoods from './StandardCommoditydata'
import Fun from '@/utils/dataIntegration'
export default {
  name: 'StandardCommodityManagementList',
  components: { Conditionquery, Tablelist, Shelfgoods, Deletegoods, Modifygoods, Establishgoods },
  data () {
    return {
      shelfgoods: { visible: false, title: "上架商品", data: { name: '' }, loading: false },
      delgoods: { visible: false, loading: false, data: '' },
      modifygoods: {
        visible: false,
        loading: false,
        id: "",
        data: {
          goodsName: '', buseTime: "", agentPrice: "", goodsDesc: ""
        }
      },
      options: [{
        label: "0",
        value: '上架'
      }, {
        label: "1",
        value: '未上架'
      }],
      establishgoods: {//创建商品
        visible: false,
        loading: false,
        data: {
          goodsName: '', useTime: "30", agentPrice: "", goodsDesc: "", goodsImg: ""
        }, options: [{
          label: "30",
          value: '30分钟'
        }, {
          label: "60",
          value: '60分钟'
        }, {
          label: "90",
          value: '90分钟'
        }, {
          label: "240",
          value: '240分钟'
        }]
      },
      currentPage: {
        current: 1,
        size: 10,
        total: 400,
      },
      multipleSelection: [],
      inputarr: [
        {
          name: '商品名称',
          input: "",
          key: "goodsName"
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
      modlebutArr: [
        {
          name: '创建商品',
          icon: "el-icon-refresh-right",
          key: 1,
        }
      ],
      column: [
        {
          prop: "goodsName",
          label: "名称"
        },
        {
          prop: "useTime",
          label: "时长",
          type: 1,
        },
        {
          prop: "agentPrice",
          label: "价格",
          type: 7
        },
        {
          prop: "goodsDesc",
          label: "商品说明"
        },
        {
          prop: "createTime",
          label: "创建时间",
          type: 2
        },
        {
          prop: "updateTime",
          label: "上架时间",
          type: 2
        },
        {
          prop: "goodsStatus",
          label: "状态",
          type: 3
        },
      ],
      data: [],
      selectvalue: {
        pickervalue: [],
        selectvalue: "",
        selectvalueplaceholder: "全部"
      }
    }
  },
  created () {
    this.currentPage.total = this.data.length
    this.standardgoodsinfo()
  },

  methods: {
    standardgoodsinfo () {  //条件查询
      var params = Fun.searchData(this.inputarr, this.selectvalue, 'updateTime', 'goodsStatus')
      delete params.updateTime
      params.pageNum = this.currentPage.current
      params.pageSize = this.currentPage.size
      params.createTimeStart = this.selectvalue.pickervalue ? this.selectvalue.pickervalue[0] : ""
      params.createTimeEnd = this.selectvalue.pickervalue ? this.selectvalue.pickervalue[1] : ""
      const data = this.$api.personalhzapi.standardgoodsinfolis(params)
      data.then(res => {
        if (res.code === '100') {
          this.currentPage.total = res.obj.total
          this.data = res.obj.records
        }

      })
    },
    clicksearch (key) {   //but  key值来判断哪个按钮
      if (key === 0) { //搜索 
        this.currentPage.current = 1
        this.standardgoodsinfo()

      } else if (key === 1) { //
        this.establishgoods.visible = true
      }
    },
    handleEdit (index, row, type) {
      if (type === 1) {
        this.modifygoods.visible = true
        this.modifygoods.id = row.goodsNumber
        this.modifygoods.data = {
          goodsName: row.goodsName, buseTime: row.useTime, agentPrice: row.agentPrice / 100, goodsDesc: row.goodsDesc, goodsNumber: row.goodsNumber
        }
      } else if (type === 2) { //删除商品
        this.delgoods.visible = true
        this.delgoods.data = row.goodsNumber
      } else if (type === 3) { //上架商品
        this.shelfgoods.title = "上架商品"
        this.shelfgoods.visible = true
        this.shelfgoods.data = row
        this.shelfgoods.but = "上架"
      } else if (type === 4) { //下架商品
        this.shelfgoods.title = "下架商品"
        this.shelfgoods.visible = true
        this.shelfgoods.data = row
        this.shelfgoods.but = "下架"
      }
    },
    currentPagefn (name, data) {
      if (name === "size") {
        this.currentPage.current = data
        this.standardgoodsinfo()
      } else {
        this.currentPage.current = 1
        this.currentPage.size = data
        this.standardgoodsinfo()
      }
    },
    resMessage (_url, _id, type, pa) {

      this[type].loading = true
      var data
      if (pa) {
        data = this.$api.personalhzapi[_url](_id, pa)
      } else {
        data = this.$api.personalhzapi[_url](_id)
      }
      data.then(res => {
        if (res.code === '100') {
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'success'
          });
          this[type].loading = false
          this[type].visible = false
          this.standardgoodsinfo()
          if ("standardgoodsinfoadd" === _url) {

            this.establishgoods.data = {
              goodsName: '', useTime: "30", agentPrice: "", goodsDesc: ""
            }
          }
        }
      })
    },
    shelfgoodsfunc (type) {
      if (!type) return this.shelfgoods.visible = false
      // standardgoodsinfopull
      let _url = 'standardgoodsinfoput'
      if (this.shelfgoods.title !== "上架商品") {
        _url = "standardgoodsinfopull"
      }
      this.resMessage(_url, this.shelfgoods.data.goodsNumber, 'shelfgoods')
    },
    delgoodsfunc (type) { //删除
      if (!type) return this.delgoods.visible = false
      this.resMessage('standardgoodsinfo', this.delgoods.data, 'delgoods')
    },
    modifygoodsfunc (type) {
      if (!type) return this.modifygoods.visible = false
      this.resMessage('standardgoodsinfomodify', this.modifygoods.data, 'modifygoods', type)
    },
    establishgoodsfunc (type) { //创建商品
      if (type) {

        this.resMessage('standardgoodsinfoadd', this.establishgoods.data, 'establishgoods')
      }
      this.establishgoods.visible = false
    }
  }

}
</script>

<style>
.store-information {
  padding: 20px;
}
</style>