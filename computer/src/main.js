// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import echarts from 'echarts'
import './plugins/elementUi.js'
import axios from 'axios'
// import './plugins/echarts.js'  //按需引入echarts

Vue.config.productionTip = false


axios.defaults.baseURL = 'http://localhost:8081/'
Vue.prototype.$http = axios
// 将echarts挂载到全局
Vue.prototype.$echarts=echarts;
// 导入全局样式表
import './assets/css/global.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
