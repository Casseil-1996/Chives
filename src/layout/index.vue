<template>
  <div class="layout">
    <router-view class="page"></router-view>
    <tabBar />
  </div>
</template>

<script>
import tabBar from './tabBar'
import { Button } from 'ant-design-vue'

export default {
  name: '',
  setup () {
    return { tabBar, Button }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100%;

  .page {
    overflow: auto;
    flex: 1;
  }
}
</style>
