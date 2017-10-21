<template>
    <div id="all-products">
        <el-row>
            <el-col :span="10" :offset="6"><h1>Tous les produits</h1>

                <p>
                    <router-link :to="{ name: 'product_create' }" class="btn btn-primary">Créer un produit
                    </router-link>
                </p>

                <!--<div class="form-group">-->
                <!--<input type="text" name="search" v-model="productSearch" placeholder="Search products" class="form-control"-->
                <!--v-on:keyup="searchProducts">-->
                <!--</div>-->

                <el-table
                        :data="products"
                        style="width: 100%">
                    <el-table-column
                            prop="id"
                            label="Id">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="Name">
                    </el-table-column>
                    <el-table-column
                            prop="CapacityId"
                            label="Capacité">
                    </el-table-column>
                    <el-table-column
                            prop="CategoryId"
                            label="Catégorie">
                    </el-table-column>
                    <el-table-column
                            label="Actions">
                        <template scope="scope">
                            <el-button
                                    @click.native.prevent="deleteProduct(scope.$index, products)"
                                    type="text"
                                    size="small">
                                Suppr.
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        products: [],
        originalProducts: [],
        productSearch: ''
      }
    },

    created: function () {
      this.fetchProductData()
    },

    methods: {
      fetchProductData: function () {
        axios.get(`http://localhost:8080/product/list`)
          .then(response => {
            this.products = response.data
            this.originalProducts = this.categories
          })
          .catch(e => {
            this.errors.push(e)
          })
      },

      deleteProduct: function (index, rows) {
        axios.delete('http://localhost:8080/product/' + rows[index].id + '/delete')
          .then((response) => {
          })
          .catch(function (error) {
            console.log(error)
          })

        rows.splice(index, 1)
      }
    }
  }
</script>
