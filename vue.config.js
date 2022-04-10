// const path = require('path')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
module.exports = {
  outputDir: './build',
  // 本地预览打包文件使用./，服务端使用 / 默认即可
  // publicPath: './',
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://152.136.185.210:5000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  },
  //   配置一
  configureWebpack: {
    //  configureWebpack这种配置最终会和webpack中的配置进行一个合并
    resolve: {
      alias: {
        // 快捷地址别名
        components: '@/components'
      }
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
  //   配置二
  //   configureWebpack: (config) => {
  //     //  这种函数式的写法不会进行合并，而是直接进行替换，默认webapck会失效
  //     config.resolve.alias = {
  //       '@': path.resolve(__dirname, 'src'),
  //       components: '@/components'
  //     }
  //   },
  //   配置三
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set('@', path.resolve(__dirname, 'src'))
  //     .set('components', '@/components')
  // }
}
