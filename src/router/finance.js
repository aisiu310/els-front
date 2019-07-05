import Vue from 'vue'
import Router from 'vue-router'

import finance from '@/components/finance/finance'
import pay from '@/components/finance/cost_management'
import payee from '@/components/finance/settle_accounts'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/finance',
            name: 'finance',
            component: finance
        }, {
            path: '/pay',
            name: 'pay',
            component: pay
        }, {
            path: '/payee',
            name: 'payee',
            component: payee
        }
    ]
})
