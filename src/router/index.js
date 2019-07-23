import Vue from 'vue'
import router from 'vue-router'

import login from '@/components/login/login'
import main from '@/components/transit_center/main'
import error from '@/components/reuse/error'

import transit_arrive_list from '@/components/transit_center/arrive_list'
import transit_transfer_list from '@/components/transit_center/transfer_list'
import transit_loadcar_list from '@/components/transit_center/loadcar_list'

import business_loadcar_list from '@/components/business_hall/loadcar_list'
import business_arrive_list from '@/components/business_hall/arrive_list'
import business_deliver_list from '@/components/business_hall/deliver_list'
import business_car_info from '@/components/business_hall/car_info'
import business_driver_info from '@/components/business_hall/driver_info'
import business_receipt_list from '@/components/business_hall/receipt_list'
import business_receipt_record from '@/components/business_hall/receipt_record'



import check_list from '@/components/manager/check_list'
import adjust_people from '@/components/manager/adjust_people'
import adjust_organ from '@/components/manager/adjust_organ'
import adjust_salary from '@/components/manager/adjust_salary'
import adjust_charge from '@/components/manager/adjust_charge'
import examine_log from '@/components/manager/examine_log'


import sender_list from '@/components/courie/sender_list'
import receive_list from '@/components/courie/receive_list'
import retreat_list from '@/components/courie/retreat_list'

Vue.use(router)

export const fixedRouter = [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: login
  }
]
export const asynRouter = [{
    path: '/transit',
    redirect: '/transit/arriveList',
    component: main,
    meta: {
      title: "中转中心",
      icon: "el-icon-success",
      roles: ['admin', 'manager', 'transister'],
      requireAuth: true
    },
    children: [{
      path: 'arriveList',
      component: transit_arrive_list,
      name: '接收管理',
      meta: {
        title: "接收单",
        icon: "ios-navigate",
        roles: ['admin', 'manager', 'transister'],
        requireAuth: true
      },
    }, {
      path: 'transferList',
      component: transit_transfer_list,
      name: '中转管理',
      meta: {
        title: "中转单",
        icon: "ios-keypad",
        roles: ['admin', 'manager', 'transister'],
        requireAuth: true
      },
    }, {
      path: 'loadCarList',
      component: transit_loadcar_list,
      name: '装车管理',
      meta: {
        title: "装车单",
        icon: "ios-analytics",
        roles: ['admin', 'manager', 'transister'],
        requireAuth: true
      },
    }]
  },
  {
    path: '/businessHall',
    redirect: '/businessHall/businessLoadcarList',
    component: main,
    meta: {
      title: "营业厅",
      icon: "el-icon-success",
      roles: ['admin', 'manager', 'businesser'],
      requireAuth: true
    },
    children: [{
        path: 'businessLoadcarList',
        name: '装车管理',
        component: business_loadcar_list,
        meta: {
          title: "装车单",
          icon: "ios-analytics",
          roles: ['admin', 'manager', 'businesser'],
          requireAuth: true
        },
      },
      {
        path: 'businessArriveList',
        name: '接收管理',
        component: business_arrive_list,
        meta: {
          title: "到达单",
          icon: "ios-analytics",
          roles: ['admin', 'manager', 'businesser'],
          requireAuth: true
        },
      },
      {
        path: 'business_deliver_list',
        name: '派件管理',
        component: business_deliver_list,
        meta: {
          title: "派件单",
          icon: "ios-analytics",
          roles: ['admin', 'manager', 'businesser'],
          requireAuth: true
        },
      },
      {
        path: 'businessCarInfo',
        name: '车辆管理',
        component: business_car_info,
        meta: {
          title: "车辆信息",
          icon: "ios-analytics",
          roles: ['admin', 'manager', 'businesser'],
          requireAuth: true
        },
      },
      {
        path: 'businessDriverInfo',
        name: '司机管理',
        component: business_driver_info,
        meta: {
          title: "司机信息",
          icon: "ios-analytics",
          roles: ['admin', 'manager', 'businesser'],
          requireAuth: true
        },
      },
      {
        path: 'businessReceiptList',
        name: '收款管理',
        component: business_receipt_list,
        meta: {
          title: "收款单",
          icon: "ios-analytics",
          roles: ['admin', 'manager', 'businesser'],
          requireAuth: true
        },
      },
      {
        path: 'businessReceiptRecord',
        name: '收款记录',
        component: business_receipt_record,
        meta: {
          title: "收款记录",
          icon: "ios-analytics",
          roles: ['admin', 'manager', 'businesser'],
          requireAuth: true
        },
      },
    ]
  },
  {
    path: '/manager',
    name: '总经理',
    redirect: '/manager/check_list',
    component: main,
    meta: {
      title: "总经理",
      icon: "ios-analytics",
      roles: ['admin', 'manager'],
      requireAuth: true
    },
    children: [{
        path: 'checkList',
        name: '单据审批',
        component: check_list,
        meta: {
          title: "单据审批",
          icon: "ios-analytics",
          roles: ['admin', 'manager'],
          requireAuth: true
        },
      },
      {
        path: 'adjustPeople',
        name: '人员调整',
        component: adjust_people,
        meta: {
          title: "单据审批",
          icon: "ios-analytics",
          roles: ['admin', 'manager'],
          requireAuth: true
        },
      },
      {
        path: 'adjustOrgan',
        name: '机构调整',
        component: adjust_organ,
        meta: {
          title: "机构调整",
          icon: "ios-analytics",
          roles: ['admin', 'manager'],
          requireAuth: true
        },
      },
      {
        path: 'adjustSalary',
        name: '薪水调整',
        component: adjust_salary,
        meta: {
          title: "薪水调整",
          icon: "ios-analytics",
          roles: ['admin', 'manager'],
          requireAuth: true
        },
      },
      {
        path: 'adjustCharge',
        name: '收费策略',
        component: adjust_charge,
        meta: {
          title: "收费策略",
          icon: "ios-analytics",
          roles: ['admin', 'manager'],
          requireAuth: true
        },
      },
      {
        path: 'examineLog',
        name: '检查日志',
        component: examine_log,
        meta: {
          title: "检查日志",
          icon: "ios-analytics",
          roles: ['admin', 'manager'],
          requireAuth: true
        },
      },
    ]
  },
  {
    path: '/courie',
    name: '快递员',
    redirect: '/courie/sender_list',
    component: main,
    meta: {
      title: "快递员",
      icon: "ios-analytics",
      roles: ['admin', 'courie'],
      requireAuth: true
    },
    children: [{
        path: 'senderList',
        name: '派件管理',
        component: sender_list,
        meta: {
          title: "派件单",
          icon: "ios-analytics",
          roles: ['admin', 'courie'],
          requireAuth: true
        },
      },
      {
        path: 'receiveList',
        name: '接收管理',
        component: receive_list,
        meta: {
          title: "接收单",
          icon: "ios-analytics",
          roles: ['admin', 'courie'],
          requireAuth: true
        },
      },
      {
        path: 'retreatList',
        name: '退件管理',
        component: retreat_list,
        meta: {
          title: "退件单",
          icon: "ios-analytics",
          roles: ['admin', 'courie'],
          requireAuth: true
        },
      }
    ]
  },
  // 当页面地址和上面任一地址不匹配，则跳转到404
  {

    path: '*',
    redirect: '/404',
    component: error,
    meta: {
      title: "统一错误返回页面",
      icon: "el-icon-success",
      roles: ['admin', 'manager', 'transister', 'businesser'],
      requireAuth: false
    },
  }
]

export default new router({
  routes: fixedRouter
})
