// 取到需要权限判断的路由表
import asynRouter from '@/router'
import router from '@/router'
import store from './store/index'

var addRouFlag = false

router.beforeEach((to, from, next) => {

  next();
  console.log('目标页面', to);
  console.log('起始页面', from);
  console.log('根据token拉取用户角色，生成路由', store.state.login.token);
  if (store.state.login.token && to.path != '/login') { // 判断是否有token

    let role = store.state.login.role;
    console.log('已获取到role值,role值为', role);
    let getRoutes = baseRoleGetRouters(asynRouter, role);
    console.log("这是匹配好的路由表", getRoutes);
    router.addRoutes(getRoutes)
    router.push({
      path: to.path
    })
  } else {
    next('/');
  }
});


function hasPermission(route, roles) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}
// 根据用户的角色取到该用户对应的路由
function baseRoleGetRouters(allRoutes, role) {
  // allRoutes是动态路由表
  // roles是取到的用户角色，数组
  console.log(1, allRoutes, role)

  let rightRoutes = allRoutes.filter((route, _index) => {
    console.log(2, allRoutes, role)
    if (hasPermission(route, role)) {
      if (route.children && route.children.length) {
        route.children = baseRoleGetRouters(route.children, role)
      }
      return true
    }
    return false
  })
  return rightRoutes
}
