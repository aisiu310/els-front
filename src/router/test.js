import Vue from 'vue'
import Router from 'vue-router'
import admin from '@/components/admin/admin'
import n from '@/components/reuse/re_navigator'
import a from '@/components/finance/account_manager'

Vue.use(Router)

export default new Router ({
    routes: [
        {
            path: '/',
            name: 'a',
            component: a
        }
    ]
})
