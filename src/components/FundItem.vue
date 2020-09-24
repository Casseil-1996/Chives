<template>
  <div
    @click="showDetail = !showDetail"
    class="fund-item shadow"
  >
    <div class="content space-between">
      <div>
        <div class="fz18 bold">{{ fundItem.name }}</div>
        <div>{{ fundItem.code }}</div>
      </div>
      <div
        class="tar"
        v-if="fundItem.expectWorth"
      >
        <div
          :class="Compare(fundItem.expectWorth, fundItem.netWorth) ? 'red' : 'green'"
        >{{ fundItem.expectWorth }}</div>
        <div
          :class="Compare(fundItem.expectGrowth, 0) ? 'bg-red' : 'bg-green'"
          class="p-x-5 expectGrowth"
          style="border-radius: 2px"
        >{{ fundItem.expectGrowth }}%</div>
      </div>
      <div
        class="tar"
        v-else
      >
        <div>
          <span
            :class="Compare(fundItem.dayGrowth, 0) ? 'red' : 'green'"
          >* {{ fundItem.netWorth }}</span>
        </div>
        <div
          :class="Compare(fundItem.dayGrowth, 0) ? 'bg-red' : 'bg-green'"
          class="p-x-5 expectGrowth"
          style="border-radius: 2px"
        >{{ fundItem.dayGrowth }}%</div>
      </div>
    </div>
    <div
      class="detail space-between mt5"
      v-show="showDetail"
    >
      <div class="detail-item">
        <div>现价/成本</div>
        <div
          :class="ClassName.total"
        >{{ fundItem.expectWorth || fundItem.netWorth }}</div>
        <div>{{ fundItem.cost }}</div>
      </div>
      <div class="detail-item">
        <div>今日/昨日</div>
        <div
          :class="ClassName.today"
        >{{ fundItem.profitToday !== 'NaN' ? fundItem.profitToday : '-' }}</div>
        <div
          :class="Compare(fundItem.profitLastDay, 0) ? 'red' : 'green'"
        >{{ fundItem.profitLastDay }}</div>
      </div>
      <div class="detail-item">
        <div>估值/投入</div>
        <div
          :class="ClassName.total"
        >{{ mul(fundItem.holdCount, fundItem.expectWorth || fundItem.netWorth).toFixed(2) }}</div>
        <div>{{ fundItem.holdAmount }}</div>
      </div>
      <div class="detail-item">
        <div>{{fundItem.expectWorth ? '* ' : ''}}持仓收益</div>
        <div :class="ClassName.total">{{ fundItem.profitHold }}</div>
        <div
          :class="ClassName.total"
        >{{ mul(div(fundItem.profitHold, fundItem.holdAmount),100).toFixed(2) }}%</div>
      </div>
    </div>
    <div
      class="detail space-between mt5"
      v-show="showDetail"
    >
      <Button
        @click.stop="showEdit"
        size="small"
        type="primary"
      >编辑</Button>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs } from 'vue'
import { Compare, math } from '../methods'
import { Button } from 'ant-design-vue'

export default {
  props: {
    fundItem: Object
  },
  setup (props, ctx) {
    const showEdit = () => ctx.emit('show-edit', props.fundItem)
    const state = reactive({ showDetail: false })

    const { profitHold, expectGrowth } = { ...props.fundItem }

    const ClassName = {
      total: Compare(profitHold, 0) ? 'red' : 'green',
      today: Compare(expectGrowth, 0) ? 'red' : 'green'
    }
    const { div, mul } = math
    return { showEdit, ...toRefs(state), Compare, Button, ClassName, div, mul }
  }
}
</script>
<style lang="scss" scoped>
.fund-item {
  background-color: #fff;
  padding: 10px 15px;
  border-radius: 8px;
  margin: 15px;

  .expectGrowth {
    text-align: right;
    min-width: 50px;
    font-weight: bold;
    font-size: 12px;
  }

  .detail {
    &-item {
      text-align: center;
      font-size: 12px;

      & > :not(:first-child) {
        color: #333;
        font-weight: bold;
      }

    }
  }
}
</style>
