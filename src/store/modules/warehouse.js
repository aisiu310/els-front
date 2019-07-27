// vuex状态管理机制，方便组件之间通信。
//一个组件的数据变化会映射到使用这个数据的其他组件
//localStorage将数据存储到浏览器,在跨页面时使用。
const state = {
  wareHouseCode: '',
}
const mutations = {
  setWareHouseCode(state, value) {
    state.wareHouseCode = value;
    sessionStorage.setItem("wareHouseCode", value)
  },
  delWareHouseCode(state) {
    state.wareHouseCode = '';
    sessionStorage.removeItem("wareHouseCode")
  }
}
export default {
  state,
  mutations
}
