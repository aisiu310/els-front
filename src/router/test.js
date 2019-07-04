import Vue from 'vue'
import Router from 'vue-router'
import test from '@/components/finance/finance'

Vue.use(Router)

export default new Router ({
    routes: [
        {
            path: '/',
            name: 'test',
            component: test
        }
    ]
})
