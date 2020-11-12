<template>
  <div class="app-container">
    <div class="header-container">
      <slot name="header" />

      <template v-for="(item, key) in option" >
        <el-input
          :key="key"
          class="wrapper"
          v-if="item.type == 'input'"
          v-model="item.value"
          :placeholder="item.hint"
        ></el-input>
        <el-select
          :key="key"
          class="wrapper"
          v-if="item.type == 'select'"
          v-model="item.value"
          :placeholder="item.hint"
        >
          <el-option
            v-for="option in item.options"
            :key="option.key"
            :label="option.label"
            :value="option.value"
          >
          </el-option>
        </el-select>

        <el-date-picker
          :key="key"
          class="wrapper"
          v-if="item.type == 'date'"
          v-model="item.value"
          type="date"
          :placeholder="item.hint"
        >
        </el-date-picker>
      </template>

      <el-button type="primary" icon="el-icon-search" @click="onSearch"
        >搜索</el-button
      >
      <!-- <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        @click="onAdd"
        >添加</el-button
      >
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        @click="batchDelete"
        >批量删除</el-button
      > -->
    </div>
  </div>
</template>

<script>
export default {
  name: "TableHeader",
  props: {
    option: {
      type: Array,
      default () {
        return [];
      },
    },
  },
  methods: {
    onSearch () {
      var obj = {};
      var arr = this.option.filter(function (item) {
        return (item.value != null && item.value != "");
      });
      arr.forEach(item => {
        var label = item.prop;
        obj["" + label] = item.value
      });
      this.$emit("onSearch", obj);
    }
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
  width: 200px;
  margin-right: 10px;
  margin-bottom: 10px;
}
.app-container {
  padding-bottom: 0;
}
</style>
