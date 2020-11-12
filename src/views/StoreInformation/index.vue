<!--
 * @Descripttion: 
 * @version: X3版本
 * @Author: 胡征
 * @Date: 2020-09-23 11:11:06
 * @LastEditors: huzheng
 * @LastEditTime: 2020-10-26 09:30:20
-->
<template>
  <div class="store-information">
    <Conditionquery @clicksearch="clicksearch"
                    :inputdata='inputarr'
                    :modlebutdata='modlebutArr'
                    :butdata="butArr"></Conditionquery>
    <Tablelist :column="column"
               :data="data">
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span class="but-span"
                @click="handleEdit(scope.$index, scope.row)">
            解除上级
          </span>
        </template>
      </el-table-column>
    </Tablelist>
    <!--
               :before-close="
              handleClose"
              -->
    <el-dialog title="提示"
               :visible.sync="dialogVisible"
               width="30%">
      <span>这是一段信息</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>


<script>
import Conditionquery from '@/components/ConditionQuery'
import Tablelist from '@/components/TableList'
export default {
  name: 'Storeinformation',
  components: { Conditionquery, Tablelist },
  data () {
    return {
      dialogVisible: false,
      inputarr: [
        {
          name: '代理账号',
          input: "",
          key: ""

        },
        {
          name: '代理昵称',
          input: "",
          key: ""
        },
        {
          name: '代理人手机',
          input: "",
          key: ""
        },
        {
          name: '门店名称',
          input: "",
          key: ""
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
          name: '填写门店信息',
          icon: "el-icon-s-custom",
          key: 1,
          id: "information"
        },
        {
          name: '上传图片简介',
          icon: "el-icon-s-custom",
          key: 1,
          id: ""
        },
      ],
      column: [
        {
          prop: "date",
          label: "编号"
        },
        {
          prop: "name",
          label: "账号"
        },
        {
          prop: "address",
          label: "代理人昵称"
        },
        {
          prop: "address1",
          label: "手机号"
        },
        {
          prop: "address2",
          label: "门店地址"
        },
        {
          prop: "addres3s",
          label: "门店名称"
        },
        {
          prop: "address4",
          label: "注册时间",
        },
      ],
      data: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        address1: '1',
        address2: '2 1518 弄',
        addres3s: '3 1518 弄',
        address4: '4 1518 弄',
      }, {
        date: '2016-05-02',
        name: '大法师',
        address: '上海市普陀区金沙江路 1518 弄',
        address1: '1',
        address2: '2 1518 弄',
        addres3s: '3 1518 弄',
        address4: '4 1518 弄',
      }]
    }
  },
  methods: {
    clicksearch (data) {
      if (data === 'information') {
        this.dialogVisible = true
      }
    },
    handleEdit (index, row) {
      console.log(index, row);
    },
    // handleDelete (index, row) {
    //   console.log(index, row);
    // }
    // handleClose (done) {
    //   this.$confirm('确认关闭？')
    //     .then(_ => {
    //       done();
    //     })
    //     .catch(_ => { });
    // }
  }

}
</script>

<style>
.store-information {
  padding: 20px;
}
</style>