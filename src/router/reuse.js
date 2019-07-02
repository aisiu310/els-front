import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/login/login'
import Header from '@/components/reuse/Header'
import Navigator from '@/components/reuse/Navigator'

Vue.use(Router)

export default new Router({
  routes: [
    {
    	path:'/user/:id',
    	name:'user',
    	components:{
		header:Header,
		navigator:Navigator
    	}
    },{
    	path:'/',
    	name:'login',
    	component:Login
    }
  ]
})
