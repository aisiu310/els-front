// vuex状态管理机制，方便组件之间通信。
//一个组件的数据变化会映射到使用这个数据的其他组件
//localStorage将数据存储到浏览器,在跨页面时使用。
const state = {
  businessHallCode: '',
  selectInfo: '',
  monitOption: 1,
}
const mutations = {
  setMonitOption(state, value) {
    state.monitOption = value
  },
  setSelectInfo(state, value) {
    state.selectInfo = value
  },
  setBusinessHallCode(state, value) {
    state.businessHallCode = value;
    sessionStorage.setItem("businessHallCode", state.businessHallCode)
  },
  delBusinessHallCode(state) {
    state.businessHallCode = '';
    sessionStorage.removeItem("businessHallCode")
  }
}
export default {
  state,
  mutations
}
