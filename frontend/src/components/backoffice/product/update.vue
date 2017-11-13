<template>
    <div id="update-category">
        <el-row>
            <el-col :span="10" :offset="6">
                <h1>Modifier un produit</h1>
                <p>
                    <router-link to="/backoffice/product">Retourner à la liste des produits</router-link>
                </p>

                <el-form ref="form" label-width="240px">
                    <el-form-item label="Nom du produit">
                        <el-input v-model="product.name"></el-input>
                    </el-form-item>
                    <el-form-item label="Prix du produit">
                        <el-input v-model="product.price"></el-input>
                    </el-form-item>
                    <el-form-item label="Catégorie">
                        <el-select v-model="product.CategoryId" placeholder="Selectionner une catégorie">
                            <el-option
                                    v-for="cat in categories"
                                    :key="cat.id"
                                    :label="cat.name"
                                    :value="cat.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Capacité">
                        <el-select v-model="product.CapacityId" placeholder="Selectionner une capacité">
                            <el-option
                                    v-for="cap in capacities"
                                    :key="cap.id"
                                    :label="cap.full_name"
                                    :value="cap.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Image">
                        <el-input v-model="product.image" @change="imageUpdate"></el-input>
                        <img :src="`static/images/${imageUrl}`"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updateProduct">Modifier</el-button>
                        <el-button>Annuler</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  //  import Notification from './notifications.vue'
  import axios from 'axios'

  export default {
    data () {
      return {
        imageUrl: '',
        product: this.getProduct(),
        categories: this.getCategories(),
        capacities: this.getCapacities()
      }
    },

    methods: {
      getProduct () {
        axios.get(`http://localhost:8080/product/${this.$route.params.product_id}`)
          .then(response => {
            this.product = response.data[0]
            this.imageUrl = this.product.image
          })
          .catch(e => {
            this.errors.push(e)
          })
      },

      updateProduct: function () {
        axios.put('http://localhost:8080/product/update', this.product)
          .then(response => {
            location.reload()
          })
          .catch(function (error) {
            console.log(error)
          })
      },

      getCategories () {
        axios.get(`http://localhost:8080/category/list/id&name`)
          .then(response => {
            let categories = response.data
            categories.push({id: 0, name: 'Aucune catégorie'})
            this.categories = categories
          })
          .catch(e => {
            this.errors.push(e)
          })
      },

      getCapacities () {
        axios.get(`http://localhost:8080/capacity/list`)
          .then(response => {
            let capacities = response.data
            this.capacities = capacities
          })
          .catch(e => {
            this.errors.push(e)
          })
      },

      imageUpdate (event) {
        this.imageUrl = event
      }
    }
  }
</script>
