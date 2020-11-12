<template>
  <div class="app-container">
    <el-form ref="form" :model="formData" :rules="rules" label-width="90px">
      <template v-for="(item, key) in form">
        <el-form-item :label="item.label" :prop="item.prop" :key="key">
          <el-input
            v-if="item.type == 'input'"
            v-model="item.value"
            :placeholder="item.hint"
            :disabled="item.disabled"
            :show-password="item.password"
          ></el-input>

          <el-input
            v-if="item.type == 'textarea'"
            type="textarea"
            v-model="item.value"
            :placeholder="item.hint"
          ></el-input>

          <el-select
            v-if="item.type == 'select'"
            v-model="item.value"
            :placeholder="item.hint"
          >
            <el-option
              v-for="option in item.options"
              :key="option.key"
              :label="option.label"
              :value="option.value"
            ></el-option>
          </el-select>

          <el-switch
            v-if="item.type == 'switch'"
            v-model="item.value"
          ></el-switch>

          <template v-if="item.type == 'checkbox'">
            <el-checkbox-group v-model="item.value">
              <template v-for="(option, key) in item.options">
                <el-checkbox
                  :key="key"
                  :label="option.label"
                  name="type"
                ></el-checkbox>
              </template>
            </el-checkbox-group>
          </template>

          <template v-if="item.type == 'radio'">
            <el-radio-group v-model="item.value">
              <template v-for="(option, key) in item.options">
                <el-radio
                :key="key"
                :label="option.label"
              ></el-radio>
              </template>
            </el-radio-group>
          </template>

          <template v-if="item.custom">
            <slot :name="item.prop"></slot>
          </template>

          <template v-if="item.type == 'date'">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.start"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
            <el-col class="text-center" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker
                placeholder="选择时间"
                v-model="form.date2"
                style="width: 100%"
              ></el-time-picker>
            </el-col>
          </template>
        </el-form-item>
      </template>
      <el-form-item class="text-right">
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "TableForm",
  props: {
    form: {
      type: Array,
      default() {
        return [];
      },
    },
    rules: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    formData() {
      var obj = {};
      this.form.forEach((item) => {
        var label = item.prop;
        obj["" + label] = item.value;
      });
      return obj;
    },
  },
  methods: {
    onSubmit() {
      this.$refs['form'].validate((valid) => {
          if (valid) {
            this.$emit("onSubmit", this.formData);
          } else {
            return false;
          }
        });
      
    },
    onCancel() {
      this.$emit("onCancel");
    },
  },
};
</script>
<style lang="scss" scoped>
.text-center {
  text-align: center;
}
.text-right {
  text-align: right;
}
</style>
