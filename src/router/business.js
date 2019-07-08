import Vue from 'vue'
import Router from 'vue-router'

import business_loadcar_list from '@/components/business_hall/loadcar_list'
import business_arrive_list from '@/components/business_hall/arrive_list'
import business_deliver_list from '@/components/business_hall/deliver_list'
import business_car_info from '@/components/business_hall/car_info'
import business_driver_info from '@/components/business_hall/driver_info'
import business_receipt_list from '@/components/business_hall/receipt_list'
import business_layout from '@/components/business_hall/common/business_layout'

Vue.use(Router)
export default new Router ({
    routes: [
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
    }]
})