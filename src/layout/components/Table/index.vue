<template>
  <div class="app-container">
    <div class="content-container">
      <el-table
        ref="filterTable"
        :data="data"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />

        <template v-for="(item, key) in option.column">
          <el-table-column
            v-if="!item.custom"
            :key="key"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :sortable="item.sort"
          />
          <!-- 自定义 -->
          <el-table-column
            v-else
            :key="key"
            :label="item.label"
            :width="item.width"
            :sortable="item.sort"
          >
            <template v-if="!item.isTime" scope="scope">
              <slot :name="item.prop" :$index="scope.$index" :row="scope.row" />
            </template>
            <template v-else scope="scope">
              {{ parseTime(scope.row[""+ item.prop]) }}
            </template>
          </el-table-column>
        </template>

        <!-- 操作 -->
        <el-table-column v-if="btns" label="操作" width="300">
          <template scope="scope">
            <slot name="btns" :row="scope.row" />
          </template>
        </el-table-column>
      </el-table>

      <div class="block" style="padding: 20px 0">
        <el-pagination
          :page-sizes="[10, 20, 30, 50, 100]"
          :page-size="page.size"
          :current-page.sync="page.current"
          :total="page.total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TableList",
  props: {
    option: {
      type: Object,
      default() {
        return [];
      },
    },
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    page: {
      type: Object,
      default() {
        return {
          current: 1,
          size: 10,
          total: 1,
        };
      },
    },
    btns: {
      type: Boolean,
      default() {
        return true;
      },
    },
  },
  methods: {
    handleSelectionChange(val) {
      // var multipleSelect = val.map(item => item.id)
      this.$emit("changeSelect", val);
    },
    handleSizeChange(val) {
      this.$emit("changePageSize", val);
    },
    handleCurrentChange(val) {
      this.$emit("changeCurrentPage", val);
    },
    parseTime(time) {
      return this.$util.parseTime(time);
    }
  },
};
</script>
<style lang="scss" scoped>
img {
  width: 100%;
}
.header-container .header-item {
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 10px;
}
</style>
