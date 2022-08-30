import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import eslintPlugin from 'vite-plugin-eslint'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import DefineOptions from 'unplugin-vue-define-options/vite'
import { viteMockServe } from 'vite-plugin-mock'
import path from 'path'

import { isMock } from './mock/config'
const resolve = ( dir: string ) => path.join( __dirname, dir )
// https://vitejs.dev/config/
export default defineConfig( {
  plugins : [

    vue(),
    viteMockServe( {
      mockPath : 'mock', // 解析，路径可根据实际变动
      localEnabled : isMock, // 开发环境
      prodEnabled : false, // 生产环境设为true，也可以根据官方文档格式
      injectCode :
      ` import { setupProdMockServer } from './src/mock';
        setupProdMockServer(); `,
      watchFiles : true, // 监听文件内容变更
      injectFile : resolve( 'src/main.ts' )
    }
    ),
    // cache设为false表示不做eslint缓存，如果你有eslint报错，然后改好之后还报同样的错，就跟没改一样没有效果，就可以添加cache: false，删掉缓存，页面及时更新
    eslintPlugin( {
      cache : false
    } ),
    // 定义vue的name
    DefineOptions(),
    // 配置element的按需引入
    AutoImport( {
      resolvers : [ElementPlusResolver()]
    } ),
    Components( {
      resolvers : [ElementPlusResolver()]
    } )
  ],
  resolve : {
    // 设置别名
    alias : {
      '@' : resolve( 'src' )
    }
  },
  css : {
    preprocessorOptions : {
      scss : {
        // 两种方式都可以
        // additionalData: '@import "normalize.scss/normalize.scss";'
        // additionalData: '@use "@/assets/scss/global.scss" as *;'
      }
    }
  },
  server : {
    // 服务器主机名
    host : '0.0.0.0',
    // 端口号
    port : 3088,
    // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
    strictPort : false,
    // 服务器启动时自动在浏览器中打开应用程序,当此值为字符串时，会被用作 URL 的路径名
    open : true,
    // 自定义代理规则
    proxy : {
      // 选项写法
      '/api' : {
        target : 'https://www.fastmock.site/mock/935974cbe8285109b2162d84b5d52c3c/api',
        changeOrigin : true,
        rewrite : path => path.replace( /^\/api/, '' )
      }
    }
  }
} )
