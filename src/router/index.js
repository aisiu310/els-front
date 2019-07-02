import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import sender_index from '@/components/sender/sender_index'

Vue.use(Router)

const routes = [
    {
      path: '/',
      component: login
    },
    {
      path: '/sender_index',
      component: sender_index
    }
  ]
  var router = new Router({
    routes
  })
  export default router 
