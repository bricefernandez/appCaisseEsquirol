import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Router from 'vue-router'

// Category CRUD
import ListCategory from '@/components/category/list'
import CreateCategory from '@/components/category/create'
import UpdateCategory from '@/components/category/update'
import DeleteCategory from '@/components/category/delete'

// Products CRUD
import ListProduct from '@/components/product/list'
import CreateProduct from '@/components/product/create'
import UpdateProduct from '@/components/product/update'
import DeleteProduct from '@/components/product/delete'

// Capacity CRUD
import ListCapacity from '@/components/capacity/list'
import CreateCapacity from '@/components/capacity/create'
import UpdateCapacity from '@/components/capacity/update'
import DeleteCapacity from '@/components/capacity/delete'

Vue.use(Router)
Vue.use(Element)

export default new Router({
  routes: [
    {
      path: '/',
      component: ListCategory
    },
    // Category
    {
      path: '/category',
      component: ListCategory
    },
    {
      path: '/category/create',
      component: CreateCategory
    },
    {
      path: '/category/update',
      component: UpdateCategory
    },
    {
      path: '/category/delete',
      component: DeleteCategory
    },
    // Products
    {
      path: '/product',
      component: ListProduct
    },
    {
      path: '/product/create',
      component: CreateProduct
    },
    {
      path: '/product/update',
      component: UpdateProduct
    },
    {
      path: '/product/delete',
      component: DeleteProduct
    },
    // Capacity
    {
      path: '/capacity',
      component: ListCapacity
    },
    {
      path: '/capacity/create',
      component: CreateCapacity
    },
    {
      path: '/capacity/update',
      component: UpdateCapacity
    },
    {
      path: '/capacity/delete',
      component: DeleteCapacity
    }
  ]
})
