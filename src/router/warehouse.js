import Vue from 'vue'
import Router from 'vue-router'
import visiual from '@/components/warehouse/Visiual'
import warehouse_layout from '@/components/warehouse/common/warehouse_layout'

Vue.use(Router)
export default new Router ({
    path:'/warehouse',
    name:'warehouse',
    redirect:'/warehouse/visiual',
    component:warehouse_layout,
    children:[
        {
            path:'visiual',
            name:'visiual',
            component:visiual
        }
    ]
})