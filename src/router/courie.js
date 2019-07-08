import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router ({
    path:'/courie',
    name:'courie',
    redirect:'/courie/',
    component:'',
    children:[
        {
            path:'',
            name:'',
            component:''
        }
    ]
})