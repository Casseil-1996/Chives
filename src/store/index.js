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
          target.netWorth = item.netWorth
          target.name = item.name
          target.holdCount = div(target.holdAmount, target.cost).toFixed(2)
          target.profitHold = (((item.expectWorth || item.netWorth) * target.holdCount) - target.holdAmount).toFixed(2)
          target.profitToday = mul(target.holdCount, sub(Number(item.expectWorth), Number(item.netWorth))).toFixed(2)
          target.profitLastDay = mul(target.holdAmount, div(item.dayGrowth, 100)).toFixed(2)
          target.dayGrowth = item.dayGrowth
          target.expectGrowth = item.expectGrowth
        })
        commit('updateFundVal', fundList)
      })
    }
  },
  modules: {
  }
})
