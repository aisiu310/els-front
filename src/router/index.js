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

// sender
import sender from '@/components/sender/sender_index'
import sender_detail from '@/components/sender/sender_detail'
import orderManage from '@/components/sender/orderManager/orderManage'
import order_table from '@/components/sender/orderManager/order_table'
import senderManage from '@/components/sender/senderManager/senderManage'
import address from '@/components/sender/senderManager/address'
import person from '@/components/sender/senderManager/person'
import password from '@/components/sender/senderManager/password'

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
    // sender
    {
        path: '/sender',
        redirect: '/sender/sender_detail',
        component: sender,
        children: [{
                path: 'sender_detail',
                component: sender_detail,
                roles: ["sender"]
            },
            {
                path: 'orderManage',
                component: orderManage,
                children: [{
                    path: 'order_table',
                    component: order_table,
                    roles: ["sender"]
                }]
            },
            {
                path: 'senderManage',
                component: senderManage,
                children: [{
                        path: 'address',
                        component: address,
                        roles: ["sender"]
                    },
                    {
                        path: 'person',
                        component: person,
                        roles: ["sender"]
                    },
                    {
                        path: 'password',
                        component: password,
                        roles: ["sender"]
                    }
                ]
            }
        ]
    },
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
            },
            {
                path: 'loadCarList',
                component: transit_loadcar_list,
                name: '装车管理',
                meta: {
                    title: "装车单",
                    icon: "ios-analytics",
                    roles: ['admin', 'manager', 'transister'],
                    requireAuth: true
                },

            }, {
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
            }
        ]
    },
    // businessHall
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
    // manager
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
    // courier
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
        }
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