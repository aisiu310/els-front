import Vue from 'vue'
import Router from 'vue-router'
import transit_arrive_list from '@/components/transit_center/arrive_list'
import transit_transfer_list from '@/components/transit_center/transfer_list'
import transit_loadcar_list from '@/components/transit_center/loadcar_list'
import transit_layout from '@/components/transit_center/common/transit_layout'

Vue.use(Router)
export default new Router ({
routes: 
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
    }
})