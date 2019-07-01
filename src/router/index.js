import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login/login'
import sender_header from '@/components/sender/sender_header'

Vue.use(Router)

const routes = [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   components: HelloWorld
    // },
    {
      path: '/login',
      component: login
    },
    {
      path: '/sender_header',
      component: sender_header
    }
  ]
  var router = new Router({
    routes
  })
  export default router 
