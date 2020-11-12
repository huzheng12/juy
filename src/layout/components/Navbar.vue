
<template>
  <div class="navbar">
    <hamburger id="hamburger-container"
               :is-active="sidebar.opened"
               class="hamburger-container"
               @toggleClick="toggleSideBar" />

    <breadcrumb id="breadcrumb-container"
                class="breadcrumb-container" />
    <div class="right-menu">
      <el-dropdown>
        <span class="el-dropdown-link">
          <i class="el-icon-user-solid"></i> <span style="margin:0 0 0 10px">({{rolestatus}})</span>
          <!-- 下拉菜单<i class="el-icon-arrow-down el-icon--right"></i> -->
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="Changepasswordvisible=true">修改密码</el-dropdown-item>
          <el-dropdown-item @click.native="personalInformationVisible=true">个人信息</el-dropdown-item>
          <!-- <el-dropdown-item @click.native="modifypasswordvisible=true">修改个人信息</el-dropdown-item> -->
          <el-dropdown-item @click.native="BindingWechatVisible=true">绑定微信</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
          <!-- <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item> -->
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 修改登陆密码 -->
    <Changepassword @click="dialogVisibleflg"
                    :visible="Changepasswordvisible"></Changepassword>

    <!-- 个人信息 -->
    <Modelcomponent :Data="personalInformationData"
                    @Visibleflg="dialogVisibleflg"
                    :Visible="personalInformationVisible">
      <div style="width: 150px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);">
        <img src="../../assets/images/personalinformation.png"
             alt="">
        <div class="title-header">
          身份：运营方
        </div>
        <div class="title-header">
          账号：{{userInfo}}
        </div>
      </div>
    </Modelcomponent>
    <!-- 修改手机号码 -->

    <ModifyInformation @click="dialogVisibleflg"
                       :visible="modifypasswordvisible"></ModifyInformation>
    <!-- 绑定微信 -->
    <Modelcomponent :Data="BindingWechatData"
                    @Visibleflg="dialogVisibleflg"
                    :Visible="BindingWechatVisible">
      <div>
        <vue-qr style="position: relative;
                      left: 50%;
                      transform: translateX(-50%);"
                class="vueqr"
                :text="urlwx"
                :size="200"></vue-qr>
        <div class="vueqrtext">
          请使用微信扫描二维码绑定，只可以绑定一次，请确认绑定的微信无误
        </div>
      </div>
    </Modelcomponent>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Changepassword from './ChangePassword' //个人修改 model
import ModifyInformation from './modifyInformation'//个人修改 model
import Modelcomponent from '@/components/ModelComponent'
import querystring from 'querystring';
import vueQr from 'vue-qr'
import { getId } from '@/apis/agent/index'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    Changepassword,
    Modelcomponent,
    ModifyInformation,
    vueQr
  },

  computed: {
    ...mapGetters([
      'sidebar',
      'device',
    ]),

  },
  data () {
    return {
      userInfo: this.$store.state.userInfo,
      rolestatus: sessionStorage.rolestatus ? sessionStorage.rolestatus : "",
      Changepasswordvisible: false,        //model   修改密码 start
      modifypasswordvisible: false,        //model   修改密码 start
      personalInformationVisible: false,//model   个人信息 start
      personalInformationData: {
        title: "个人信息",
        name: "personalInformationVisible",

      },
      modifyInformationVisible: false,              //model   修改个人信息 start
      modifyInformationData: {
        title: "修改个人信息",
        name: "modifyInformationVisible",
        type: 1,
        okText: "提交",
      },
      changemodifyInformation: {
        a: "111",
        b: "",
        c: "",
        d: "",
      },                             //model   修改个人信息 end
      BindingWechatVisible: false,              //model   修改个人信息 start
      BindingWechatData: {
        title: "绑定微信",
        name: "BindingWechatVisible",
      },                           //model   修改个人信息 end
      urlwx: ""
    }
  },
  created () {
    this.getAuthorizeURL()

  },
  methods: {
    getAuthorizeURL () {
      getId().then(res => {
        var url = 'https://open.weixin.qq.com/connect/oauth2/authorize';
        var info = {
          appid: 'wxd368a3e849a03cf1',
          redirect_uri: "https://stage.backend.jy.lvyii.com/static",
          response_type: 'code',
          scope: 'snsapi_userinfo',
          state: res.obj,

        };
        console.log(info)
        this.urlwx = url + '?' + querystring.stringify(info) + '#wechat_redirect';
        console.log(this.urlwx)
      })
    },
    renderBindContent () {
      // let redirectUrl = 'http://fpfzc3.natappfree.cc/mp/agent/auth'
      // this.urlwx = this.getAuthorizeURL(redirectUrl)
      // let wechatUserInfo = this.state.wechatUserInfo

      // if (this.state.wechatUserInfo) {
      //   return (<div style={{ textAlign: 'center' }}>
      //     < img style={{ borderRadius: "50%" }} width={80} height={80} src={wechatUserInfo.headimgurl} alt="" />
      //     <div style={{ marginTop: 5, fontSize: 18 }}>{wechatUserInfo.nickname}</div>
      //     <div>
      //       微信绑定成功
      //   </div>
      //   </div>)
      // } else {
      //   return (<div style={{ textAlign: 'center' }}>
      //     <QRCode value={authUrl} size={200} />
      //     <div style={{ marginTop: 10, fontSize: 16, color: 'red' }}>
      //       请使用微信扫描二维码绑定，只可以绑定一次，请确认绑定的微信无误
      //   </div>
      //   </div>)
      // }
    },
    dialogVisibleflg (type, name, data) {
      if (type) { //确定按钮事件
        if (name === 'Changepasswordvisible') {  //修改登录密码
          const res = this.$api.personalhzapi.changePassword(data)
          res.then(item => {
            if (item === "0") {
              this.Changepasswordvisible = false
            } else {
              this.Changepasswordvisible = false
              this.$message({
                type: 'success',
                message: item.msg
              })
              this.$store.commit('USER_LOGIN_OUT')
              // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
              sessionStorage.removeItem('mapRoutes')
              sessionStorage.removeItem('route')
              sessionStorage.removeItem('title')
              location.reload()
            }
          })
        } else if (name === "modifypasswordvisible") {
          this.modifypasswordvisible = false
          this.$message({
            type: 'success',
            message: '修改信息成功'
          })
        }
        else {
          this[name] = false
        }
      } else {
        this[name] = false
      }
    },
    toggleSideBar () {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout () {   //退出登录
      try {
        const res = await this.$api.Account.logout()
        if (res.success) {
          this.$message({
            type: 'success',
            message: res.msg
          })
          // await this.$store.dispatch('user/logout')
          this.$store.commit('USER_LOGIN_OUT')
          // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
          sessionStorage.removeItem('mapRoutes')
          sessionStorage.removeItem('route')
          sessionStorage.removeItem('title')
          location.reload()
        } else {
          this.$store.commit('USER_LOGIN_OUT')
          // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
          sessionStorage.removeItem('mapRoutes')
          sessionStorage.removeItem('route')
          sessionStorage.removeItem('title')
          location.reload()
          this.$message({
            type: 'warning',
            message: res.msg
          })
        }
      } catch (e) {
        // Handle api request exception
        this.$handleError.handleApiRequestException(e)
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.title-header {
  line-height: 30px;
}
.vueqr {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
.vueqrtext {
  text-align: center;
  color: red;
}
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    margin-right: 50px;
    cursor: pointer;
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
