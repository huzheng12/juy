<!--
 * @name: 
 * @author: SunSeekerX
 * @Date: 2020-07-13 17:34:03
 * @LastEditors: huzheng
 * @LastEditTime: 2020-11-12 17:04:37
-->

// VUE_APP_BASE_API = http://192.168.1.114:8087/
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    this.$store.commit('GET_APP_STORAGE')
    // this.$api.SiteConfiguration.infolist().then(res=>{
    //     if(res.success){aaaaaaaaa
    //       if(res.obj.configList&&res.obj.configList.length>0){
    //         res.obj.configList.forEach(item=>{
    //           if(item.configkey=='managerName'){
    //             this.$store.commit('GET_SITE_TITLE',item.value)
    //           }
    //           if(item.configkey=='managerSysLogo'){
    //             this.$store.commit('GET_SITE_ICON',item.value)
    //           }
    //         })
    //       }
    //     }else{
    //       this.$message({
    //         type:'warning',
    //         message:'获取站点信息失败'
    //       })
    //     }
    // })
  },
  created () {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("roles")) {
      this.$store.dispatch("setRoles", JSON.parse(sessionStorage.getItem("roles")))
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("roles", JSON.stringify(this.$store.state.permission.roles || []))
    })
  }
}
</script>
<style>
.header-btns {
  padding: 20px 0 0 20px;
}
</style>