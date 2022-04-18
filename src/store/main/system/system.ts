import { IRootState } from '@/store/types'
import { Module } from 'vuex'
import { ISystemState } from './types'
import { getPageListData } from '@/service/main/system/system'
const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state: {
    userList: [],
    userCount: 0,
    roleList: [],
    roleCount: 0
  },
  mutations: {
    changeUserList(state, userList: any[]) {
      state.userList = userList
    },
    changeUserCount(state, userCount: number) {
      state.userCount = userCount
    },
    changeRoleList(state, list: any[]) {
      state.roleList = list
    },
    changeRoleCount(state, count: number) {
      state.roleCount = count
    }
  },
  getters: {
    pageListData: (state) => {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
        // switch (pageName) {
        //   case 'user':
        //     return state.userList
        //   case 'role':
        //     return state.roleList
        // }
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      // console.log(payload)

      // 获取pageurl
      const pageName = payload.pageName
      let pageUrl = ''
      switch (pageName) {
        case 'user':
          pageUrl = '/users/list'
          break
        case 'role':
          pageUrl = '/role/list'
          break
      }
      // 对页面发起请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)
      // 将数据存储到state中
      const { list, totalCount } = pageResult.data
      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)
    }
  }
}
export default systemModule
