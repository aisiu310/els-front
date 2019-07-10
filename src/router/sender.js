import Vue from 'vue'
import Router from 'vue-router'
import sender from '@/components/sender/sender_index'
import sender_detail from '@/components/sender/sender_detail'
import all_order from '@/components/sender/orderList/all_order'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/sender',
      name: 'sender',
      redirect:'/sender/sender_detail',
      component: sender,
      children:[
        {
          path:'sender_detail',
          name:'sender_detail',
          component:sender_detail
        },
        {
          path:'all_order',
          name:'all_order',
          component:all_order
        }
      ]
    }
  ]
})
