import { createStore } from 'vuex'
import type { IRootState } from './types'
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

export default store
