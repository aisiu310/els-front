import Vue from 'vue'
import Router from 'vue-router'

import login from '@/components/login/login'
import error from '@/components/reuse/error'

import transit_arrive_list from '@/components/transit_center/arrive_list'
import transit_transfer_list from '@/components/transit_center/transfer_list'
import transit_loadcar_list from '@/components/transit_center/loadcar_list'
import transit_layout from '@/components/transit_center/common/transit_layout'

import business_loadcar_list from '@/components/business_hall/loadcar_list'
import business_arrive_list from '@/components/business_hall/arrive_list'
import business_deliver_list from '@/components/business_hall/deliver_list'
import business_car_info from '@/components/business_hall/car_info'
import business_driver_info from '@/components/business_hall/driver_info'
import business_receipt_list from '@/components/business_hall/receipt_list'
import business_receipt_list_test from '@/components/business_hall/receipt_list_test'
import business_layout from '@/components/business_hall/common/business_layout'

import visiual from '@/components/warehouse/Visiual'
// import warehouse_layout from '@/components/warehouse/common/warehouse_layout'

import check_list from '@/components/manager/check_list'
import adjust_people from '@/components/manager/adjust_people'
import adjust_organ from '@/components/manager/adjust_organ'
import adjust_salary from '@/components/manager/adjust_salary'
import adjust_charge from '@/components/manager/adjust_charge'
import examine_log from '@/components/manager/examine_log'
import manager_layout from '@/components/manager/common/manager_layout'


import sender_list from '@/components/courie/sender_list'
import receive_list from '@/components/courie/receive_list'
import Navigator from '@/components/courie/common/Navigator'

Vue.use(Router)

// 固定的路由表
export const fixedRouter = [{
    path: '/',
    component: login,
    hidden: true
  },
  {
    path: 'error',
    component: error, //整体页面的布局(包含左侧菜单跟主内容区域)
    meta: {
      title: '首页', //菜单名称
      roles: ['user', 'admin'], //当前菜单哪些角色可以看到
      icon: 'el-icon-info' //菜单左侧的icon图标
    }
  },
]
// 需要权限判断展示的路由
export const permissionRouter = [{
  path: "/Navigator",
  component: Navigator,
  name: "Navigator",
  meta: {
    title: "案例",
    icon: "el-icon-success",
    roles: ['admin', 'user']
  },
  children: [{
      path: "sender_list",
      name: "sender_list",
      component: sender_list,
      meta: {
        title: "寄件",
        icon: "el-icon-goods",
        roles: ['admin']
      },
    },
    {
      path: "receive_list",
      name: "receive_list",
      component: receive_list,
      meta: {
        title: "收件",
        icon: "el-icon-upload",
        roles: ['admin']
      }
    }
  ]
}]

export default new Router({
  routes: fixedRouter
})
