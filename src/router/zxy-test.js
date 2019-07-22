import Vue from 'vue'
import Router from 'vue-router'

import login from '@/components/login/login'

import main from '@/components/transit_center/main'
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
import business_receipt_record from '@/components/business_hall/receipt_record'
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
import retreat_list from '@/components/courie/retreat_list'
import courie_layout from '@/components/courie/common/courie_layout'

import payee from '@/components/finance/settle_accounts'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      component: transit_arrive_list,
      meta: {
        roles: ['manager', 'admin'],
        "title": "首页",
        "icon": "dashboard"
      }
    },
    {
      path: '/transit',
      redirect: '/transit/arriveList',
      component: main,
      children: [{
        path: 'arriveList',
        component: transit_arrive_list
      }, {
        path: 'transferList',
        component: transit_transfer_list
      }, {
        path: 'loadCarList',
        component: transit_loadcar_list
      }]
    },
    {
      path: '/transit_layout',
      name: 'transit_layout',
      redirect: '/transit_layout/transit_arrive_list',
      component: transit_layout,
      children: [{
          path: 'transit_arrive_list',
          name: 'transit_arrive_list',
          component: transit_arrive_list
        },
        {
          path: 'transit_transfer_list',
          name: 'transit_transfer_list',
          component: transit_transfer_list
        },
        {
          path: 'transit_loadcar_list',
          name: 'transit_loadcar_list',
          component: transit_loadcar_list
        },
      ]
    },
    {
      path: '/business_hall',
      name: 'business_layout',
      redirect: '/business_hall/business_loadcar_list',
      component: business_layout,
      children: [{
          path: 'business_loadcar_list',
          name: 'business_loadcar_list',
          component: business_loadcar_list
        },
        {
          path: 'business_arrive_list',
          name: 'business_arrive_list',
          component: business_arrive_list
        },
        {
          path: 'business_deliver_list',
          name: 'business_deliver_list',
          component: business_deliver_list
        },
        {
          path: 'business_car_info',
          name: 'business_car_info',
          component: business_car_info
        },
        {
          path: 'business_driver_info',
          name: 'business_driver_info',
          component: business_driver_info
        },
        {
          path: 'business_receipt_list',
          name: 'business_receipt_list',
          component: business_receipt_list
        },
        {
          path: 'business_receipt_record',
          name: 'business_receipt_record',
          component: business_receipt_record
        },

      ]
    },
    // {
    //     path:'/warehouse',
    //     name:'warehouse',
    //     redirect:'/warehouse/visiual',
    //     component:warehouse_layout,
    //     children:[
    //         {
    //             path:'visiual',
    //             name:'visiual',
    //             component:visiual
    //         }
    //     ]
    // },
    {
      path: '/manager',
      name: 'manager',
      redirect: '/manager/check_list',
      component: manager_layout,
      children: [{
          path: 'check_list',
          name: 'check_list',
          component: check_list
        },
        {
          path: 'adjust_people',
          name: 'adjust_people',
          component: adjust_people
        },
        {
          path: 'adjust_organ',
          name: 'adjust_organ',
          component: adjust_organ
        },
        {
          path: 'adjust_salary',
          name: 'adjust_salary',
          component: adjust_salary
        },
        {
          path: 'adjust_charge',
          name: 'adjust_charge',
          component: adjust_charge
        },
        {
          path: 'examine_log',
          name: 'examine_log',
          component: examine_log
        },
      ]
    },
    {
      path: '/courie',
      name: 'courie',
      redirect: '/courie/sender_list',
      component: courie_layout,
      children: [{
          path: 'sender_list',
          name: 'sender_list',
          component: sender_list
        },
        {
          path: 'receive_list',
          name: 'receive_list',
          component: receive_list
        },
        {
          path: 'retreat_list',
          name: 'retreat_list',
          component: retreat_list
        }
      ]
    }
  ]
})
