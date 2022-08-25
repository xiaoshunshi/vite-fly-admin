<template>
  <div class="login-container">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="rules"
      class="login-form"
      status-icon
    >
      <div class="title-container">
        <h3 class="title">
          {{ $t("login.title") }}
        </h3>
      </div>
      <el-form-item
        prop="username"
      >
        <el-input
          v-model="loginForm.username"
          :clearable="true"
          :placeholder="$t('login.loginForm.userMsg')"
        />
      </el-form-item>
      <el-form-item
        prop="password"
      >
        <el-input
          v-model="loginForm.password"
          type="password"
          :clearable="true"
          :placeholder="$t('login.loginForm.pwdMsg')"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          :disabled="disabledLogin"
          type="primary"
          style="width: 100%"
          @click.prevent="loginHandle"
        >
          {{ $t('login.loginForm.loginBtn') }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang='ts' setup>
import { computed, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useI18n } from 'vue-i18n'

import { Login } from '@/api/login'
defineOptions({
  name: 'login'
})
const loginFormRef = ref<FormInstance>()
const loginForm = reactive({
  username: 'admin',
  password: '123456'
})

const loading = ref<boolean>(false)
const trigger = ['blur', 'change']
const rules = reactive<FormRules>({
  username: [{ required: true, message: useI18n().t('login.loginForm.userMsg'), trigger },
    { min: 3, max: 5, message: useI18n().t('login.loginForm.userMsglimit'), trigger }],
  password: [
    { required: true, message: useI18n().t('login.loginForm.pwdMsg'), trigger }
  ]
})
const disabledLogin = computed(():boolean => {
  const { username, password } = loginForm
  return !username || !password
})

function loginHandle () {
  loading.value = true
  loginFormRef.value?.validate(async (valid:boolean):Promise<void> => {
    if (valid) {
      // 登录逻辑
      Login(loginForm).then(res => {
        console.log(res)
      })
    }
  })
}

</script>
<style lang='scss' scoped>
$bg:#2d3a4b;
$light_gray:#eee;
.login-container{
  min-height: 100%;
  width: 100%;
  background-color:$bg;
  overflow: hidden;
   .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  }
}
</style>
