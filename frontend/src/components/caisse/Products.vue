<template>
    <el-container>
        <el-header>
            <el-row>
                <el-col :span="20">
                    <div class="caisseTitle">Produits</div>
                </el-col>
                <el-col :span="4">
                    <div class="caisseTitle" v-on:click="backToPreviousCategory()"><i class="icon el-icon-arrow-left"></i></div>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <el-row class="ProductsList">
                <el-col class="ProductsContainer" :span="6" v-for="item in items">
                    <div v-on:click="clickProduct(item, $event)">
                        <img class="ProductsImg" :src="`static/images${item.image}`"/>
                        <div>{{ item.name }}</div>
                    </div>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
  import axios from 'axios'
  import ElRow from 'element-ui/packages/row/src/row'

  export default {
    components: {ElRow},
    name: 'products',
    data () {
      return {
        items: this.getSubCategoriesOrProducts(0),
        isProduct: false
      }
    },
    methods: {

      getSubCategoriesOrProducts (parent) {
        axios.get(`http://localhost:8080/category/get?parent=${parent}`)
          .then(response => {
            if (response.data.length > 0) {
              this.items = response.data
              this.isProduct = false
            } else {
              this.getProducts(parent)
            }
          })
          .catch(e => {
            this.errors.push(e)
          })
      },

      getProducts (categoryId) {
        axios.get(`http://localhost:8080/product/get?CategoryId=${categoryId}`)
          .then(response => {
            this.items = response.data
            this.isProduct = true
          })
          .catch(e => {
            this.errors.push(e)
          })
      },

      addProduct (item) {
        item.quantity = 1
        this.$store.commit('addProduct', item)
      },

      clickProduct (item, event) {
        if (this.isProduct === true) {
          this.addProduct(item)
        } else {
          this.getSubCategoriesOrProducts(item.id)
        }
      },

      backToPreviousCategory (event) {
        if (this.currentParentId !== 0) {
          this.getSubCategoriesOrProducts(this.currentParentId)
        }
      }
    }
  }
</script>

<style>
    .ProductsImg {
        height: 120px;
        max-width: 100%;
    }

    .ProductsContainer {
        height: 160px;
    }

    .ProductsList {
        max-height: 500px;
        overflow: scroll;
    }
</style>
