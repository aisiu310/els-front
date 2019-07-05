import Vue from 'vue'
import Router from 'vue-router'

import finance from '@/components/finance/common/finance'
import pay from '@/components/finance/cost_management'
import payee from '@/components/finance/settle_accounts'
import init from '@/components/finance/table/init_account_table'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/finance',
            name: 'finance',
            redirect: '/finance/payee',
            component: finance,
            children: [
                {
                    path: 'pay',
                    name: 'pay',
                    component: pay
                }, {
                    path: 'payee',
                    name: 'payee',
                    component: payee
                },
                {
                    path: 'init',
                    name: 'init',
                    component: init
                }
            ]
        }
    ]
})
