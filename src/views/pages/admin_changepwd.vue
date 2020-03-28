<template>
  <div id="admin_pwd" class="box">
    <p>修改密码</p>
    <!-- 表单 -->
    <el-form :model="admin_pwd" status-icon :rules="rules" ref="admin_pwd" label-width="100px">
      <el-form-item label="原密码" prop="oldPassword">
        <el-input type="password" v-model="admin_pwd.oldPassword"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input type="password" v-model="admin_pwd.newPassword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="checkPass">
        <el-input type="password" v-model="admin_pwd.checkPass" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style>
</style>

<script>
import qs from 'qs';

export default {
  data() {
    // 旧密码验证函数
    var validatePass1 = (rule, value, callback) => {
      if (this.admin_pwd.oldPassword === "") {
        callback(new Error("请输入原密码"));
      } else if (
        this.admin_pwd.oldPassword.length < 6 ||
        this.admin_pwd.oldPassword.length > 18
      ) {
        callback(new Error("请输入6-18位的密码"));
      } else {
        callback();
      }
    };
    // 新密码验证函数
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.admin_pwd.checkPass !== "") {
          this.$refs.admin_pwd.validateField("checkPass");
        }
        callback();
      }
    };
    // 新密码验证函数
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.admin_pwd.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      admin_pwd: {
        oldPassword: "",
        newPassword: "",
        checkPass: ""
      },
      rules: {
        newPassword: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        oldPassword: [{ validator: validatePass1, trigger: "blur" }]
      }
    };
  },
  methods: {
    validateField() {},
    // 提交按键事件函数
    submitForm() {
      this.$refs.admin_pwd.validate(valid => {
        if (valid) {
        // 若前端验证通过，发送用户输入信息至服务器验证
        var data={oldPassword:this.admin_pwd.oldPassword,newPassword:this.admin_pwd.newPassword,id:sessionStorage.getItem('id'),token:sessionStorage.getItem('token')};
        this.axios.post('http://work.08321.org/sell/users.php?a=chgpwd',qs.stringify(data)).then(d=>{
          if(d.data.code==0){
            this.$message({
              message:'修改成功',
              type:'success'
            });
            this.$router.push('/loginout')
          }else{
           this.$message.error(d.data.msg)
          }
        })
        } else {
          return false;
        }
      });
    },
    // 重置按钮函数
    resetForm() {
      this.$refs.admin_pwd.resetFields();
    }
  }
};
</script>