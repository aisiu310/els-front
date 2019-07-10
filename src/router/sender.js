import Vue from 'vue'
import Router from 'vue-router'
import sender from '@/components/sender/sender_index'
import sender_detail from '@/components/sender/sender_detail'

import orderManage from '@/components/sender/orderManager/orderManage'
import order_table from '@/components/sender/orderManager/order_table'

import senderManage from '@/components/sender/senderManager/senderManage'
import address from '@/components/sender/senderManager/address'
import person from '@/components/sender/senderManager/person'
import password from '@/components/sender/senderManager/password'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/sender',
      name: 'sender',
      redirect: '/sender/sender_detail',
      component: sender,
      children: [
        {
          path: 'sender_detail',
          name: 'sender_detail',
          component: sender_detail
        },
        {
          path: 'orderManage',
          name: 'orderManage',
          component: orderManage,
          children: [
            {
              path: 'order_table',
              name: 'order_table',
              component: order_table
            }
          ]
        },
        {
          path: 'senderManage',
          name: 'senderManage',
          component: senderManage,
          children: [
            {
              path: 'address',
              name: 'address',
              component: address
            },
            {
              path: 'person',
              name: 'person',
              component: person
            },
            {
              path: 'password',
              name: 'password',
              component: password
            }
          ]
        }
      ]
    }
  ]
})
