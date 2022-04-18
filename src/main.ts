import { createApp } from 'vue'
import { globalRegister } from '@/global'
// 全局引入
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入初始化css
import 'normalize.css'
import '@/assets/css/index.less'
import * as Elicons from '@element-plus/icons-vue'
//引入Elmessage和Elloading的css样式文件
import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/el-message.css'
// 国际化
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { setupStore } from '@/store/index'
// 导入封装好的请求类
// import hyRequest from './service'

const app = createApp(App)

// 将其默认语言改成中文
app.use(ElementPlus, {
  locale: zhCn
})

//全局注册elementplus icon
Object.keys(Elicons).forEach((key) => {
  app.component(key, Elicons[key as keyof typeof Elicons])
})

// 以下两种方式效果等同
// globalRegister(app)
app.use(globalRegister) // 默认给globalRegister传递app参数

// 每次刷新后重新给vuex中存入数据
setupStore()

// app.use(ElementPlus)
app.use(store)
app.use(router)

// 单独封装
// app.config.globalProperties.$filters = {
//   foo() {
//     console.log('foo')
//   },
//   formatTime(value: string) {
//     return 2022
//   }
// }

app.mount('#app')
// console.log(process.env.VUE_APP_BASE_URL)

// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }

// hyRequest
//   .request<DataType>({
//     url: '/home/multidata',
//     method: 'GET',
//     showLoading: false
//     // interceptors: {
//     //   responseInterceptors: (config) => {
//     //     console.log('single')
//     //     return config
//     //   },
//     //   responseInterceptorsCatch: (res) => {
//     //     console.log('single')
//     //     return res
//     //   }
//     // }
//   })
//   .then((res) => {
//     // console.log(res.data)
//     // console.log(res.returnCode)
//     // console.log(res.success)
//   })
