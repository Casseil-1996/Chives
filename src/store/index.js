import { createStore } from 'vuex'
import { fundAPI } from '../API'
import { div, mul, sub } from '../methods/math'
console.log(sub(0.2, 0.1))
export default createStore({
  state: {
    fundList: JSON.parse(localStorage.fundList || '[]'),
  },
  mutations: {
    updateFundVal (state, newVal) {
      localStorage.fundList = JSON.stringify(newVal)
      state.fundList = newVal
    }
  },
  getters: {
    fundList: state => {
      return state.fundList
    }
  },
  actions: {
    getFundList ({ getters: { fundList }, commit }) {
      const code = fundList.map(item => item.code)
      fundAPI.query(code).then(res => {
        const { data } = res
        data.forEach(item => {
          const target = fundList.find(fund => fund.code == item.code)
          target.expectWorth = item.expectWorth
          
          // 净值 (份)
          target.netWorth = item.netWorth
          target.name = item.name
          // 持有量 (份)
          target.holdCount = div(target.holdAmount, target.netWorth).toFixed(2)
          // 最新总价 (元)
          target.valuation = mul((item.expectWorth || item.netWorth), target.holdCount)
          // 持仓总收益 (元)
          target.profitHold = sub(target.valuation, target.holdAmount).toFixed(2)
          // 今日收益 (元)
          target.profitToday = mul(target.holdCount, sub(Number(item.expectWorth), Number(item.netWorth))).toFixed(2)
          // 昨日收益 (元)
          target.profitLastDay = mul(target.holdAmount, div(item.dayGrowth, 100)).toFixed(2)
          // 日涨幅 (%)
          target.dayGrowth = item.dayGrowth
          // 预计净值涨跌 (元/份)
          target.expectGrowth = item.expectGrowth
        })
        commit('updateFundVal', fundList)
      })
    }
  },
  modules: {
  }
})
