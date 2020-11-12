<template>
  <div class="app-container">
    <el-autocomplete v-model="mapLocation.address"
                     :fetch-suggestions="querySearch"
                     placeholder="请输入详细地址"
                     style="width: 100%"
                     :trigger-on-focus="false"
                     @select="handleSelect" />
    <div style="margin: 5px">
      <baidu-map class="bm-view"
                 :center="mapCenter"
                 :zoom="mapZoom"
                 :scroll-wheel-zoom="true"
                 @click="getClickInfo"
                 ak="FDXhtzID1paCEnydtt2oSOsGotd9ALjS"
                 @ready="handlerBMap" />
    </div>
  </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import { bus } from '@/utils/bus'
export default {
  name: 'BaiduMapDemo',
  components: {
    BaiduMap
  },
  data () {
    return {
      mapZoom: 15,
      mapCenter: { lng: 0, lat: 0 },
      mapLocation: {
        address: undefined,
        coordinate: undefined
      }
    }
  },
  watch: {
    mapLocation: { //监听的对象
      deep: true, //深度监听设置为 true
      handler: function (newV) {
        bus.$emit("baidu", newV, this.mapCenter)
      }
    }
  },
  mounted () {
    this.$nextTick(function () {
      // DOM 现在更新了
      bus.$on('baidumapcener', (res) => {
        this.mapCenter.lng = res.shopLongitude
        this.mapCenter.lat = res.shopLatitude
        this.mapLocation.address = res.shopAddress
        this.makerCenter(this.mapCenter)
      })
    })


  },

  methods: {
    getClickInfo (e) {
      // 调整地图中心位置
      console.log(e)
      this.mapCenter.lng = e.point.lng
      this.mapCenter.lat = e.point.lat
      this.makerCenter(this.mapCenter)
      // 此时已经可以获取到BMap类
      if (this.BMap) {
        const that = this
        // Geocoder() 类进行地址解析
        // 创建地址解析器的实例
        const geoCoder = new this.BMap.Geocoder()
        // getLocation() 类--利用坐标获取地址的详细信息
        // getPoint() 类--获取位置对应的坐标
        geoCoder.getLocation(e.point, function (res) {
          that.mapLocation.address = res.address
          const addrComponent = res.addressComponents
          const surroundingPois = res.surroundingPois
          const province = addrComponent.province
          const city = addrComponent.city
          const district = addrComponent.district
          let addr = addrComponent.street
          if (surroundingPois.length > 0 && surroundingPois[0].title) {
            if (addr) {
              addr += `-${surroundingPois[0].title}`
            } else {
              addr += `${surroundingPois[0].title}`
            }
          } else {
            addr += addrComponent.streetNumber
          }
          that.choosedLocation = { province, city, district, addr, ...that.mapCenter }
        })
      }
    },
    handlerBMap ({ BMap, map }) {

      this.BMap = BMap
      this.map = map
      if (this.mapLocation.coordinate && this.mapLocation.coordinate.lng) {
        this.mapCenter.lng = this.mapLocation.coordinate.lng
        this.mapCenter.lat = this.mapLocation.coordinate.lat
        // this.mapZoom = 15
        map.addOverlay(new this.BMap.Marker(this.mapLocation.coordinate))
      } else {
        this.mapCenter.lng = 113.271429
        this.mapCenter.lat = 23.135336
        // this.mapZoom = 10
      }
    },
    querySearch (queryString, cb) {
      var that = this
      var myGeo = new this.BMap.Geocoder()
      myGeo.getPoint(queryString, function (point) {
        if (point) {
          that.mapLocation.coordinate = point
          that.makerCenter(point)
        } else {
          that.mapLocation.coordinate = null
        }
      }, this.locationCity)
      var options = {
        onSearchComplete: function (results) {
          if (local.getStatus() === 0) {
            // 判断状态是否正确
            var s = []
            for (var i = 0; i < results.getCurrentNumPois(); i++) {
              var x = results.getPoi(i)
              var item = { value: x.address + x.title, point: x.point }
              s.push(item)
              cb(s)
            }
          } else {
            cb()
          }
        }
      }
      var local = new this.BMap.LocalSearch(this.map, options)
      local.search(queryString)
    },
    handleSelect (item) {
      var { point } = item
      this.mapLocation.coordinate = point
      this.makerCenter(point)
    },
    makerCenter (point) {
      console.log(this.mapLocation)
      if (this.map) {
        this.map.clearOverlays()
        this.map.addOverlay(new this.BMap.Marker(point))
        this.mapCenter.lng = point.lng
        this.mapCenter.lat = point.lat
        // this.mapZoom = 15
      }
    }
  }
}
</script>

<style scoped>
.bm-view {
  width: 100%;
  height: 500px;
}
.app-container {
  padding: 0;
}
</style>