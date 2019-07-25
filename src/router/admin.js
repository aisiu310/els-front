import Vue from 'vue'
import Router from 'vue-router'

import admin from "@/components/admin/admin_index"
import menu from "@/components/admin/func/menu"
import add from "@/components/admin/func/add"
import show_admin from "@/components/admin/func/show"

Vue.use(Router)

export default new Router({
    routers: [{
        path: "/admin",
        redirect: "/admin/menu",
        component: admin,
        children: [{
                path: 'menu',
                component: menu
            },
            {
                path: 'add',
                component: add
            },
            {
                path: 'show_admin',
                component: show_admin
            }
        ]
    }]
})