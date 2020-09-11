<template>
  <div id="List">
    <div class="tac space-between mb10 mt30 m-x-20">
      <div>
        <div>今日收益合计</div>
        <div
          :class="Compare(profitAmountToday, 0) ? 'red' : 'green'"
        >{{ profitAmountToday }}</div>
      </div>
      <div>
        <div>累计收益合计</div>
        <div
          :class="Compare(profitAmountTotal, 0) ? 'red' : 'green'"
        >{{ profitAmountTotal }}</div>
      </div>
    </div>

    <div
      :key="item.code"
      class="fund-item shadow"
      v-for="item in fundList"
    >
      <div class="content space-between">
        <div>
          <div class="fz18 black1">{{ item.name }}</div>
          <div>{{ item.code }}</div>
        </div>
        <div
          class="tac"
          v-if="item.expectWorth"
        >
          <div
            :class="Compare(item.expectWorth, item.netWorth) ? 'red' : 'green'"
          >{{ item.expectWorth }}</div>
          <div
            :class="Compare(item.expectGrowth, 0) ? 'bg-red' : 'bg-green'"
            class="p-x-5"
            style="border-radius: 2px"
          >{{ item.expectGrowth }}%</div>
        </div>
        <div
          class="tac"
          v-else
        >
          <div>
            <span
              :class="Compare(item.dayGrowth, 0) ? 'red' : 'green'"
            >* {{ item.netWorth }}</span>
          </div>
          <div
            :class="Compare(item.dayGrowth, 0) ? 'bg-red' : 'bg-green'"
            class="p-x-5"
            style="border-radius: 2px"
          >{{ item.dayGrowth }}%</div>
        </div>
      </div>
      <div class="detail space-between mt5">
        <div class="detail-item">
          <div class="fz12">持有成本</div>
          <div>{{ item.cost }}</div>
        </div>
        <div
          class="detail-item"
          v-if="item.profitToday !== 'NaN'"
        >
          <div class="fz12">今日收益</div>
          <div
            :class="Compare(item.profitToday, 0) ? 'red' : 'green'"
          >{{ item.profitToday }}</div>
        </div>
        <div
          class="detail-item"
          v-else
        >
          <div class="fz12">昨日收益</div>
          <div
            :class="Compare(item.profitLastDay, 0) ? 'red' : 'green'"
          >{{ item.profitLastDay }}</div>
        </div>
        <div class="detail-item">
          <div class="fz12">持仓收益</div>
          <div
            :class="Compare(item.profitHold, 0) ? 'red' : 'green'"
          >{{item.expectWorth ? '* ' : ''}}{{ item.profitHold }}{{item.expectWorth ? ' ' : ''}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, useStore } from 'vuex'
import { computed, toRefs } from 'vue'
import { math, Compare } from '../methods'
const { $sum } = math
export default {
  name: 'List',
  setup () {
    const store = useStore()
    const state = {
      fundList: store.getters.fundList
    }
    console.log(22)
    const profitAmount = computed(() => {
      const today = []
      const total = []
      state.fundList.forEach(item => {
        today.push(item.profitToday)
        total.push(item.profitHold)
      })
      console.log(total, today)
      return { profitAmountToday: $sum(...today), profitAmountTotal: $sum(...total) }
    })
    const profitAmountToday = computed(() => (profitAmount.value.profitAmountToday))
    const profitAmountTotal = computed(() => (profitAmount.value.profitAmountTotal))
    return {
      ...toRefs(state),
      profitAmountTotal,
      profitAmountToday,
      Compare
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
  background-color: #fafafa;
  .fund-item {
    background-color: #fff;
    padding: 10px;
    border-radius: 4px;
    margin: 10px;

    .detail {
      &-item {
        text-align: center;

        & > :last-child {
          color: #333;
        }
      }
    }
  }
}
</style>
