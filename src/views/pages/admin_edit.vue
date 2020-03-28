 <template>
  <div id="admin_edit" class="box">
    <p>修改账户</p>
    <!-- 表单 -->
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号">
        <el-input v-model="ruleForm.name" :disabled='ruleForm.edit'></el-input>
      </el-form-item>
      <el-form-item label="用户组">
        <el-select v-model="ruleForm.grounp" placeholder="请选择用户组">
          <el-option label="超级管理员" value="超级管理员"></el-option>
          <el-option label="部门管理员" value="部门管理员"></el-option>
          <el-option label="普通管理员" value="普通管理员"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">确认修改</el-button>
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
        grounp: "",
        id:'',
        edit:true
      },
    };
  },
  mounted(){
    //   接收路由传过来的id存入数据
    this.ruleForm.id=this.$route.params.id;
    // 通过id获取账号信息,将此id对应的用户名渲染到页面上
    this.axios.get('http://work.08321.org/sell/users.php?a=readOne&id='+this.ruleForm.id)
    .then(d=>{
        this.ruleForm.name=d.data.data.account;
    })
  },
  methods: {
    submitForm() {
        var data={
            account:this.ruleForm.name,
            userGroup:this.ruleForm.grounp,
            id:this.ruleForm.id
        };
        this.axios.post('http://work.08321.org/sell/users.php?a=edit',qs.stringify(data))
        .then(d=>{
            if(d.data.code==0){
                this.$message({
                    message:'修改成功',
                    type:'success'
                });
                this.$router.push('/index/admin_list')
            }else{
                this.$message.error(d.data.msg)
            }
        })
    },
  }
};
</script>