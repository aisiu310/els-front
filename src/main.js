import Vue from 'vue'
import App from './App'
import iView from 'iview'
import store from './store/main'
import vueResource from 'vue-resource'
// import 'iview/dist/styles/iview.css'
import '../my-theme/dist/iview.css';

<<
<< << < HEAD
import router from './router'

// import router from './router/zxy-test'
// import router from './router/finance'
// import router from './router/warehouse'
===
=== =
// import router from './router'
import router from './router/finance'
// import router from './router/zxy-test'
>>>
>>> > f19155d8055d96906503752968145d6b03de5086

// import '@/permission.js'
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

router.beforeEach((to, from, next) => {
  if (to.path === '/login') { //若要跳转的页面是登录界面
    next(); //直接跳转
  } else if (to.meta.requireAuth) { //若要跳转的页面是个人界面
    let token = localStorage.getItem('token'); //获取本地存储的token值
    console.log(1, token)
    if (token === null || token === '') { //若token为空则验证不成功，跳转到登录页面
      next('/login');
    } else { //不为空则验证成功
      next();
    }
  } else {
    next();
  }
});

axios.interceptors.request.use(config => {
  if (store.state.token) {
    config.headers.common['post-Token'] = store.state.token
  }
  return config;
}, error => {
  return Promise.reject(error);
});

//respone拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => { //默认除了2XX之外都为错误
    if (error.response) {
      switch (error.response.status) {
        case 401:
          this.$store.commit('delToken');
          router.replace({ //跳转到登录页面
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            } // 将跳转的路由path作为参数，登录成功后跳转到该路由
          });
      }
    }
    return Promise.reject(error.response);
  }
)
