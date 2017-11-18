// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Icon from 'vue-awesome/components/Icon'

Vue.config.productionTip = false

import Vuex from 'vuex'

const store = new Vuex.Store({
  state: {
    totalPrice: 0,
    productList: [],
    productIds: [],
    payment: 'cb'
  },
  mutations: {
    addProduct (state, product) {
      state.productList.push(product)
      state.productIds.push(product.id)
      state.totalPrice += product.price
    },
    removeProduct (state, index) {
      state.totalPrice -= state.productList[index].price
      state.productList.splice(index, 1)
      state.productIds.splice(index, 1)
    },
    addQuantity (state, index) {
      state.productList[index].quantity ++
      state.totalPrice += state.productList[index].price
    },
    removeQuantity (state, index) {
      state.productList[index].quantity --
      state.totalPrice -= state.productList[index].price
    },
    updatePayment (state, payment) {
      state.payment = payment
    },
    hackUpdate (state) {
      state.productList.push({})
      state.productList.pop()
    }
  }
})

// globally (in your main .js file)
Vue.component('icon', Icon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
