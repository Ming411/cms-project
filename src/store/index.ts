import { createStore, useStore as useVuexStore } from 'vuex'
import type { Store } from 'vuex'
import type { IRootState, IStoreType } from './types'
import login from './login/login'
const store = createStore<IRootState>({
  state: {
    name: 'coderccc',
    age: 18
  },
  mutations: {},
  actions: {},
  modules: {
    login
  }
})

export function setupStore() {
  // 初始化store,预防网页刷新后vuex中数据丢失
  store.dispatch('login/loadLocalLogin')
}

// 解决vuex本身类型为any的隐患
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
