<script setup lang="ts">
import useCommonStore from '@/store/index'
import { storeToRefs } from 'pinia'

import { useI18n } from 'vue-i18n'

const store = useCommonStore()
const data = storeToRefs(store)
// 常规方法修改内容
const storeAdd = () => {
  data.count.value++
}
// $patch修改内容
const storeAddOne = () => {
  store.$patch({
    count: store.count + 1
  })
}
// $patch修改内容，内带对象
const storeAddTwo = () => {
  store.$patch((state) => {
    state.count++
  })
}
// $state修改整体内容
const storeRest = () => {
  store.$state = {
    count: 1,
    message: 'Hello world',
    phone: 13811111199
  }
}
// $reset重置为初始内容
const storeRestOne = () => {
  store.$reset()
}
// $subscribe监听整个仓库变化
store.$subscribe((mutation, store) => {
  console.log('mutation', mutation)
  console.log('store', store)
})

const { locale } = useI18n() // vue-i18n提供了一个钩子函数 useI18n(),暴露出locale属性用于切换语言
locale.value = 'en_US' // 要切换的语言
// locale.value = 'zh_CN' // 要切换的语言
const chi = useI18n().t('nav.chi')
const eng = useI18n().t('nav.eng')
</script>

<template>
  <div class="box">
    <div>
      国际化测试:{{ chi }}{{ eng }}
      <hr>
      {{ $t("nav.personalCenter") }}
    </div>
    <hr>
    <h2>
      {{ store.count }}
      getters获取值{{ store.countSum }}
      <el-button
        @click="storeAdd"
        type="primary"
      >
        添加一
      </el-button>
      <el-button
        @click="storeAddOne"
        type="primary"
      >
        添加二
      </el-button>
      <el-button
        @click="storeAddTwo"
        type="primary"
      >
        添加三
      </el-button>
      <el-button
        @click="storeRest"
        type="primary"
      >
        重置一
      </el-button>
      <el-button
        @click="storeRestOne"
        type="primary"
      >
        重置二
      </el-button>
      <el-button
        @click="store.countAdd"
        type="primary"
      >
        actions调用
      </el-button>
    </h2>
  </div>
</template>

<style scoped lang="scss">

</style>
