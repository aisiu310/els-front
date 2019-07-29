const state = {
  token: '',
  userName: '',
  userImage: '',
  role: '',
  menu: '',
  breadCrumb: '',
}

const mutations = {
  setMenu(state, value) {
    state.menu = value;
  },
  delMenu(state) {
    state.menu = '';
  },
  setBreadCrumb(state, value) {
    state.breadCrumb = value;
  },
  setToken(state, value) { //添加token
    state.token = value;
    sessionStorage.setItem("token", state.token);
    // console.log(value)
  },
  delToken(state) {
    state.token = '';
    sessionStorage.removeItem("token"); //删除token
  },
  setUserName(state, value) {
    state.userName = value;
    localStorage.setItem("name"); //
  },
  setUserImage(state, value) {
    state.userImage = value;
    localStorage.setItem("Image"); //
  },
  setRole(state, value) {
    state.role = value;
    sessionStorage.setItem("role", state.role); //
  },
  delRole(state) {
    state.role = '';
    sessionStorage.removeItem("role")
  }
}
export default {
  state,
  mutations
}
