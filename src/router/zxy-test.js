import Vue from 'vue'
import Router from 'vue-router'
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
import business_layout from '@/components/business_hall/common/business_layout'

import visiual from '@/components/warehouse/Visiual'
import warehouse_layout from '@/components/warehouse/common/warehouse_layout'

 
import payee from '@/components/finance/settle_accounts'

Vue.use(Router)

export default new Router ({
    routes: [
        {
            path: '/',
            name: 'transit_layout',
            redirect:'/transit_arrive_list',
            component: transit_layout,
            children:[
                {
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
            redirect:'/business_hall/business_loadcar_list',
            component: business_layout,
            children:[
                {
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
            ]
        },
        {
            path:'/warehouse',
            name:'warehouse',
            redirect:'/warehouse/visiual',
            component:warehouse_layout,
            children:[
                {
                    path:'visiual',
                    name:'visiual',
                    component:visiual
                }
            ]
        }
    ]
})

