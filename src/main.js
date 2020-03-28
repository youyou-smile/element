import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/reset.css'
import echarts from 'echarts' //引入echarts
import axios from 'axios'; 

Vue.prototype.$echarts=echarts; //引入echarts组件
Vue.prototype.axios=axios;
Vue.use(ElementUI);
Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

