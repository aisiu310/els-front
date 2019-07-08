// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import iView from 'iview'
import vueResource from 'vue-resource'

// import router from './router'git
// import router from './router/zxy-test'
import router from './router/finance'
// import router from './router/zxy-test'
import 'iview/dist/styles/iview.css'
// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts // 引入组件（将echarts注册为全局）

import echartsGL from 'echarts-gl' // 引入echarts
Vue.prototype.$echartsGL = echartsGL // 引入组件（将echarts注册为全局）


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
