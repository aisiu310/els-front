// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import iView from 'iview'
import vueResource from 'vue-resource'

// import router from './router'
import router from './router/zxy-test'
// import router from './router/finance'
// import router from './router/zxy-test'
import 'iview/dist/styles/iview.css'

Vue.use(iView)
Vue.use(vueResource)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
