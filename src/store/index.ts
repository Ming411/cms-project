import { createStore, useStore as useVuexStore } from 'vuex'
import type { Store } from 'vuex'
import type { IRootState, IStoreType } from './types'
import login from './login/login'
import system from './main/system/system'
import { getPageListData } from '@/service/main/system/system'
const store = createStore<IRootState>({
  state: {
    name: 'coderccc',
    age: 18,
    // 全部部门和全部角色
    entireDepartment: [],
    entireRole: [],
    entireMenu: []
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      // 请求部门角色数据
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data

      // 所有的菜单列表
      const menuResult = await getPageListData('/menu/list', {})
      const { list: menuList } = menuResult.data
      // 保存数据
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
      commit('changeEntireMenu', menuList)
    }
  },
  modules: {
    login,
    system
  }
})

export function setupStore() {
  // 初始化store,预防网页刷新后vuex中数据丢失
  store.dispatch('login/loadLocalLogin')
  // store.dispatch('getInitialDataAction')
}

// 解决vuex本身类型为any的隐患
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
