<template>
    <div id="admin_info" class="box">
        <p>管理员信息</p>
        <p>管理员ID：{{id}}</p>
        <p>账号：{{account}}</p>
        <p>用户组：{{userGroup}}</p>
        <p>创建时间：{{ctime}}</p>
        <p>管理员头像：
            <el-upload class="avatar-uploader" action="http://work.08321.org/sell/goods.php?a=uploadImg" :show-file-list="false" :on-success="upload" :before-upload="beforeUpload">
                <img v-if="imgUrl" :src="imgUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </p>
    </div>
</template>

<style>
    p:not(:first-child){
       font: 14px/4em 微软雅黑;
    }
    p:last-child{
        padding:20px 0;
        align-items: center;
        display: flex;
    }
    /* 头像部分样式 */
   #admin_info .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  #admin_info .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  #admin_info .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
 #admin_info .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
 
</style>

<script>
import qs from 'qs';

export default {
    data(){
        return{
            id:'',
            account:'',
            userGroup:'',
            ctime:'',
            imgUrl:''

        }
    },
    // 页面创建成功时将数据渲染出来
    created(){
        this.id=sessionStorage.getItem('id');
        this.account=JSON.parse(sessionStorage.getItem('user')).account;
        this.userGroup=JSON.parse(sessionStorage.getItem('user')).userGroup;
        this.ctime=JSON.parse(sessionStorage.getItem('user')).ctime;
        this.imgUrl=JSON.parse(sessionStorage.getItem('user')).imgUrl;

    },
    methods: {
        // 头像上传成功执行函数
        upload(res) {
            this.imgUrl='http://work.08321.org'+res.data; //获取图片上传至服务器的地址
            // 将地址通过axios发送给服务器
            this.axios.post('http://work.08321.org/sell/users.php?a=chgImg',qs.stringify({id:this.id,imgUrl:this.imgUrl}))
        },
        beforeUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt1M = file.size / 1024 / 1024 < 1;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt1M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt1M;
        }
    }
}
</script>