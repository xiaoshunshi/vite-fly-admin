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

  

##  配置GitCommit

- 
- 

## 代办

- [x] 创建github仓库
- [x] 配置vite.cofnig.ts 配置别名
- [x] 配置eslint
- [ ] 配置GitCommit

