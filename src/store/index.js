import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
Vue.use(Vuex)

const state = {}
const mutations = {}

const store = new Vuex.Store({
  modules: {
    login
  },
  state,
  mutations,
})

export default store;
