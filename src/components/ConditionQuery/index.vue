<!--
 * @Descripttion: 
 * @version: X3版本
 * @Author: 胡征
 * @Date: 2020-09-23 11:12:15
 * @LastEditors: huzheng
 * @LastEditTime: 2020-11-10 19:14:31
-->
<template>
  <div>
    <div class="header_box">
      <!-- header model  弹框  start -->
      <div class="one-list"
           v-if="modlebutdata">
        <el-button v-for="item of modlebutdata"
                   :key="item.value"
                   @click="clicks(item)"
                   type="primary"><i :class="item.icon"></i> {{item.name}}</el-button>
      </div>
      <!-- header model  弹框  end -->
    </div>
    <div class="conditional-search">
      <el-input class="input-search"
                v-model="item.input"
                v-for="item of inputdata"
                :key="item.value"
                :placeholder="item.name"></el-input>

      <!-- 日期选择器  start -->
      <div v-if="picker&&pickertype!==1"
           style=" display: inline-block;">
        <!-- value-format="yyyy-MM-dd" -->
        <el-date-picker class="input-search"
                        format="yyyy-MM-dd"
                        v-model="selectvalue.pickervalue"
                        type="date"
                        placeholder="选择日期">
        </el-date-picker>
      </div>
      <div v-if="pickertype===1"
           style=" display: inline-block;margin-right: 20px;">
        <el-date-picker v-model="selectvalue.pickervalue"
                        type="datetimerange"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
        </el-date-picker>
      </div>

      <!-- 日期选择器  end -->
      <!-- 选择器  start -->
      <div v-if="select"
           style="display: inline-block;">
        <el-select clearable
                   v-model="selectvalue.selectvalue"
                   class="input-search"
                   :placeholder="selectvalue.selectvalueplaceholder?selectvalue.selectvalueplaceholder:'所有状态'">
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.value"
                     :value="item.label">
          </el-option>
        </el-select>
      </div>
      <!-- 选择器  end  -->
      <el-button v-for="item of butdata"
                 :key="item.value"
                 type="primary"
                 @click="clicks(item)"> <i :class="item.icon"></i> {{item.name}}</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Conditionquery',
  data () {
    return {
      // selectvalue: {
      //   pickervalue: "",
      //   selectvalue: ""
      // }
    }
  },
  props: {   //通过props接收父组件传值
    inputdata: {
      name: [],
      default: Array
    },
    butdata: {
      name: [],
      default: Array
    },
    modlebutdata: {
      name: [],
      default: Array
    },
    options: {
      name: [],
      default: Array
    },
    picker: {
      name: false,
      default: Boolean
    },
    select: {
      name: false,
      default: Boolean
    },
    pickertype: {
      name: 0,
      default: Number
    },
    selectvalue: {
      name: {
        pickervalue: "",
        selectvalue: ""
      },
      default: Object
    }
  },
  methods: {
    clicks (e) {
      this.$emit('clicksearch', e.key) //点击确定传值给父组件
    }
  }
}
</script>

<style lang="scss" scoped>
.conditional-search {
  margin: 20px 0;
}
.input-search {
  width: 200px;
  margin-right: 20px;
  margin-bottom: 10px;
}
</style>
