<template>
  <div id="List">
    <div class="tac space-between mb10 mt30 m-x-10 header">
      <div
        :key="item.label"
        class="shadow"
        v-for="item in headerData"
      >
        <div>{{ item.label }}</div>
        <div
          :class="Compare(item.value, 0) ? 'red' : 'green'"
          class="bold"
        >{{ item.value }}</div>
      </div>
    </div>
    <FundItem
      :fundItem="item"
      :key="item.code"
      @show-edit="showEdit"
      v-for="item in fundList"
    />
    <FundEdit
      :currentEditItem="currentEditItem"
      @cancel="currentEditItem = null"
    />
  </div>
</template>

<script>
import { mapActions, useStore } from 'vuex'
import { computed, reactive, toRefs } from 'vue'
import { math, Compare } from '../methods'
import FundEdit from '@/components/FundEdit'
import FundItem from '@/components/FundItem'
import { Button } from 'ant-design-vue'

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

    const profitAmountToday = computed(() => (profitAmount.value.profitAmountToday))
    const profitAmountTotal = computed(() => (profitAmount.value.profitAmountTotal))
    const profitAmountLastDay = computed(() => (profitAmount.value.profitAmountLastDay))

    const headerData = [{
      label: '今日',
      value: profitAmountToday.value
    }, {
      label: '昨日',
      value: profitAmountLastDay.value
    }, {
      label: '持仓',
      value: profitAmountTotal.value
    }]

    const showEdit = (item) => {
      state.currentEditItem = item
      console.log(state.currentEditItem)
    }

    return {
      ...toRefs(state),
      headerData,
      Compare,
      FundEdit,
      FundItem,
      Button,
      showEdit
    }
  },
  created () {
    this.getFundList()
  },
  methods: {
    ...mapActions(['getFundList']),
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
}
</style>
