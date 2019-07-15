import Vue from 'vue'
import Router from 'vue-router'

import warehouse from '@/components/warehouse/common/warehouse_index'
import in_warehouse from '@/components/warehouse/table/in_warehouse'
import out_warehouse from '@/components/warehouse/table/out_warehouse'
import warn from '@/components/warehouse/func/warn'
import show from '@/components/warehouse/func/show'
import inventory from '@/components/warehouse/table/inventory'
import check from '@/components/warehouse/func/check'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/warehouse',
        name: 'warehouse',
        component: warehouse,
        children: [{
                path: 'in_warehouse',
                name: 'in_warehouse',
                component: in_warehouse
            },
            {
                path: 'out_warehouse',
                name: 'out_warehouse',
                component: out_warehouse
            },
            {
                path: 'warn',
                name: 'warn',
                component: warn
            },
            {
                path: 'show',
                name: 'show',
                component: show
            },
            {
                path: 'inventory',
                name: 'inventory',
                component: inventory
            },
            {
                path: 'check',
                name: "check",
                component: check
            }
        ]
    }]

})