<template>
  <div class="loginForm">
    <el-form ref="form" :model="form" :rules="rules">
      <h3>系统登录</h3>
      <el-form-item prop="account">
        <el-input prefix-icon="el-icon-user-solid" v-model="form.account"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input prefix-icon="el-icon-lock" show-password v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<!-- 脚本———————————————————————————————————————————————————————————— -->
<script>
import qs from "qs";

export default {
  data() {
    return {
      form: { account: "", password: "" },
      rules: {
        account: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 18, message: "长度在 6 到 18 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        // 如果前端验证通过，则发送用户输入信息至后端进行验证
        if (valid) {
          var data={account:this.form.account,password:this.form.password}; //保存用户输入信息保存为对象
          this.axios .post('http://work.08321.org/sell/users.php?a=login',qs.stringify(data)).then(d => {
              // 若后端返回code为0则表示成功登录
              if (d.data.code == 0) {
                sessionStorage.setItem('user',JSON.stringify(d.data.data));  //登录成功，则将用户信息存在本地，以便其他地方使用
                sessionStorage.setItem('token',d.data.token);
                sessionStorage.setItem('id',d.data.data.id);
                this.$router.push("/index/home");
              }else{
                // 否则提示服务器返回信息
                 this.$message.error(d.data.msg);
              }
            });
        }
      });
    }
  }
};
</script>
<!--样式——————————————————————————————————————————————————————————————— -->
<style scoped>
.loginForm {
  height: 100%;
  background-color: #2d3a4b;
  display: flex;
  align-items: center;
}
form {
  width: 40%;
  margin: auto;
}
.loginForm > .el-form > h3 {
  font: 2em/120px 微软雅黑;
  color: #e5e6e7;
}
.el-button--primary {
  width: 100%;
}
</style>