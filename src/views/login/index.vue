<template>
  <div class="containner">
    <el-card>
      <img src="../../assets/logo_index.png" width="200px" />
      <el-form ref="form" :model="form">
        <el-form-item ref="form" :model="loginform">
          <el-input v-model="loginform.moblie" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item ref="form" :model="loginform">
          <el-input
            v-model="loginform.code"
            placeholder="请输入验证码"
            style="width:235px;margin-right:10px"
          ></el-input>
          <el-button>发送验证码</el-button>
          <el-checkbox :value="true">我已阅读并同意协议和隐私条款</el-checkbox>
          <el-button type="primary" style="width:100%">发送验证码</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginform: {
        moblie: '',
        code: ''
      }
    }
  }
}
</script>

<style>
.containner {
  width: 100%;
  height: 100%;
  background: url("../../assets/login_bg.jpg") no-repeat center / cover;
  position: absolute;
  left: 0;
  top: 0;
}
.el-card {
  width: 400px;
  height: 370px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
img {
  display: block;
  margin: 0 auto 30px;
}
</style>
