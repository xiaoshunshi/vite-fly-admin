import { createI18n } from 'vue-i18n'

// 自定义国际化文件
import zh_CN from './zh_CN'
import en_US from './en_US'

const i18n = createI18n({
  legacy: false, // Composition API 模式
  globalInjection: true, // 全局注册 $t方法
  // 默认语言
  locale: 'zh_CN',
  // 语言库
  messages: {
    zh_CN,
    en_US
  }
})

// 将i18n暴露出去，在main.js中引入挂载
export default i18n
