import Vue from 'vue'
import App from './App'
import iView from 'iview'
import vueResource from 'vue-resource'
import 'iview/dist/styles/iview.css'

// import router from './router'
// import router from './router/zxy-test'
// import router from './router/finance'

import router from './router/zxy-test'
// import router from './router/finance'

import 'iview/dist/styles/iview.css'

// import router from './router'
// import router from './router/finance'


import echarts from 'echarts' //引入echarts
Vue.prototype.$echarts = echarts //引入组件,作为全局变量

import echartsgl from 'echarts-gl'
Vue.prototype.$echartsGL = echartsgl //引入组件,作为全局变量

import axios from 'axios'
Vue.prototype.$axios = axios//全局注册，使用方法为:this.$axios

Vue.use(iView)
Vue.use(vueResource)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

