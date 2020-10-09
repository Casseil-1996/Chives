<template>
  <div id="List">
    <div class="tac space-between mb10 mt30 m-x-10 header">
      <div :key="item.label" class="shadow" v-for="item in headerData">
        <div>{{ item.label }}</div>
        <div :class="item.className + ' bold'">
          {{ item.value }}
        </div>
      </div>
    </div>
    <FundItem
      :fundItem="item"
      :key="item.code"
      @show-edit="(item) => (currentEditItem = item)"
      v-for="item in fundList"
    />
    <FundEdit
      :currentEditItem="currentEditItem"
      @cancel="currentEditItem = null"
    />
    <div>
      <Button class="shadow reload-btn" @click="getFundList" shape="circle">
        <ReloadOutlined />
      </Button>
    </div>
  </div>
</template>

<script>
import { mapActions, useStore } from 'vuex'
import { computed, reactive, toRefs } from 'vue'
import { math, Compare } from '../methods'
import FundEdit from '@/components/FundEdit'
import FundItem from '@/components/FundItem'
import { Button } from 'ant-design-vue'
import { ReloadOutlined } from '@ant-design/icons-vue'

const { $sum } = math
export default {
  name: 'List',
  setup () {
    const store = useStore()

    const state = reactive({
      fundList: store.getters.fundList,
      currentEditItem: null
    })

    const profitAmount = computed(() => {
      const today = []
      const total = []
      const lastDay = []

      state.fundList.forEach(item => {
        today.push(item.profitToday)
        total.push(item.profitHold)
        lastDay.push(item.profitLastDay)
      })
      return {
        profitAmountToday: $sum(...today),
        profitAmountTotal: $sum(...total),
        profitAmountLastDay: $sum(...lastDay)
      }
    })

    const headerData = [{
      label: '今日',
      value: profitAmount.value.profitAmountToday.toFixed(2),
      className: Compare(profitAmount.value.profitAmountToday, 0) ? 'red' : 'green'
    }, {
      label: '昨日',
      value: profitAmount.value.profitAmountLastDay.toFixed(2),
      className: Compare(profitAmount.value.profitAmountLastDay, 0) ? 'red' : 'green'
    }, {
      label: '持仓',
      value: profitAmount.value.profitAmountTotal.toFixed(2),
      className: Compare(profitAmount.value.profitAmountTotal, 0) ? 'red' : 'green'
    }]

    return {
      ...toRefs(state),
      headerData,
      Compare,
      FundEdit,
      FundItem,
      Button,
      ReloadOutlined
    }
  },
  created () {
    this.getFundList()
  },
  methods: {
    ...mapActions(['getFundList']),
    reload () {

    }
  }
}
</script>
<style lang="scss" scoped>
#List {
  background-color: #f5f5f5;

  .header {
    > * {
      background-color: #fff;
      border-radius: 6px;
      padding: 5px 0;
      flex: 1;
      margin: 5px;
    }
  }

  .reload-btn {
    $offset: 20px;
    bottom: 64px + $offset;
    position: fixed;
    right: $offset;
  }
}
</style>
