# vite-fly-damin

## 配置别名
- 安装@node/paths

  ```
  import path from 'path'
  const resolve = (dir: string) => path.join(__dirname, dir)
  
  
  
  
   resolve: {
      alias: {
        '@': resolve('src')
      }
    },
      
  ```

- 配置serve

  ```
  server: {
      // 服务器主机名
      // host: '',
      // 端口号
      port: 3088,
      // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
      strictPort: false,
      // 服务器启动时自动在浏览器中打开应用程序,当此值为字符串时，会被用作 URL 的路径名
      open: true,
      // 自定义代理规则
      proxy: {
        // 选项写法
        '/api': {
          target: 'http://jsonplaceholder.typicode.com',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    }
  ```

  

## 配置 eslint

- 安装eslint   `yarn add eslint -D`

- 初始化eslint `npx eslint --init `

  ```
  You can also run this command directly using 'npm init @eslint/config'.
  Need to install the following packages:
    @eslint/create-config
  Ok to proceed? (y)
  
  // To check syntax, find problems, and enforce code style
  ? How would you like to use ESLint? ...
    To check syntax only
    To check syntax and find problems
  > To check syntax, find problems, and enforce code style
  
  // JavaScript modules
  ? What type of modules does your project use? ... 
  > JavaScript modules (import/export)
    CommonJS (require/exports)
    None of these
    
  // vue.js
  ? Which framework does your project use? ... 
    React
  > Vue.js
    None of these
    
  // yes
  ? Does your project use TypeScript? » No / Yes
  
  
  // 使用空格选择两个
  ? Where does your code run? ...  (Press <space> to select, <a> to toggle all, <i> to invert selection)
  √ Browser
  √ Node
  

  //  Use a popular style guide
  ? How would you like to define a style for your project? ... 
  > Use a popular style guide
    Answer questions about your style
    
  // Standard
  ? Which style guide do you want to follow? ...
    Airbnb: https://github.com/airbnb/javascript
  > Standard: https://github.com/standard/standard        
    Google: https://github.com/google/eslint-config-google
    XO: https://github.com/xojs/eslint-config-xo
    
  // JavaScript
  ? What format do you want your config file to be in? ... 
  > JavaScript
    YAML
    JSON
    
  // 根据自己的环境选择
  Checking peerDependencies of eslint-config-standard@latest       
  The config that you've selected requires the following dependencies:
  
  eslint-plugin-vue@latest @typescript-eslint/eslint-plugin@latest eslint-config-standard@latest eslint@^8.0.1 eslint-plugin-import@^2.25.2 eslint-plugin-n@^15.0.0 eslint-plugin-promise@^6.0.0 @typescript-eslint/parser@latest
  √ Would you like to install them now? · No / Yes
  ? Which package manager do you want to use? ... 
    npm
  > yarn
    pnpm
  ```
  
- 配置vue3的校验

  ```
  // .eslintrc.js
  module.exports = {
    ...
    extends: [
      // 'plugin:vue/essential',
      // 使用 vue3 规则
      'plugin:vue/vue3-strongly-recommended',
      'standard'
    ],
    ...
  }
  ```

- 添加校验脚本

  ```
  "lint": "eslint src/**/*.{js,jsx,vue,ts,tsx} --fix"
  ```

- 在vscode编辑器扩展中禁用 Vetur

- 在vscode编辑器扩展中安装 eslint 插件

- 在vscode编辑器扩展中安装Vue Language Features (Volar)

##  配置GitCommit

- 配置 git  commit hook 

  ```
  npx mrm@2 lint-staged
  ```

- 在代码提交之前，进行代码规则检查能够确保进入git库的代码都是符合代码规则的。但是整个项目上运行lint速度会很慢，lint-staged能够让lint只检测暂存区的文件，所以速度很快。 

- 配置 prepare、lint-staged

  ```
  // package.json
  {
    "version": "0.0.0",
    "scripts": {
      "dev": "vite",
      "build": "vue-tsc --noEmit && vite build",
      "serve": "vite preview",
      "lint": "eslint ./src/**/*.ts ./src/**/*.vue --cache --fix",
      "prepare": "husky install"
    },
    "lint-staged": {
      "*.{js,jsx,vue,ts,tsx}": [
        "npm run lint",
      ]
    }
  }
  
  ```

- 安装vite-plugin-eslint 

  ```
  yarn add vite-plugin-eslint -D
  ```

- 配置vite-plugin-eslint 
  ```
  // vite.config.ts
   
  import { defineConfig } from 'vite'
  import vue from '@vitejs/plugin-vue'
  import eslintPlugin from 'vite-plugin-eslint'
   
  // https://vitejs.dev/config/
  export default defineConfig({
    plugins: [
      vue(),
      eslintPlugin({
        cache: false
      })
    ]
  })
  ```


