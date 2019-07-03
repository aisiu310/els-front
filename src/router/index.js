import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import shop from '@/components/layout/shop'
import warehouse_layout from '@/components/warehouse/common/warehouse_layout'
import manager_layout from '@/components/manager/common/manager_layout'
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
      path:'/shop',
      name: 'shop',
      component:shop
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin
    },
    {
      path:'/warehouse',
      name:'warehouse',
      component:warehouse_layout
    },
    {
      path:'/manager',
      name:'manager',
      component:manager_layout
    }

]
var router = new Router({
    routes
})
export default router 

  
