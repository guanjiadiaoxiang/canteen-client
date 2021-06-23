import Vue from 'vue'
import Vuex from 'vuex'

import {reqShops, reqShopDetail, reqBestFoods} from '@/api/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: localStorage.getItem('name'),
    shops: [],
    cartFoods: [],
    orders: [],
    detail: {},
    bestFoods: []
  },
  mutations: {
    /* 同步 */
    incrementFoodCount (state, {food}) {
      if (!food.count) {
        Vue.set(food, 'count', 1)
        state.cartFoods.push(food)
      } else {
        food.count++
      }
    },
    decrementFoodCount (state, {food}) {
      if (food.count) {
        food.count--
        if (food.count === 0) {
          state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
        }
      }
    },
    clearCart (state) {
      /* state.detail.foods.forEach(food => {
        food.count = 0
      }) */
      state.cartFoods = []
    },
    clearOrders (state) {
      state.orders = []
    },
    /* 异步 */
    receiveShops (state, {shops}) {
      state.shops = shops
    },
    receiveShopDetail (state, {detail}) {
      state.detail = detail
    },
    receiveBestFoods (state, {foods}) {
      state.bestFoods = foods
    }
  },
  actions: {
    /* 同步 */
    /*     pay (state) {
      let cartFoods = state.cartFoods
      state.waitFoods = cartFoods
      state.cartFoods = []
      let bestFoods = state.bestFoods
    }, */
    /* 异步 */
    async getShops ({commit, state}) {
      let shops = await reqShops()
      commit('receiveShops', {shops})
    },
    async getShopDetail ({commit}, {name}) {
      let detail = await reqShopDetail(name)
      commit('receiveShopDetail', {detail})
    },
    async getBestFoods ({commit}) {
      let data = await reqBestFoods()
      let foods = data.foods
      commit('receiveBestFoods', {foods})
    }
  }
})
