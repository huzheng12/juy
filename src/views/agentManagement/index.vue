<template>
  <div class="store-information">
    <div class="header-btns">
      <el-button type="primary" @click="showAdd = true">创建代理</el-button>
    </div>
    <TableHeader :option="headerProps" @onSearch="onSearch"></TableHeader>
    <TableList
      :option="tableProps"
      :data="data"
      :page="page"
      @changePageSize="changePageSize"
      @changeCurrentPage="changeCurrentPage"
      @changeSelect="changeSelect"
    >
      <template slot="btns" slot-scope="scope">
        <el-button type="primary" @click="onCharge(scope.row)">充值</el-button>
        <el-button @click="onEdit(scope.row)">编辑</el-button>
        <el-button type="danger" @click="onDelete(scope.row.id)"
          >删除</el-button
        >
      </template>
    </TableList>

    <el-dialog title="充值" :visible.sync="showCharge" width="30%">
      <TableForm
        :form="formCharge"
        @onSubmit="onChargeSubmit"
        @onCancel="showCharge = false"
      ></TableForm>
    </el-dialog>

    <el-dialog title="创建" :visible.sync="showAdd" width="30%">
      <div style="color: red">默认密码为"666666"，创建成功后请及时修改！</div>
      <TableForm
        :form="formAdd"
        :rules="addRules"
        @onSubmit="onAddSubmit"
        @onCancel="showAdd = false"
      ></TableForm>
    </el-dialog>

    <el-dialog title="编辑" :visible.sync="showEdit" width="30%">
      <TableForm
        :form="formEdit"
        @onSubmit="onEditSubmit"
        @onCancel="showEdit = false"
      ></TableForm>
    </el-dialog>
  </div>
</template>


<script>
import TableList from "@/layout/components/Table";
import TableHeader from "@/layout/components/Table/header";
import TableForm from "@/layout/components/Table/form";

import { getList, onAdd, onDelete, onEdit, recharge } from "@/apis/agent/index";

export default {
  name: "agentManagementList",
  components: { TableList, TableHeader, TableForm },
  data() {
    return {
      tableProps: {
        column: [
          {
            label: "账号",
            prop: "username",
          },
          {
            label: "真实姓名",
            prop: "name",
          },
          {
            label: "手机号",
            prop: "mobile",
          },
          {
            label: "身份证号",
            prop: "idCard",
          },
          {
            label: "创建时间",
            prop: "created",
          },
          {
            label: "备注信息",
            prop: "remark",
          },
        ],
      },
      headerProps: [
        {
          prop: "username",
          type: "input",
          value: null,
          hint: "账号",
        },
        {
          prop: "name",
          type: "input",
          value: null,
          hint: "代理姓名",
        },
        {
          prop: "mobile",
          type: "input",
          value: null,
          hint: "代理手机号",
        },
        {
          prop: "idCard",
          type: "input",
          value: null,
          hint: "身份证号",
        },
      ],
      formCharge: [
        {
          prop: "username",
          label: "充值账号",
          type: "input",
          value: null,
          disabled: true,
        },
        {
          prop: "name",
          label: "充值姓名",
          type: "input",
          value: null,
          disabled: true,
        },
        {
          prop: "rechargeAmount",
          label: "充值金额",
          type: "input",
          value: null,
        },
      ],
      formAdd: [
        {
          prop: "username",
          label: "用户账号",
          type: "input",
          value: null,
          hint: "输入用户账号",
        },
        {
          prop: "name",
          label: "用户姓名",
          type: "input",
          value: null,
          hint: "输入用户姓名",
        },
        {
          prop: "mobile",
          label: "手机号码",
          type: "input",
          value: null,
          hint: "输入手机号码",
        },
        {
          prop: "idCard",
          label: "身份证号",
          type: "input",
          value: null,
          hint: "输入身份证号",
        },
        {
          prop: "remark",
          label: "说明 (选填)",
          type: "textarea",
          value: null,
          hint: "可填写负责的地区门店及其他信息",
        },
      ],
      addRules: {
        username: { required: true, message: "请输入账号", trigger: "blur" },
        name: { required: true, message: "请输入姓名", trigger: "blur" },
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { pattern:/^1[3456789]\d{9}$/, message: "请输入正确的手机号", trigger: "blur" }
        ],
        idCard: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          { pattern:/(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/, message: "请输入正确的身份证号", trigger: "blur" }
        ],
      },
      formEdit: [],
      page: {},
      data: [],
      showCharge: false,
      showAdd: false,
      showEdit: false,
      id: ""
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList(params) {
      getList({
        pageSize: this.page.size || 10,
        pageNo: this.page.current || 1,
        organizationId: 11, // 代理部门ID
        ...(params || {}),
      }).then((res) => {
        this.data = res.obj.records;
        this.page.current = res.obj.current;
        this.page.size = res.obj.size;
        this.page.total = res.obj.total;
      });
    },
    onSearch(val) {
      this.getList(val);
    },
    changePageSize(val) {
      this.page.size = val;
       this.getList();
    },
    changeCurrentPage(val) {
      this.page.current = val;
      this.getList();
    },
    changeSelect(val) {
      val = val.map((item) => item.id);
      this.multipleSelect = val;
    },
    onChargeSubmit(form) {
      recharge({
        "agentNumber": this.id,
        "rechargeAmount": form.rechargeAmount
      }).then(() => {
        this.$message({ message: "充值成功", type: "success" });
        this.getList();
        this.showCharge = false;
      })
    },
    onDelete(id) {
      this.$confirm("是否确认删除", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        onDelete({ ids: id }).then(() => {
          this.$message({ message: "删除成功", type: "success" });
          this.getList();
        });
      });
    },
    onCharge(row) {
      this.formCharge[0].value = row.username;
      this.formCharge[1].value = row.name;
      this.id = row.id;

      this.showCharge = true;
    },
    onEdit(row) {
      this.formEdit = this.formAdd.filter((item) => item.prop != "username");
      this.formEdit.forEach((item) => {
        var label = item.prop;
        item.value = row["" + label];
      });
      this.id = row.id;
      this.showEdit = true;
    },
    onEditSubmit(form) {
      // 11为代理部门id
      form.departmentId = "11";
      // 29为代理权限
      form.roleIds = "29";
      form.id = this.id;
      onEdit(form).then(() => {
        this.$message({ message: "修改成功", type: "success" });
        this.getList();
      });
    },

    onAddSubmit(form) {
      // 11为代理部门id
      form.departmentId = "11";
      // 29为代理权限
      form.roleIds = "29";
      // 默认初始密码
      form.password = this.$md5.md5("666666")
      onAdd(form).then(() => {
        this.$message({ message: "创建成功", type: "success" });
        this.showAdd = false;
        this.getList();
      });
    },
  },
};
</script>

<style>
</style>