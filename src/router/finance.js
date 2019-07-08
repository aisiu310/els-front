import Vue from 'vue'
import Router from 'vue-router'

import finance from '@/components/finance/common/finance'
import pay from '@/components/finance/cost_management'
import payee from '@/components/finance/settle_accounts'
import init from '@/components/finance/table/init_account_table'
import bank from '@/components/finance/table/bank_table'
import business_graph from '@/components/finance/graph/business_graph'
import cost_benefit from '@/components/finance/graph/cost_benefit'
import log from '@/components/reuse/log'

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
                },
                {
                    path: 'bank',
                    name: 'bank',
                    component: bank
                },
                {
                    path: 'log',
                    name: 'log',
                    component: log
                },
                {
                    path: 'business_graph',
                    name: 'business_graph',
                    component: business_graph
                },
                {
                    path: 'cost_benefit',
                    name: 'cost_benefit',
                    component: cost_benefit
                }
            ]
        }
    ]
})
