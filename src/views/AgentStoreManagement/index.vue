<!--
 * @Descripttion: 
 * @version: X3版本
 * @Author: 胡征
 * @Date: 2020-10-29 09:44:33
 * @LastEditors: huzheng
 * @LastEditTime: 2020-11-04 09:11:33
-->
<template>
  <div>
    <div v-show="type">
      <StoreManag></StoreManag>
    </div>

    <div v-show="!type">
      <Newstore :visible="newdata"
                :form="form">
      </Newstore>
    </div>

  </div>
</template>

<script>
import StoreManag from './newStoretype';

import { bus } from '@/utils/bus'
import Newstore from "./newStore"

export default {
  name: "Typeindex",
  components: { StoreManag, Newstore },
  data () {
    return {
      type: true,
      newdata: {
        dialogFormVisible: false,
        fileList: [],
        time: [new Date(2016, 9, 10, 6, 0), new Date(2016, 9, 10, 23, 0)],
      },
      form: {
        shopName: '',
        shopIntroduction: '',
        shopLabel: '',
        businessStart: '',
        businessEnd: "",
        shopLongitude: '',
        shopLatitude: '',
        shopAddress: '',
        shopTelephone: "",
        shopImg: ""
      }
    }
  },

  mounted () {
    bus.$off('baiduactive');
    bus.$on('baiduactive', (res, form) => {
      this.type = false
      this.newdata = res
      this.form = form
    })
    bus.$off('baidunoo');
    bus.$on('baidunoo', () => {
      this.type = true
    })
  },
}
</script>

<style>
</style>