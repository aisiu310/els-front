import Vue from 'vue'
import App from './App'
import iView from 'iview'
import vueResource from 'vue-resource'
import 'iview/dist/styles/iview.css'

// import router from './router'

// import router from './router/zxy-test'
import router from './router/finance'

import '@/permission.js'
import global from '@/utils/global' //全局
Vue.prototype.$global = global

import qs from 'qs'
Vue.prototype.$qs = qs

import echarts from 'echarts' //引入echarts
Vue.prototype.$echarts = echarts //引入组件,作为全局变量

import echartsgl from 'echarts-gl'
Vue.prototype.$echartsGL = echartsgl //引入组件,作为全局变量

import axios from 'axios'
Vue.prototype.$axios = axios //全局注册，使用方法为:this.$axios

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; // 配置请求头（推荐）

Vue.use(iView)
Vue.use(vueResource)
Vue.config.productionTip = true

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {
        App
    },
    template: '<App/>'
})