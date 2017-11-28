<template>
    <div id="all-products">
        <el-row>
            <el-col :span="21" :offset="3"><h1>Tous les produits</h1>

                <p>
                    <router-link to="/backoffice/product/create" class="btn btn-primary">Créer un produit</router-link>
                </p>

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
                            prop="price"
                            label="Prix">
                    </el-table-column>
                    <el-table-column
                            prop="capacity_full_name"
                            label="Capacité">
                    </el-table-column>
                    <el-table-column
                            prop="Category.name"
                            label="Catégorie">
                    </el-table-column>
                    <el-table-column
                            prop="image"
                            label="Image">
                        <template slot-scope="scope">
                            <img :src="'static/images/' + scope.row.image"/>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="Actions">
                        <template scope="scope">
                            <router-link :to="{ path: `product/update/${scope.row.id}`}" class="btn btn-primary">
                                <i class="icon el-icon-edit"></i>
                            </router-link>
                            <el-button
                                    @click.native.prevent="deleteProduct(scope.$index, products)"
                                    type="text"
                                    size="small">
                                <i class="icon el-icon-delete"></i>
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
        axios.get(`${this.$store.state.url}/product/list`)
          .then(response => {
            this.products = response.data
            this.originalProducts = this.categories
          })
          .catch(e => {
            this.errors.push(e)
          })
      },

      deleteProduct: function (index, rows) {
        axios.delete(`${this.$store.state.url}/product/${rows[index].id}/delete`)
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

<style>
    img {
        height: 100px;
    }
</style>
