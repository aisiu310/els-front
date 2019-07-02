import Vue from 'vue'
import Router from 'vue-router'
import sender_detail from '@/components/sender/sender_detail'

Vue.use(Router)

export default new Router ({
    routes: [
        {
            path: '/',
            name: 'sender_detail',
            component: sender_detail
        }
    ]
})
