 <template>
  <div id="admin_add" class="box">
    <p>添加账户</p>
    <!-- 表单 -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input v-model="ruleForm.pwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="用户组" prop="grounp">
        <el-select v-model="ruleForm.grounp" placeholder="请选择用户组">
          <el-option label="超级管理员" value="超级管理员"></el-option>
          <el-option label="部门管理员" value="部门管理员"></el-option>
          <el-option label="普通管理员" value="普通管理员"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">添加</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import qs from "qs"; //引入qs模块

export default {
  data() {
    return {
      ruleForm: {
        name: "",
        pwd: "",
        grounp: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" }
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 18, message: "长度在 6 到 18 个字符", trigger: "blur" }
        ],
        grounp: [{ required: true, message: "请选择账户组", trigger: "change" }]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // 如果验证通过，将用户输入信息发送到服务器
          var data = {
            account: this.ruleForm.name,
            password: this.ruleForm.pwd,
            userGroup: this.ruleForm.grounp
          }; //获取用户输入信息
          //  利用axios向服务器发送用户输入信息,用qs模块将数据转成仿form数据
          this.axios.post("http://work.08321.org/sell/users.php?a=add",qs.stringify(data)).then(info => {
            // 若服务端返回数据的code值为0，则表示添加成功，向用户提示成功信息
              if (info.data.code == 0) {
                this.$message({
                  message: info.data.msg,
                  type: "success"
                });
                // 否则提示错误信息
              }else{
                this.$message.error(info.data.msg);
              }
            });
            // 验证失败则提示错误信息
        } else {
              this.$message.error('请输入正确信息再提交');
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>