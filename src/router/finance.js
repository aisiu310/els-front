import Vue from 'vue'
import Router from 'vue-router'

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

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/finance',
        name: 'finance',
        redirect: '/finance/business_graph',
        component: finance,
        children: [{
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
            },
            {
                path: 'salary',
                name: 'salary',
                component: salary
            },
            {
                path: 'rent',
                name: 'rent',
                component: rent
            },
            {
                path: 'freight',
                name: 'freight',
                component: freight
            }
        ]
    }]
})