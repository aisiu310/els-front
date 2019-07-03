import Vue from 'vue'
import Router from 'vue-router'
import admin from '@/components/admin/admin'
import n from '@/components/reuse/re_navigator'

Vue.use(Router)

export default new Router ({
    routes: [
        {
            path: '/',
            name: 'admin',
            component: admin
        }
    ]
})
