<template>
  <div class="app-container">
    <div class="flex">
      <el-input
        class="pd-b-xs"
        v-model="searchText"
        placeholder="搜索名字、账号、身份证"
        @change="onSearchBind"
      >
        <i class="el-icon-search el-input__icon" slot="prefix"> </i>
      </el-input>
      <el-select v-model="type" placeholder="默认账号搜索">
        <el-option
          v-for="option in searchType"
          :key="option.key"
          :label="option.label"
          :value="option.value"
        ></el-option>
      </el-select>
    </div>

    <TableList
      :option="tableProps"
      :data="agentList"
      :page="page"
      :btns="false"
      @changePageSize="handleSizeChange"
      @changeCurrentPage="handleCurrentChange"
      @changeSelect="handleSelectionChange"
    >
    </TableList>
    <div class="text-right">
      <el-button @click="onCancel">取消</el-button>
      <el-button type="primary" @click="onSubmit">确定</el-button>
    </div>
  </div>
</template>

<script>
import TableList from "@/layout/components/Table";
import { getList } from "@/apis/agent/index";
export default {
  name: "BindAgent",
  components: {
    TableList,
  },
  data() {
    return {
      tableProps: {
        column: [
          {
            label: "账号",
            prop: "username",
          },
          {
            label: "姓名",
            prop: "name",
          },
          {
            label: "身份证号",
            prop: "idCard",
          },
        ],
      },
      searchType: [
        {
          label: "账号",
          value: "username",
        },
        {
          label: "姓名",
          value: "name",
        },
        {
          label: "身份证号",
          value: "idCard",
        },
      ],
      searchText: "",
      agentList: [],
      page: {},
      multipleSelect: [],
      type: "",
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
        organizationId: 11,
        ...params,
      }).then((res) => {
        this.agentList = res.obj.records;
        this.page.current = res.obj.current;
        this.page.size = res.obj.size;
        this.page.total = res.obj.total;
      });
    },
    handleSelectionChange(val) {
      val = val.map((item) => item.id);
      this.$emit("changeSelect", val);
    },
    handleSizeChange(val) {
      this.page.size = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.page.current = val;
      this.getList();
    },
    onCancel() {
      this.$emit("onCancel");
    },
    onSearchBind() {
      var name = "" + this.type || "username";
      var params = {};
      params["" + name] = this.searchText;
      this.getList(params);
    },
    onSubmit() {
      this.$emit("onSubmit");
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
