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
    totalDiscounted: 0,
    productList: [],
    productIds: [],
    payment: 'cb',
    url: 'http://api.caissemoulinesquirol.ovh/'
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
    setQuantity (state, data) {
      let oldQuantity = state.productList[data.index].quantity
      state.productList[data.index].quantity = data.quantity
      state.totalPrice += state.productList[data.index].price * (data.quantity - oldQuantity)
    },
    removeQuantity (state, index) {
      state.productList[index].quantity --
      state.totalPrice -= state.productList[index].price
    },
    setPrice (state, data) {
      let oldPrice = state.productList[data.index].price
      state.productList[data.index].price = data.price
      state.totalPrice -= oldPrice - data.price
    },
    updatePayment (state, payment) {
      state.payment = payment
    },
    hackUpdate (state) {
      state.productList.push({})
      state.productList.pop()
    },
    setDiscountedTotal (state, price) {
      state.totalDiscounted = price
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
