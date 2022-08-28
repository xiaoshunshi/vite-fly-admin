<template>
  <div class="app-wraper">
    <div class="layout-section">
      <SideBar />
    </div>
  </div>
</template>
<script lang='ts' setup>
import SideBar from './components/sidebar/index.vue'
</script>
<style lang='scss' scoped>
.app-wraper{
    position: relative;
    height: 100%;
    width: 100%;
}
</style>
