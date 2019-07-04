import Vue from 'vue'
import Router from 'vue-router'
import arrive_list from '@/components/transit_center/arrive_list'
import transfer_list from '@/components/transit_center/transfer_list'
import loadcar_list from '@/components/transit_center/loadcar_list'
import transit_layout from '@/components/transit_center/common/transit_layout'


Vue.use(Router)

export default new Router ({
    routes: [
        {
            path: '/',
            name: 'transit_layout',
            redirect:'/transfer_list',
            component: transit_layout,
            children:[
                {
                    path: 'arrive_list',
                    name: 'arrive_list',
                    component: arrive_list
                },
                {
                    path: 'transfer_list',
                    name: 'transfer_list',
                    component: transfer_list
                },
                {
                    path: 'loadcar_list',
                    name: 'loadcar_list',
                    component: loadcar_list
                },              
            ]
        }
    ]
})
