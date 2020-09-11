<template>
  <div
    class="border_t"
    id="tabBar"
  >
    <div
      :class="{active:route.fullPath==='/'}"
      @click="router.push('/')"
      class="item"
    >
      <HomeOutlined class="icon" />
      <span>首页</span>
    </div>
    <div
      :class="{active:route.fullPath==='/list'}"
      @click="router.push('/list')"
      class="item"
    >
      <LineChartOutlined class="icon" />
      <span>统计</span>
    </div>
  </div>
</template>

<script>
import {
  HomeOutlined,
  LineChartOutlined
} from '@ant-design/icons-vue'
import { useRoute, useRouter } from 'vue-router'
export default {
  name: 'tabBar',
  setup () {
    const [route, router] = [useRoute(), useRouter()]
    return {
      HomeOutlined,
      LineChartOutlined,
      route, router
    }
  }
}
</script>

<style lang="scss" scoped>
#tabBar {
  justify-content: space-around;
  display: flex;
  height: 64px;

  .item {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    display: flex;
    flex: 1;

    &.active {
      color: #1890ff;
    }

    .icon {
      font-size: 24px;
    }
  }
}
</style>
