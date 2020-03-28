<template>
  <div id="goods_add" class="box">
    <p>添加商品</p>
    <!-- 表单—————————————————————————————————————————— -->
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="商品名称" prop="goodsname">
        <el-input v-model="form.goodsname"></el-input>
      </el-form-item>
      <el-form-item label="商品分类" prop="goodscategory">
        <el-select v-model="form.goodscategory" placeholder="请选择商品分类">
          <el-option label="数码产品" value="shuma"></el-option>
          <el-option label="书籍" value="books"></el-option>
          <el-option label="衣服" value="clothes"></el-option>
          <el-option label="包包" value="bag"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品特色" prop="goodsfeature">
        <el-checkbox-group v-model="form.goodsfeature">
          <el-checkbox label="美食/餐厅线上活动" name="goodsfeature"></el-checkbox>
          <el-checkbox label="地推活动" name="goodsfeature"></el-checkbox>
          <el-checkbox label="线下主题活动" name="goodsfeature"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="goodsfeature"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="商品图片" prop="imgUrl">
        <el-upload
          class="avatar-uploader"
          action='http://work.08321.org/sell/goods.php?a=uploadImg'
          :show-file-list="false"
          :on-success="Successupload"
          :before-upload="beforeUpload"
        >
          <img v-if="form.imgUrl" :src="form.imgUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="是否促销" prop="isPromotion">
        <el-radio v-model="form.isPromotion" label="1">促销</el-radio>
        <el-radio v-model="form.isPromotion" label="2">不促销</el-radio>
      </el-form-item>
      <el-form-item label="食品规格" prop="standard">
        <el-radio v-model="form.standard" label="1">单规格</el-radio>
        <el-radio v-model="form.standard" label="2">多规格</el-radio>
      </el-form-item>
      <el-form-item label="包装费" prop="packprice">
        <el-input-number v-model="form.packprice" @change="packChange" :min="0" :max="10"></el-input-number>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input-number v-model="form.price" @change="priceChange" :min="5" :max="50"></el-input-number>
      </el-form-item>

      <el-form-item label="商品描述" prop="goodsdesc">
        <el-input type="textarea" v-model="form.goodsdesc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="goods_add">添加</el-button>
      </el-form-item>
    </el-form>
    <!-- 表单—————————————————————————————————————————— -->
  </div>
</template>


<style scoped>
.el-main {
  height: 100%;
}
#goods_add form {
  padding: 12px 0;
}
#goods_add form .el-form-item {
  margin-bottom: 28px;
}
.el-input{
  width: 60%;
}
.avatar-uploader {
  border: 1px dashed #ccc;
  width: 200px;
  height: 200px;
  line-height: 200px;
  text-align: center;
}
.box form{
  width: 60%;
}
</style>

<script>
import qs from 'qs';

export default {
  data() {
    return {
      form: {
        goodsname: "",
        goodscategory: "",
        goodsfeature: [],
        imgUrl: "",
        isPromotion: "",
        standard: "",
        packprice: 0,
        price: 0,
        goodsdesc: ""
      },
      rules: {
        goodsname: [{ required: true, message: '请输入商品名称', trigger: 'blur' },{ min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }],
        goodscategory: [{ required: true, message: '请选择商品分类', trigger: 'change' }],
        goodsfeature:  [{ type: 'array', required: true, message: '请选择商品特色', trigger: 'change' }],
        imgUrl: [{required: true, message: '上传图片', trigger: 'change' }],
        isPromotion: [{required: true, message: '请选择是否促销', trigger: 'change' }],
        standard: [{ required: true, message: '请选择商品规格', trigger: 'change' }],
        packprice: [{ required: true, message: '请填写包装费', trigger: 'change' }],
        price: [{ required: true, message: '请填写商品价格', trigger: 'change' }],
        goodsdesc: [{ required: true, message: '请填写商品描述', trigger: 'blur' }]
      }
   };
  },
  methods: {
    //   包装费执行函数
    packChange() {

    },
    // 价格增减执行函数
    priceChange() {
      
    },
    //   上传图片时执行的函数
    Successupload(res) {
        this.form.imgUrl='http://work.08321.org'+res.data; //获取图片上传至服务器的地址
    },
    beforeUpload(file) {
       const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 1;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 1MB!');
        }
        return isJPG && isLt2M;
    },

    //   点击 ‘添加’按钮执行的函数
    goods_add() {
       this.$refs.form.validate((valid) => {
         var that=this;
         // 若前端验证成功，向服务器发数据
          if (valid) {
           var data={
             goodsname:this.form.goodsname,
             goodscategory:this.form.goodscategory,
             goodsfeature:this.form.goodsfeature.join(','),  //服务器不能存数组，要转为字符串
             imgUrl:this.form.imgUrl,
             isPromotion:this.form.isPromotion,
             standard:this.form.standard,
             packprice:this.form.packprice,
             price:this.form.price,
             goodsdesc:this.form.goodsdesc,
             };
           this.axios.post('http://work.08321.org/sell/goods.php?a=add',qs.stringify(data))
           .then(d=>{
             if(d.data.code==0){
            //  若添加成功，则执行
               that.$router.push('/index/goods_list')
               this.$message({
                 message:'添加成功',
                 type:'success'
               })
              //  否则执行
             }else{
               that.$message.error(d.data.msg);
             }
           });

          } else {
            return false;
          }
        });
      },
  }
};
</script>


 