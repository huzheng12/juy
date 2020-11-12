<!--
 * @Descripttion: 
 * @version: X3版本
 * @Author: 胡征
 * @Date: 2020-10-29 09:44:33
 * @LastEditors: huzheng
 * @LastEditTime: 2020-11-04 09:14:00
-->
<template>
  <div>

    <div v-show="type">
      <StoreManagementList></StoreManagementList>
    </div>

    <div v-show="!type">
      <Newstore :visible="newdata"
                :form="form">
      </Newstore>
    </div>

  </div>
</template>

<script>
import StoreManagementList from './index';
import { bus } from '@/utils/bus'
import Newstore from "./newGoods"

export default {
  name: "Typeindex",
  components: { StoreManagementList, Newstore },
  data () {
    return {
      type: true,
      newdata: {},
      form: {}
    }
  },
  mounted () {
    bus.$off("active")
    bus.$off("noo")
    bus.$on('active', (res, form) => {
      this.type = false
      this.newdata = res
      this.form = form
    })
    bus.$on('noo', () => {
      this.type = true
    })
  },
}
</script>

<style>
</style>