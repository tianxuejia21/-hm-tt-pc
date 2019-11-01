<template>
  <el-container class="container">
    <el-aside :width="isOpen?'200px':'64px'">
      <div class="logo"
           :class="{
          smallLogo:!isOpen
      }"></div>
      <el-menu :default-active="$route.path"
               background-color="#002033"
               text-color="#fff"
               active-text-color="#ffd04b"
               style="border-right:none"
               :collapse="!isOpen"
               :collapse-transition="false"
               router>
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/photo">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <!-- 头部图标 -->
        <span class="el-icon-s-fold icon"
              @click="toggle"></span>
        <!-- 头部文字 -->
        <span class="text">江苏传智播客科技教育有限公司</span>
        <el-dropdown class="dropdown"
                     @command='handclick'>
          <span class="el-dropdown-link">
            <img class="headIcon"
                 :src="userInfo.photo"
                 alt />
            <span class="userName">{{userInfo.name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting"
                              command='setting'>个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock"
                              command='logout'>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import local from '@/utils/local'
export default {
  data () {
    return {
      isOpen: true,
      userInfo: {}
    }
  },
  methods: {
    toggle () {
      this.isOpen = !this.isOpen
    },
    setting () {
      this.$router.push('/setting')
    },
    logout () {
      local.delUser()
      this.$router.push('/login')
    },
    handclick (command) {
      this[command]()
    }
  },
  created () {
    const user = local.getUser() || {}
    this.userInfo.name = user.name
    this.userInfo.photo = user.photo
  }
}
</script>

<style scoped lang='less'>
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  .el-aside {
    background-color: #002033;
    .logo {
      width: 100%;
      height: 60px;
      background: #002244 url(../../assets/logo_admin.png) no-repeat center /
        140px auto;
    }
    .smallLogo {
      background-image: url("../../assets/logo_admin_01.png");
      background-size: 36px auto;
    }
  }
  .el-header {
    line-height: 60px;
    border-bottom: 1px solid #ddd;
    .icon {
      font-size: 30px;
      vertical-align: middle;
    }
    .text {
      vertical-align: middle;
      margin-left: 10px;
    }
    .dropdown {
      float: right;
      .headIcon {
        display: inline-block;
        width: 30px;
        height: 30px;
        vertical-align: middle;
        margin: 0;
      }
      .userName {
        font-weight: bold;
        vertical-align: middle;
        margin-left: 5px;
      }
    }
  }
}
</style>
