import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import businessHall from './modules/businessHall'
import transit from './modules/transit'
import courier from './modules/courier'
import warehouse from './modules/warehouse'
Vue.use(Vuex)

const state = {}
const mutations = {}

const store = new Vuex.Store({
  modules: {
    login,
    businessHall,
    transit,
    courier,
    warehouse
  },
  state,
  mutations,
})

export default store;
