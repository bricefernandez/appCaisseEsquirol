// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

Vue.config.productionTip = false

import Vuex from 'vuex'

const store = new Vuex.Store({
  state: {
    totalPrice: 0,
    discount: 0,
    totalBeforeDiscount: 0,
    productList: [],
    productIds: [],
    payment: 'cb',
    url: 'http://api.caissemoulinesquirol.ovh/'
    // url: 'http://localhost:8080'
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
    setQuantity (state, data) {
      state.productList[data.index].quantity = data.quantity
    },
    removeQuantity (state, index) {
      state.productList[index].quantity --
    },
    setPrice (state, data) {
      state.productList[data.index].price = data.price
    },
    updatePayment (state, payment) {
      state.payment = payment
    },
    hackUpdate (state) {
      state.productList.push({})
      state.productList.pop()
    },
    setDiscount (state, discount) {
      state.discount = discount
    },
    calculateTotal (state) {
      let total = 0
      for (let i = 0; i < state.productList.length; i++) {
        total += state.productList[i].price * state.productList[i].quantity
      }
      state.totalBeforeDiscount = parseFloat(total.toFixed(2))
      if (state.discountTotal !== 0) {
        total = total * (1 - state.discount / 100)
      }
      state.totalPrice = parseFloat(total.toFixed(2))
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
