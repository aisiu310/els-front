import Vue from 'vue'
import Router from 'vue-router'
import courie from './courie'
import business from './business'
import warehouse from './warehouse'
import transit from './transit'
import reuse from './reuse'
import finance from './finance'

Vue.use(Router)

export default new Router({
    routes:[
    ...business,
    ...courie,
    ...warehouse,
    ...transit,
    ...reuse,
    ...finance
  ]
})
