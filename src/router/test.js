import Vue from 'vue'
import Router from 'vue-router'
import order_detail from '@/components/reuse/order_detail'

Vue.use(Router)

export default new Router ({
    routes: [
        {
            path: '/',
            name: 'order_detail',
            component: order_detail
        }
    ]
})
