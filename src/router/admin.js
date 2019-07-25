import Vue from 'vue'
import Router from 'vue-router'

import admin_index from "@/components/admin/admin_index"
import menu from "@/components/admin/func/menu"
import add from "@/components/admin/func/add"
import show from "@/components/admin/func/show"

Vue.use(Router)

export default new Router({
    routers: [{
        path: "/admin_index",
        name: "admin_index",
        redirect: "/admin_index/menu",
        component: admin_index,
        children: [{
                path: 'menu',
                name: 'menu',
                component: menu
            },
            {
                path: 'add',
                component: add
            },
            {
                path: 'show',
                component: show
            }
        ]
    }]
})