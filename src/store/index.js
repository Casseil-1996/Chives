import { createStore } from 'vuex'
import { fundAPI } from '../API'
import { div, mul, sub } from '../methods/math'
console.log(sub(0.2, 0.1))
export default createStore({
  state: {
    fund: [{
      cost: 1.0240,
      holdAmount: 6458.23,
      code: '161725'
    }, {
      cost: 3.5455,
      holdAmount: 5944.98,
      code: '040046'
    }, {
      cost: 4.0140,
      holdAmount: 4700.77,
      code: '000294'
    }, {
      cost: 1.0120,
      holdAmount: 5053.36,
      code: '009714'
    }, {
      cost: 6.0708,
      holdAmount: 1406.28,
      code: '519674'
    }, {
      cost: 2.3331,
      holdAmount: 4755.17,
      code: '260108'
    }, {
      cost: 1.1459,
      holdAmount: 11137.7,
      code: '001595'
    }, {
      cost: 1.1278,
      holdAmount: 2066.11,
      code: '000962'
    }, {
      cost: 4.8600,
      holdAmount: 2879.70,
      code: '000751'
    }, {
      cost: 0.7377,
      holdAmount: 4230.83,
      code: '160723'
    }, {
      cost: 3.2591,
      holdAmount: 2671.23,
      code: '005911'
    }, {
      cost: 3.2732,
      holdAmount: 1425.03,
      code: '270042'
    }, {
      cost: 3.2135,
      holdAmount: 2116.60,
      code: '006479'
    }, {
      cost: 1.0442,
      holdAmount: 5584.37,
      code: '002979'
    }, {
      cost: 1.0012,
      holdAmount: 200.41,
      code: '008638'
    }, {
      cost: 1.0861,
      holdAmount: 2704.35,
      code: '160222'
    }, {
      cost: 1.8609,
      holdAmount: 1472.41,
      code: '161903'
    }, {
      cost: 2.6954,
      holdAmount: 2257.19,
      code: '481010'
    }, {
      cost: 1.2484,
      holdAmount: 1096.80,
      code: '161030'
    }, {
      cost: 2.3592,
      holdAmount: 1130.71,
      code: '002851'
    }],
  },
  mutations: {
    updateFundVal (state, newVal) {
      state.fundList = newVal
    }
  },
  getters: {
    fundList: state => {
      return state.fund
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
