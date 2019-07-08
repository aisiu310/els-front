// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import iView from 'iview'
import vueResource from 'vue-resource'

// import router from './router'git
import router from './router/zxy-test'
import './bus'
// import router from './router/finance'
// import router from './router/zxy-test'
import 'iview/dist/styles/iview.css'
import axios from 'axios'
import echarts from 'echarts' //引入echarts
import echartsgl from 'echarts-gl'


Vue.use(iView)
Vue.use(vueResource)
Vue.prototype.$echarts = echarts //引入组件
Vue.prototype.$echartsGL = echartsgl //引入组件
Vue.prototype.$axios = axios//全局注册，使用方法为:this.$axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

new Vue({
  data:{
      ItemTitle:"车辆管理",
      type:String
  },
})
