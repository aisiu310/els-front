// vuex状态管理机制，方便组件之间通信。
//一个组件的数据变化会映射到使用这个数据的其他组件
//localStorage将数据存储到浏览器,在跨页面时使用。
const state = {
  transit: '',
}
const mutations = {
  setTransitCode(state, value) {
    state.transit = value;
    sessionStorage.setItem("transit", value)
  },
  delTransitCode(state) {
    state.transit = '';
    sessionStorage.removeItem("transit")
  }
}
export default {
  state,
  mutations
}
