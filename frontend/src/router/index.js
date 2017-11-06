import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Router from 'vue-router'
import Vuex from 'vuex'

import backOffice from '@/components/backoffice/backOffice'

// Category CRUD
import ListCategory from '@/components/backoffice/category/list'
import CreateCategory from '@/components/backoffice/category/create'
import UpdateCategory from '@/components/backoffice/category/update'
import DeleteCategory from '@/components/backoffice/category/delete'

// Products CRUD
import ListProduct from '@/components/backoffice/product/list'
import CreateProduct from '@/components/backoffice/product/create'
import UpdateProduct from '@/components/backoffice/product/update'
import DeleteProduct from '@/components/backoffice/product/delete'

// Capacity CRUD
import ListCapacity from '@/components/backoffice/capacity/list'
import CreateCapacity from '@/components/backoffice/capacity/create'
import UpdateCapacity from '@/components/backoffice/capacity/update'
import DeleteCapacity from '@/components/backoffice/capacity/delete'

import Caisse from '@/components/caisse/Caisse'
import Products from '@/components/caisse/Products'
import Sale from '@/components/caisse/Sale'
import Shortcuts from '@/components/caisse/Shortcuts'
import Payments from '@/components/caisse/Payments'
import Total from '@/components/caisse/Total'

Vue.use(Router)
Vue.use(Element)
Vue.use(Vuex)

export default new Router({
  routes: [
    {
      path: '/caisse',
      component: Caisse,
      children: [
        {
          path: '/',
          components: {
            products: Products,
            sale: Sale,
            shortcuts: Shortcuts,
            payments: Payments,
            total: Total
          }
        }
      ]
    },
    {
      path: '/backOffice',
      component: backOffice,
      children: [
        {
          path: '',
          component: ListCapacity
        },
        // Category
        {
          path: 'category',
          component: ListCategory
        },
        {
          path: 'category/create',
          component: CreateCategory
        },
        {
          path: 'category/create/:categoryId?',
          component: CreateCategory
        },
        {
          path: 'category/update',
          component: UpdateCategory
        },
        {
          path: 'category/delete',
          component: DeleteCategory
        },
        // Products
        {
          path: 'product',
          component: ListProduct
        },
        {
          path: 'product/create',
          component: CreateProduct
        },
        {
          path: 'product/update',
          component: UpdateProduct
        },
        {
          path: 'product/delete',
          component: DeleteProduct
        },
        // Capacity
        {
          path: 'capacity',
          component: ListCapacity
        },
        {
          path: 'capacity/create',
          component: CreateCapacity
        },
        {
          path: 'capacity/update',
          component: UpdateCapacity
        },
        {
          path: 'capacity/delete',
          component: DeleteCapacity
        }
      ]
    }
  ]
})
