import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import sender_index from '@/components/sender/sender_index'
import re_header from '@/components/reuse/re_header'

Vue.use(Router)

const routes = [
    {
      path: '/',
      component: login
    },
    {
      path: '/sender_index',
      component: sender_index
    },
    {
      path: '/re_header',
      component: re_header
    }
  ]
  var router = new Router({
    routes
  })
  export default router 
