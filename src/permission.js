// 取到需要权限判断的路由表
import {
  asynRouter,
} from '@/router'
import router from '@/router'
import store from './store/index'
var addRouFlag = false

router.beforeEach((to, from, next) => {
  next()
  // 取到用户的角色
  let GetRole = sessionStorage.getItem("role")
  // let GetRole = store.state.login.role;

  store.commit('setBreadCrumb', to.name)
  console.log('存储面包屑导航条', store.state.login.breadCrumb)

  console.log('目标页面', to);
  console.log('起始页面', from);
  console.log('根据token拉取用户角色:', GetRole, '生成路由', );
  // 如果登录了
  if (GetRole && to.path != '/login') {
    // 如果路由表 没根据角色进行筛选,就筛选一次
    if (!addRouFlag) {
      addRouFlag = true
      var getRoutes = baseRoleGetRouters(asynRouter, GetRole.split(","))
      store.commit('setMenu', getRoutes)
      console.log("这是匹配好的路由表:", getRoutes);
      router.addRoutes(getRoutes)
      router.push({
        path: to.path
      })
    }
  } else {
    // 用户没登录，跳转到登录页面
    if (to.path === '/') {
      next()
    } else {
      // 用户没登录，跳转到登录页面
      if (to.path === '/') {
        next()
      } else {
        next('/')
      }
    }
  }

})

function hasPermission(route, roles) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}
// 根据用户的角色取到该用户对应的路由
function baseRoleGetRouters(allRoutes, roles) {
  // allRoutes是动态路由表
  // roles是取到的用户角色，数组
  let rightRoutes = allRoutes.filter((route, index) => {

    if (hasPermission(route, roles)) {
      if (route.children && route.children.length) {
        route.children = baseRoleGetRouters(route.children, roles)
      }
      return true
    }
    return false
  })
  return rightRoutes
}
