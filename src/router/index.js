import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import warehouse_layout from '@/components/warehouse/common/warehouse_layout'
import manager_layout from '@/components/manager/common/manager_layout'
import business_layout from '@/components/business_hall/common/business_layout'
import transit_layout from '@/components/transit_center/common/transit_layout'
import courie_layout from '@/components/courie/common/courie_layout'


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
    },
    {
      path:'/business',
      name:'business',
      component:business_layout
    },
    {
      path:'/transit',
      name:'transit',
      component:transit_layout
    },
    {
      path:'/courie',
      name:'courie',
      component:courie_layout
    }
    

]
var router = new Router({
    routes
})
export default router 

  
