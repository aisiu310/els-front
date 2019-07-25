import Vue from 'vue'
import App from './App'
import iView from 'iview'
import store from './store/index'
import vueResource from 'vue-resource'
// import 'iview/dist/styles/iview.css'
import '../my-theme/dist/iview.css';
// invoke baidu map api
import BaiduMap from 'vue-baidu-map'
// import baidu map aky
Vue.use(BaiduMap, {
  ak: "GBMI8DT2X6mXqHi7fDXc1f1pGABmeg2M"
})

import router from './router/index'
import '@/permission.js'

import qs from 'qs'
Vue.prototype.$qs = qs

import echarts from 'echarts' //引入echarts
Vue.prototype.$echarts = echarts //引入组件,作为全局变量

import echartsgl from 'echarts-gl'
Vue.prototype.$echartsGL = echartsgl //引入组件,作为全局变量

import axios from 'axios'
Vue.prototype.$axios = axios //全局注册，使用方法为:this.$axios

Vue.prototype.$store = store
// axios.defaults.headers.post['Content-Type'] = 'text/plain'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded' // 配置请求头（推荐）

Vue.use(iView)
Vue.use(vueResource)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
// request攔截器
// axios.interceptors.request.use(config => {
//   if (store.state.login.token) {
//     // alert('token存在')
//     config.headers['Content-Type'] = 'text/plain' // 关键所在
//     // config.headers.common['post-Token'] = store.state.token
//   }
//   return config;
// })
//respone拦截器
// axios.interceptors.response.use(
//   response => {
//     return response;
//   },
//   error => { //默认除了2XX之外都为错误
//     if (error.response) {
//       switch (error.response.status) {
//         case 401:
//           this.$store.commit('delToken');
//           router.replace({ //跳转到登录页面
//             path: '/login',
//             query: {
//               redirect: router.currentRoute.fullPath
//             } // 将跳转的路由path作为参数，登录成功后跳转到该路由
//           });
//       }
//     }
//     return Promise.reject(error.response);
//   }
// )
