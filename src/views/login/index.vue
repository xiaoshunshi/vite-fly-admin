<template>
  <div class="login-container">
    <img
      :src="logo"
      alt=""
      srcset=""
    >
  </div>
</template>
<script lang='ts' setup>
import logo from '@/assets/login/logo.jpeg'
</script>
<style lang='scss' scoped>
.login-container{
  height: 100vh;
  background-color: #2d3a4b;
}
</style>