- git commit 规范

  1. feat：新功能（feature）
  2. fix：修补bug
  3. docs：文档（documentation）
  4. style： 格式（不影响代码运行的变动）
  5. refactor：重构（即不是新增功能，也不是修改bug的代码变动）
  6. test：增加测试
  7. chore：构建过程或辅助工具的变动

-  添加commit-msg

  ```
  yarn husky add .husky/commit-msg 
  ```

- 再生成的文件中

  ```
  #!/usr/bin/env sh
  . "$(dirname -- "$0")/_/husky.sh"
  
  # undefined
  npx --no -- commitlint --edit $1 
  ```

   将 commit-msg 文件的 undefined 内容修改为 npx --no -- commitlint --edit $1 

- 在根目录新建 commitlint.config.js   

- yarn add  @commitlint/cli @commitlint/config-conventional  -D

  ```
  // commitlint.config.js
   
  module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
      'type-enum': [2, 'always', [
        'build',
        'ci',
        'chore',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test'
      ]]
      // 'subject-full-stop': [0, 'never'],
      // 'subject-case': [0, 'never']
    }
  }
  //   build：主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交
  //   ci：主要目的是修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle等)的提交
  //   docs：文档更新
  //   feat：新增功能
  //   fix：bug 修复
  //   perf：性能优化
  //   refactor：重构代码(既没有新增功能，也没有修复 bug)
  //   style：不影响程序逻辑的代码修改(修改空白字符，补全缺失的分号等)
  //   test：新增测试用例或是更新现有测试
  //   revert：回滚某个更早之前的提交
  //   chore：不属于以上类型的其他类型
  ```

- 移除package.json中的type：‘module’

## 安装element-plus

- ```
  yarn add element-plus
  ```

- 使用按需加载  yarn add -D unplugin-vue-components unplugin-auto-import

  ```
  // vite.config.ts
  import { defineConfig } from 'vite'
  import AutoImport from 'unplugin-auto-import/vite'
  import Components from 'unplugin-vue-components/vite'
  import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
  
  export default defineConfig({
    // ...
    plugins: [
      // ...
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  })
  ```

## 添加vue-router

- 安装

  ```
  yarn add vue-router@next
  ```

-  在目录 src 下新建 router/index.ts index.ts： 

  ```
  import { createRouter, createWebHistory } from 'vue-router'
  import type { App } from 'vue'
  import HelloWorld from '../components/HelloWorld.vue'
  
  const routerHistory = createWebHistory()
  // createWebHashHistory hash 路由
  // createWebHistory history 路由
  // createMemoryHistory 带缓存 history 路由
  
  const router = createRouter({
  	history: routerHistory,
  	routes: [
  		{
  			path: '/',
  			component: HelloWorld
  		}
  	]
  })
  
  // 删除/重置路由
  export function resetRoute(): void {
  	router.getRoutes().forEach(route => {
  		const { name } = route
  		if (name) {
  			router.hasRoute(name) && router.removeRoute(name)
  		}
  	})
  }
  
  export function setupRouter(app: App<Element>) {
  	app.use(router)
  }
  export default router
  ```

- main.ts

  ```
  import router, { setupRouter } from './router' // 路由
  
  
  ```

## 使用pinia

- 安装   yarn add pinia

  ```
  // main.ts
  import { createPinia } from 'pinia'
  app.use(createPinia())
  ```

- src下创建store文件夹，创建index.ts

  ```
  
  import { defineStore } from 'pinia'
  export default defineStore('myGlobalState', {
    state: () => {
      return {
        count: 1,
        message: 'Hello world',
      }
    },
    actions: {
      countAdd () {
        this.count++
      }
    },
    getters: {
      countSum (state) {
        return state.count * 2
      }
    }
  
  })
  
  ```

## 安装sass 

- yarn add sass 

- yarn add normalize.scss

  ```
  // main.ts
  import { createApp } from 'vue'
  import router, { setupRouter } from './router' // 路由
  import { createPinia } from 'pinia'
  import App from './App.vue'
  import 'normalize.scss/normalize.scss'
  const app = createApp(App)
  app.use(createPinia())
  setupRouter(app) // 引入路由
  router.isReady().then(() => {
    app.mount('#app')
  })
  
  ```

  

## 待办

- [x] 创建github仓库
- [x] 配置vite.cofnig.ts 配置别名
- [x] 配置eslint
- [x] 配置GitCommit
- [x] 添加elementplus
- [x] 添加vue-router
- [x] 添加pinia
- [ ] 添加axios
- [x] 安装sass    添加normalize.scss

