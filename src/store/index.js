import { createStore } from 'vuex'
import { fundAPI } from '../API'
export default createStore({
  state: {
    fund: [{
      cost: 1.0240,
      holdAmount: 6458.23,
      code: 161725
    }],
  },
  mutations: {
    updateFundVal (state, newVal) {
      console.log(newVal)
    }
  },
  getters: {
    fundList: state => {
      return state.fund
    }
  },
  actions: {
    getFundList ({ getters: { fundList }, commit }) {
      console.log(fundList, commit)
      const code = fundList.map(item => item.code)
      fundAPI.query(code).then(res => {
        console.log(res)
        const { data } = res
        data.forEach(item =>
          fundList.find(fund => fund.code == item.code).expectWorth = item.expectWorth
        )
        commit('updateFundVal', fundList)
      })
    }
  },
  modules: {
  }
})
