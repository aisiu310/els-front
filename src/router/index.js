import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import sender_index from '@/components/sender/sender_index'
import admin from '@/components/admin/admin'

Vue.use(Router)

const routes = [
    {
      path: '/',
      component: login
    },
    {
      path: '/sender_index',
      name:'sender_index',
      component: sender_index
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin
    }
  ]
  var router = new Router({
    routes
  })
  export default router 
