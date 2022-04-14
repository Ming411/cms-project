import type { RouteRecordRaw } from 'vue-router'
export function mapMenusToRoutes(userMenus: any[]): any[] {
  const routes: RouteRecordRaw[] = []
  // 1. 先去加载默认的所有routes
  const allRoutes: any[] = []
  // require.context() 是webpack中的方法，true表示启用递归查找,false 的话只查找mian根目录
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    // key为相对main文件夹下的文件路径
    const route = require('../router/main' + key.slice(1))
    allRoutes.push(route)
  })
  // console.log(allRoutes)
  // 2. 根据菜单获取添加的routes
  // recurse 递归的意思
  const _recurseGetRoute = (userMenus: any[]) => {
    for (const menu of userMenus) {
      // menu为真实用户的菜单
      if (menu.type === 2) {
        // find 找到第一个符合的元素
        const route = allRoutes.find((route) => {
          // console.log(route.default.path)
          return route.default.path === menu.url
        })
        if (route) routes.push(route)
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(userMenus)
  return routes
}
