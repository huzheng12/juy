<template>
  <div>
    <div class="header-btns">
      <el-button type="primary" @click="onAdd">导入设备</el-button>
      <el-button type="primary" @click="onBind" v-permission="['superAdmin']"
        >绑定代理</el-button
      >
      <el-button type="primary" @click="getList">刷新列表</el-button>
    </div>

    <!-- <TableHeader :option="headerProps" @onSearch="onSearch"></TableHeader> -->
    <TableList
      :option="tableProps"
      :data="data"
      :page="page"
      @changePageSize="changePageSize"
      @changeCurrentPage="changeCurrentPage"
      @changeSelect="changeSelect"
    >
      <template slot="status" slot-scope="scope">
        {{scope.row.status == 1 ? "已绑定" : "未绑定"}}
      </template>
      <template slot="btns" slot-scope="scope">
        <el-button type="danger" @click="onDelete(scope.row.deviceId)"
          >解绑</el-button
        >
      </template>
    </TableList>

    <el-dialog title="导入设备" :visible.sync="showAdd" width="30%">
      <TableForm
        :form="formAdd"
        :rules="rulesAdd"
        @onSubmit="onAddSubmit"
        @onCancel="onAddCancel"
      ></TableForm>
    </el-dialog>

    <el-dialog title="绑定代理" :visible.sync="showBind" width="30%">
      <BindAgent
        @onCancel="showBind = false"
        @onSubmit="onBindSubmit"
        @changeSelect="selectAgent"
      ></BindAgent>
    </el-dialog>
  </div>
</template>

<script>
import TableList from "@/layout/components/Table";
// import TableHeader from "@/layout/components/Table/header";
import TableForm from "@/layout/components/Table/form";
import { getList, onAdd, onCancelBind, onBindAgent } from "@/apis/device/index";
import BindAgent from "./bindAgent";

export default {
  components: {
    TableList,
    // TableHeader,
    TableForm,
    BindAgent,
  },
  data() {
    return {
      tableProps: {
        column: [
          {
            label: "编号",
            prop: "deviceId",
          },
          {
            label: "设备编号",
            prop: "deviceNumber",
          },
          {
            label: "设备名称",
            prop: "deviceName",
          },
          {
            label: "代理账号",
            prop: "agentNumber",
          },
          {
            label: "代理姓名",
            prop: "agentName",
          },
          {
            label: "上线时间",
            prop: "createTime",
          },
          {
            label: "最后使用时间",
            prop: "updateTime",
          },
          {
            label: "状态",
            prop: "status",
            custom: true
          },
        ],
      },
      headerProps: [
        {
          prop: "deviceId",
          type: "input",
          value: null,
          hint: "设备编号",
        },
        {
          prop: "agentNumber",
          type: "input",
          value: null,
          hint: "代理人账号",
        },
        {
          prop: "deviceName",
          type: "input",
          value: null,
          hint: "类型",
        },
        {
          prop: "address",
          type: "input",
          value: null,
          hint: "门店地址",
        },
        {
          prop: "createTime",
          type: "date",
          value: null,
          hint: "请选择时间",
        },
        {
          prop: "status",
          type: "select",
          value: null,
          hint: "请选择状态",
        },
      ],
      data: [],
      page: {},
      multipleSelect: [],
      showAdd: false,
      formAdd: [
        {
          prop: "deviceName",
          type: "input",
          label: "设备名称",
          hint: "输入设备名称",
          value: null,
        },
        {
          prop: "deviceNumber",
          label: "设备编号",
          type: "input",
          hint: "输入设备编号",
          value: null,
        },
      ],
      rulesAdd:{
        deviceName: { required: true, message: '请输入设备名称', trigger: 'blur' },
        deviceId: { required: true, message: '请输入设备编号', trigger: 'blur' },
      },
      showBind: false,
      multipleSelectAgent: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList(params) {
      getList({
        pageSize: this.page.size || 10,
        pageNum: this.page.current || 1,
        ...params,
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
    onCancelBind(id) {
      onCancelBind({
        deviceId: id,
      }).then(() => {
        this.$message({
          message: "重置成功",
          type: "success",
        });
        this.getList();
      });
    },
    onDelete(val) {
      this.$confirm("是否确认解绑", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        onCancelBind({
          deviceId: val,
        }).then(() => {
          this.$message({
            message: "解绑成功",
            type: "success",
          });
          this.getList();
        });
      });
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
      val = val.map((item) => item.deviceId);
      this.multipleSelect = val;
    },

    onAdd() {
      this.showAdd = true;
    },
    onAddSubmit(form) {
      form.type = 1;
      if (this.$store.state.permission.roles.indexOf('agent') > -1) {
        form.agentNumber = this.$store.state.permission.agentId
      }
      onAdd(form).then(() => {
        this.$message({
          message: "导入成功",
          type: "success",
        });
        this.showAdd = false;
        this.getList();
      });
    },
    onAddCancel() {
      this.showAdd = false;
    },
    onBind() {
      if (this.multipleSelect.length === 0) {
        return this.$message({
          message: "请选择要绑定的设备",
          type: "warning",
        });
      }
      this.showBind = true;
    },
    onBindSubmit() {
      if (this.multipleSelectAgent.length === 0) {
        return this.$message({
          message: "请选择要绑定的代理",
          type: "warning",
        });
      }
      onBindAgent({
        deviceId: this.multipleSelect[0],
        agentNumber: this.multipleSelectAgent[0],
      }).then(() => {
        this.$message({
          message: "绑定成功",
          type: "success",
        });
        this.showBind = false;
        this.getList();
      });
    },
    selectAgent(val) {
      this.multipleSelectAgent = val;
    },
  },
};
</script>
