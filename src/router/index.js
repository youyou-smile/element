import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  routes:[
    { path: '/', component: () => import('../views/login.vue') },
    { path: '/loginout', component: () => import('../views/pages/loginout.vue')},
    {path: '/index', component: () => import('../views/index.vue'), children: [
        { path: '/index/goods_list', component: () => import('../views/pages/goods_list.vue'),meta:['商品管理','商品列表'] },
        { path: '/index/goods_edit/:id', component: () => import('../views/pages/goods_edit.vue'),meta:['商品管理','修改商品'] },
        { path: '/index/goods_add', component: () => import('../views/pages/goods_add.vue'),meta:['商品管理','添加商品'] },
        { path: '/index/admin_add', component: () => import('../views/pages/admin_add.vue'),meta:['账户管理','添加账号']},
        { path: '/index/admin_changepwd', component: () => import('../views/pages/admin_changepwd.vue'),meta:['账户管理','修改密码']},
        { path: '/index/admin_list', component: () => import('../views/pages/admin_list.vue'),meta:['账户管理','账号列表'] },
        { path: '/index/admin_info', component: () => import('../views/pages/admin_info.vue'),meta:['账户管理','账号信息'] },
        { path: '/index/order', component: () => import('../views/pages/order.vue'),meta:['订单管理'] },
        { path: '/index/home', component: () => import('../views/pages/home.vue')},
        { path: '/index/goods_num', component: () => import('../views/pages/goods_num.vue'),meta:['销售统计','商品统计']},
        { path: '/index/order_num', component: () => import('../views/pages/order_num.vue'),meta:['销售统计','订单统计']},
        { path: '/index/admin_edit/:id', component: () => import('../views/pages/admin_edit'),meta:['账户修改']},

      ]
    },
  
  ]
})
