import { IBreadcrumb } from '@/base-ui/breadcrumb'
import type { RouteRecordRaw } from 'vue-router'

let firstMenu: any = null

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
        if (!firstMenu) {
          // 当从首页进来直接保存第一个菜单来显示
          firstMenu = menu
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(userMenus)
  return routes
}
export { firstMenu }
// 通过路由地址取到menu
/* export function pathMapToMenu(userMenus: any[], currentPath: string): any {
  // currentPath 从首页来的时候时main匹配不的
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
} */

// 面包屑跳转
/* export function pathMapBreadcrumbs(userMenus: any[], currentPath: string): any {
  const breadCrumbs: IBreadcrumb[] = []
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadCrumbs.push({ name: menu.name, path: menu.url })
        breadCrumbs.push({ name: findMenu.name, path: findMenu.url })
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      // 只存在一级菜单的时候就不显示面包屑
      return menu
    }
  }
  return breadCrumbs
} */

// 抽取上面两个方法的代码
export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadCrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadCrumbs)
  return breadCrumbs
}

export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadCrumbs?: any[]
): any {
  // currentPath 从首页来的时候时main匹配不的
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadCrumbs?.push({ name: menu.name })
        breadCrumbs?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

export function mapMenusToPermissions(userMenus: any[]) {
  const permissions: string[] = []

  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPermission(userMenus)

  return permissions
}

// 提取选中的树结构
export function menuMapLeafKeys(menuList: any[]) {
  const leftKeys: number[] = []
  const _recurseGetLeaf = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetLeaf(menu.children)
      } else {
        leftKeys.push(menu.id)
      }
    }
  }
  _recurseGetLeaf(menuList)
  return leftKeys
}
