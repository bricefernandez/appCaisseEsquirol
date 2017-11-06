// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import Vuex from 'vuex'

const store = new Vuex.Store({
  state: {
    totalPrice: 0,
    productList: [],
    productIds: [],
    payment: ''
  },
  mutations: {
    addProduct (state, product) {
      state.productList.push(product)
      state.productIds.push(product.id)
    },
    removeProduct (state, index) {
      state.productList.splice(index, 1)
      state.productIds.splice(index, 1)
    },
    addQuantity (state, index) {
      state.productList[index].quantity ++
    },
    removeQuantity (state, index) {
      state.productList[index].quantity --
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
