// 取到需要权限判断的路由表
import {
  asynRouter,
} from '@/router'
import router from '@/router'
import store from './store/index'
import {
  setTimeout
} from 'timers';
var addRouFlag = false

router.beforeEach((to, from, next) => {
  next()
  // 取到用户的角色
  let GetRole = sessionStorage.getItem("role")
  // let GetRole = store.state.login.role;
  console.log('目标页面', to);
  console.log('起始页面', from);
  console.log('根据token拉取用户角色:', GetRole, '生成路由');
  // 如果登录了
  if (GetRole && to.path != '/login') {

    // 如果路由表不存在， 没根据角色进行筛选则筛选一次
    if (!addRouFlag) {
      addRouFlag = true
      var getRoutes = baseRoleGetRouters(asynRouter, GetRole.split(","))
      store.commit('setMenu', getRoutes)
      console.log("这是匹配好的路由表:", getRoutes);
      router.addRoutes(getRoutes)
      router.push({
        path: to.path
      })
      next()
    } //路由表存在 进行权限控制  对于非法访问统一拦截  重定向至无权访问界面
    else {
      if (to.name) {
        next()
      } else {
        store.commit('delMenu')
        store.commit('delRole')
        addRouFlag = false
        next('/403')
      }
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
