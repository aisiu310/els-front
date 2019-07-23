import Vue from 'vue'
import router from 'vue-router'

import login from '@/components/login/login'
import main from '@/components/transit_center/main'
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
import business_receipt_list_test from '@/components/business_hall/receipt_record'
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

// finance router
import finance from '@/components/finance/common/finance'
import pay from '@/components/finance/table/pay_table'
import payee from '@/components/finance/table/payee_table'
import init from '@/components/finance/table/init_account_table'
import bank from '@/components/finance/table/bank_table'
import salary from "@/components/finance/table/salary_table"
import rent from "@/components/finance/table/rent_table"
import freight from "@/components/finance/table/freight_table"
import business_graph from '@/components/finance/graph/business_graph'
import cost_benefit from '@/components/finance/graph/cost_benefit'
import log from '@/components/reuse/log'

// warehouse
import warehouse from '@/components/warehouse/common/warehouse_index'
import in_warehouse from '@/components/warehouse/table/in_warehouse'
import out_warehouse from '@/components/warehouse/table/out_warehouse'
import warn from '@/components/warehouse/func/warn'
import show from '@/components/warehouse/func/show'
import inventory from '@/components/warehouse/table/inventory'
import check from '@/components/warehouse/func/check'

Vue.use(router)

// // 固定的路由表
// export const fixedRouter = [{
//     path: '/',
//     component: login,
//     // hidden: true
//   },
//   {
//     path: 'error',
//     component: error, //整体页面的布局(包含左侧菜单跟主内容区域)
//     meta: {
//       title: '首页', //菜单名称
//       roles: ['user', 'admin'], //当前菜单哪些角色可以看到
//       icon: 'el-icon-info' //菜单左侧的icon图标
//     }
//   },
// ]
// // 需要权限判断展示的路由
// export const permissionRouter = [{
//   path: "/transit",
//   component: main,
//   name: "main",
//   meta: {
//     title: "中转中心",
//     icon: "el-icon-success",
//     roles: ['admin', 'user'],
//     requireAuth: true
//   },
//   children: [{
//       path: "arriveList",
//       name: "arriveList",
//       component: transit_arrive_list,
//       meta: {
//         title: "到达单",
//         icon: "el-icon-goods",
//         roles: ['admin'],
//         requireAuth: true
//       },
//     },
//     {
//       path: "transferList",
//       name: "transit_transfer_list",
//       component: transit_transfer_list,
//       meta: {
//         title: "中转单",
//         icon: "el-icon-upload",
//         roles: ['admin'],
//         requireAuth: true
//       }
//     }
//   ]
// }]

// export default new Router({
//   routes: fixedRouter
// })

export const fixedRouter = [{
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: login
    }
]
export const asynRouter = [
    // transit
    {
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
    // finance
    {
        path: '/finance',
        redirect: '/finance/business_graph',
        component: finance,
        children: [{
                path: 'pay',
                component: pay
            }, {
                path: 'payee',
                component: payee,
                roles: ["finance"]
            },
            {
                path: 'init',
                component: init,
                roles: ["finance"]
            },
            {
                path: 'bank',
                component: bank,
                roles: ["finance"]
            },
            {
                path: 'log',
                component: log,
                roles: ["finance"]
            },
            {
                path: 'business_graph',
                component: business_graph,
                roles: ["finance"]
            },
            {
                path: 'cost_benefit',
                component: cost_benefit,
                roles: ["finance"]
            },
            {
                path: 'salary',
                component: salary,
                roles: ["finance"]
            },
            {
                path: 'rent',
                component: rent,
                roles: ["finance"]
            },
            {
                path: 'freight',
                component: freight,
                roles: ["finance"]
            }
        ]
    },
    // warehouse
    {
        path: '/warehouse',
        redirect: '/warehouse/show',
        component: warehouse,
        children: [{
                path: 'in_warehouse',
                component: in_warehouse,
                roles: ["warehouse"]
            },
            {
                path: 'out_warehouse',
                component: out_warehouse,
                roles: ["warehouse"]
            },
            {
                path: 'warn',
                component: warn,
                roles: ["warehouse"]
            },
            {
                path: 'show',
                component: show,
                roles: ["warehouse"]
            },
            {
                path: 'inventory',
                component: inventory,
                roles: ["warehouse"]
            },
            {
                path: 'check',
                component: check,
                roles: ["warehouse"]
            }
        ]
    },
    // 当页面地址和上面任一地址不匹配，则跳转到404
    {

        path: '*',
        redirect: '/404',
        meta: {
            title: "统一错误返回页面",
            icon: "el-icon-success",
            roles: ['admin', 'manager', 'transister', ''],
            requireAuth: false
        },
    }
]

export default new router({
    routes: fixedRouter
})