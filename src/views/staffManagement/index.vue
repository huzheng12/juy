<template>
  <div class="store-information">

    <div class="header-btns">
      <el-button type="primary"
                 @click="showAdd = true">创建员工</el-button>
    </div>

    <TableHeader :option="headerProps"
                 @onSearch="onSearch"></TableHeader>
    <TableList :option="tableProps"
               :data="data"
               :page="page"
               @changePageSize="changePageSize"
               @changeCurrentPage="changeCurrentPage"
               @changeSelect="changeSelect">
      <template slot="btns"
                slot-scope="scope">
        <el-button type="danger"
                   @click="onDelete(scope.row.aempId)">解绑</el-button>
      </template>
    </TableList>

    <el-dialog title="创建员工"
               :visible.sync="showAdd"
               width="30%">
      <div class="centent-model-box"
           style="width: 60%;">
        <p style=" text-align: center;">
          员工扫描二维码绑定代理

        </p>
        <p style="dispaly=flex">
          <el-form ref="ruleForm"
                   label-width="100px"
                   class="demo-ruleForm">
            <el-form-item label="绑定门店"
                          prop="name">
              <el-select v-model="svalue"
                         @change="valueselect"
                         placeholder="请选择">
                <el-option v-for="item in soptions"
                           :key="item.shopId"
                           :label="item.shopName"
                           :value="item.shopId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <!-- <span>请选择需要绑定的门店：</span>
          <el-select v-model="svalue"
                     placeholder="请选择">
            <el-option v-for="item in soptions"
                       :key="item.shopId"
                       :label="item.shopName"
                       :value="item.shopId">
            </el-option>
          </el-select> -->
        </p>
        <vue-qr style="position: relative;
    left: 50%;
    transform: translateX(-50%)"
                ref="qr"
                class="vueqr"
                :text="userId"
                :size="200"></vue-qr>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="showAdd = false">取 消</el-button>
        <el-button type="primary"
                   @click="downloadQR">保存图片</el-button>
      </span>
    </el-dialog>

  </div>
</template>


<script>
import TableList from '@/layout/components/Table'
import TableHeader from '@/layout/components/Table/header'
// import { getId } from '@/apis/agent/index'
import { getList, unBind } from '@/apis/staff/index'
import { Base64 } from 'js-base64';


import vueQr from 'vue-qr'
export default {
  name: 'StaffManagementList',
  components: { TableList, TableHeader, vueQr },
  data () {
    return {
      svalue: "",
      soptions: [],
      page: {},
      tableProps: {
        column: [
          {
            prop: "aempId",
            label: "编号"
          },
          {
            prop: "trueName",
            label: "员工姓名"
          },
          {
            prop: "mobilePhone",
            label: "手机号"
          },
          {
            prop: "cardId",
            label: "身份证号"
          },
          {
            prop: "createTime",
            label: "注册时间",
            isTime: true,
            custom: true
          },
        ]
      },
      headerProps: [
        {
          prop: "trueName",
          type: "input",
          value: null,
          hint: "员工姓名",
        },
        {
          prop: "mobilePhone",
          type: "input",
          value: null,
          hint: "员工手机号",
        },
        {
          prop: "idCard",
          type: "input",
          value: null,
          hint: "身份证号",
        },
      ],
      data: [],
      showAdd: false,
      userId: ""
    }
  },
  computed: {
    decodeUserId () {
      return Base64.decode(this.userId)
    }
  },
  created () {
    this.shopGoodslistShopByAgentId()
  },
  mounted () {
    // getId().then(res => {
    //   var code = Base64.encode(123550 + "");
    //   this.userId = code;
    // });
    this.getList();
  },
  methods: {
    valueselect (e) {
     
      var code = Base64.encode(e + "");
      this.userId = code;
    },
    shopGoodslistShopByAgentId () {
      const data = this.$api.personalhzapi.shopGoodslistShopByAgentId()
      data.then(res => {
        if (res.code === '100') {
          if (res.obj[0]) {
            this.soptions = res.obj
            this.svalue = res.obj[0].shopId
            var code = Base64.encode(res.obj[0].shopId + "");
            this.userId = code;
          }
        }
      })
    },
    getList (params) {
      getList({
        pageSize: this.page.size || 10,
        pageNum: this.page.current || 1,
        ...(params || {}),
      }).then((res) => {
        this.data = res.obj.records;
        this.page.current = res.obj.current;
        this.page.size = res.obj.size;
        this.page.total = res.obj.total;
      });
    },
    onSearch (val) {
      if (val) {
        this.getList(val);
      }
    },
    onDelete (id) {
      this.$confirm("是否确认解绑", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        unBind({ aempId: id }).then(() => {
          this.$message({ message: "解绑成功", type: "success" });
          this.getList();
        });
      });
    },
    changePageSize (val) {
      this.pages.size = val;
      this.getList();
    },
    changeCurrentPage (val) {
      this.pages.current = val;
      this.getList();
    },
    changeSelect (val) {
      val = val.map(item => item.id)
      this.multipleSelect = val;
    },
    onAddSubmit (form) {
      console.log(form);
    },
    downloadQR () {
      let a = document.createElement('a');
      // 下载图名字
      a.download = "绑定代理"
      //url 
      a.href = this.$refs.qr.$el.src;
      //合成函数，执行下载 
      a.dispatchEvent(new MouseEvent('click'))
      this.showAdd = true
    },
  }

}
</script>

<style>
</style>