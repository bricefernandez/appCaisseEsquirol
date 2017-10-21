import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Router from 'vue-router'

import ListCategory from '@/components/category/list'
import CreateCategory from '@/components/category/create'
import UpdateCategory from '@/components/category/update'
import DeleteCategory from '@/components/category/delete'

import ListProduct from '@/components/product/list'
import CreateProduct from '@/components/product/create'
import UpdateProduct from '@/components/product/update'
import DeleteProduct from '@/components/product/delete'

Vue.use(Router)
Vue.use(Element)

export default new Router({
  routes: [
    {
      path: '/category',
      name: 'category_list',
      component: ListCategory
    },
    {
      path: '/category/create',
      name: 'category_create',
      component: CreateCategory
    },
    {
      path: '/category/update',
      name: 'category_update',
      component: UpdateCategory
    },
    {
      path: '/category/delete',
      name: 'category_delete',
      component: DeleteCategory
    },
    {
      path: '/product',
      name: 'product_list',
      component: ListProduct
    },
    {
      path: '/product/create',
      name: 'product_create',
      component: CreateProduct
    },
    {
      path: '/product/update',
      name: 'product_update',
      component: UpdateProduct
    },
    {
      path: '/product/delete',
      name: 'product_delete',
      component: DeleteProduct
    }
  ]
})
