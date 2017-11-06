<template>
    <el-container>
        <el-header><h2 class="caisseTitle">Produits</h2></el-header>
        <el-row class="ProductsList">
            <el-col class="ProductsContainer" :span="6" v-for="item in items">
                <div v-on:click="clickProduct(item, $event)">
                    <img class="ProductsImg" :src="`static/images${item.image}`"/>
                    <div>{{ item.name }}</div>
                    <!--{{ item.id }}-->
                    <!--{{ item.name }}-->
                    <!--{{ item.level }}-->
                    <!--{{ item.parent }}-->
                </div>
            </el-col>
        </el-row>
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
        console.log('getting produc')
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
