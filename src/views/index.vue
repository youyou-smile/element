<template>
  <div id="index">
    <el-container>
      <!-- aside侧边栏 -->
      <el-aside width="250px">
        <!-- logo外卖商家中心 -->
        <div class="logo">
          <img src="../assets/logo.jpg" alt />
        </div>
        <el-menu
          :default-active="this.$route.path"
          background-color="#304156"
          text-color="#fff"
          active-text-color="#409eff"
          router
        >
          <!-- 后台首页 -->
          <el-menu-item index="/index/home">
            <i class="el-icon-s-home"></i>
            <span slot="title">后台首页</span>
          </el-menu-item>

          <!-- 订单管理 -->
          <el-menu-item index="/index/order">
            <i class="el-icon-document"></i>
            <span slot="title">订单管理</span>
          </el-menu-item>

          <!-- 商品管理 -->
          <el-submenu index="/index/goods">
            <template slot="title">
              <i class="el-icon-sell"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/index/goods_list">商品列表</el-menu-item>
              <el-menu-item index="/index/goods_add">添加商品</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <!-- 店铺管理 -->
          <el-menu-item index="/index/shop">
            <i class="el-icon-s-shop"></i>
            <span slot="title">店铺管理</span>
          </el-menu-item>

          <!-- 账号管理 -->
          <el-submenu index="/index/admin">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>账号管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/index/admin_changepwd">修改密码</el-menu-item>
              <el-menu-item index="/index/admin_add">添加账号</el-menu-item>
              <el-menu-item index="/index/admin_list">账号列表</el-menu-item>
              <el-menu-item index="/index/admin_info">管理员信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <!-- 销售统计 -->
          <el-submenu index="/index/sale">
            <template slot="title">
              <i class="el-icon-pie-chart"></i>
              <span>销售统计</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/index/goods_num">商品统计</el-menu-item>
              <el-menu-item index="/index/order_num">订单统计</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 右侧主要内容部分 -->
      <el-main>
        <el-container>
          <!-- 头部 -->
          <el-header>
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item v-for="(v,i) in this.$route.meta" :key="i">{{v}}</el-breadcrumb-item>
            </el-breadcrumb>
            <!-- 右侧头像 下拉菜单 -->
            <el-dropdown>
              <span class="el-dropdown-link">
                欢迎您，{{account}}
                <img :src="imgUrl">
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><router-link to='/index/admin_info'>账户信息</router-link></el-dropdown-item>
                <el-dropdown-item><router-link to='/loginout'>退出登录</router-link></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-header>

          <!-- 显示二级路由组件 -->
          <el-main>
            <router-view />
          </el-main>
        </el-container>
      </el-main>
    </el-container>
  </div>
</template>

<style>
#index .el-aside{
  background-color: #304156
}
#index .logo > img {
  display: block;
  width: 100%;
}
/* 右侧主要内容 */
#index > .el-container > .el-main {
  background-color: #f0f2f5;
}
#index > .el-container > .el-main .el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  margin: 0 -20px;
  
}
#index .el-dropdown{
  height: 100%;
}
#index > .el-container > .el-main .el-header img {
  vertical-align: middle;
  height: 100%;
}
</style>

<script>
import qs from 'qs';

export default {
  data(){
    return{
      account:'',
      imgUrl:''
    }
  },
  beforeCreate(){
    var data={
      id:sessionStorage.getItem('id'),
      token:sessionStorage.getItem('token')
      }; //获取本地储存的各项数据
    this.axios.get('http://work.08321.org/sell/users.php?a=chklogin'+'&'+qs.stringify(data)).then(d=>{
      // 将数据传入服务器验证是否已登录，若没有登录
      if(d.data.code!=0){
        this.$router.push('/');  // 则跳转至登录页面
        this.$message.error('请登录后再操作'); //提示服务器返回信息
      }
    })
  },
  // 挂载成功时获取用户名、头像 渲染
  mounted(){
    this.account=JSON.parse(sessionStorage.getItem('user')).account;
    this.imgUrl=JSON.parse(sessionStorage.getItem('user')).imgUrl;
  },
  
};
</script>