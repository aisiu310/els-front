import Vue from 'vue'
import App from './App'
import iView from 'iview'
import vueResource from 'vue-resource'

import router from './router/index'
//import router from './router/zxy-test'
// import router from './router/finance'

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

