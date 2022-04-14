import { Module } from 'vuex'
import { IAccount } from '@/service/login/types'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'
import { ILoginState } from './types'
import type { IRootState } from '../types'
import localCache from '@/utils/cache'
import router from '@/router/index'
import { mapMenusToRoutes } from '@/utils/map-menus'
const loginModule: Module<ILoginState, IRootState> = {
  // 需要传递两个泛型，第一个为子模块state的类型，第二个为根模块state的类型
  namespaced: true,
  state: {
    token: '',
    userInfo: '',
    userMenus: []
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      // userMenus ==> routes
      const routes = mapMenusToRoutes(state.userMenus)
      // 拿到和用户对应的路由模块
      routes.forEach((route) => {
        // 将路由添加到main中
        router.addRoute('main', route.default)
      })
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      // 调用登录接口
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token)
      // 请求用户信息数据
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userinfo', userInfo)
      // 请求用户对应的菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)
      // 跳转到首页
      router.push('/main')
    },
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  },
  getters: {}
}

export default loginModule
