<template>
    <el-container>
        <el-main>
            <el-row class="ProductsList">
                <el-row>
                    <el-col :span="4" :offset="20">
                        <div v-on:click="backToPreviousCategory()">
                            <icon name="undo" scale="2"></icon>
                        </div>
                    </el-col>
                </el-row>
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
  import ElCol from 'element-ui/packages/col/src/col'

  export default {
    components: {
      ElCol,
      ElRow},
    name: 'products',
    data () {
      return {
        items: this.getSubCategoriesOrProducts(0),
        isProduct: false
      }
    },
    events: {
      backToCategories: function () {
        this.getSubCategoriesOrProducts(0)
      }
    },
    methods: {

      getSubCategoriesOrProducts (parent) {
        axios.get(`${this.$store.state.url}/category/get?parent=${parent}`)
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
        axios.get(`${this.$store.state.url}/product/get?CategoryId=${categoryId}`)
          .then(response => {
            this.items = response.data
            this.isProduct = true
          })
          .catch(e => {
            this.errors.push(e)
          })
      },

      addProduct (item) {
        let itemIndex = this.findIndex(item)
        if (itemIndex !== -1) {
          this.$store.commit('addQuantity', itemIndex)
          this.$store.commit('hackUpdate')
        } else {
          item.quantity = 1
          this.$store.commit('addProduct', item)
        }
      },

      clickProduct (item, event) {
        if (this.isProduct === true) {
          this.addProduct(item)
        } else {
          this.getSubCategoriesOrProducts(item.id)
        }
      },

      backToPreviousCategory (event) {
        this.getSubCategoriesOrProducts(0)
      },

      findIndex (item) {
        let index = this.$store.state.productList.findIndex(x => x.id === item.id)
        return index
      }
    }
  }
</script>

<style>
    .ProductsImg {
        height: 100px;
        max-width: 100%;
    }

    .ProductsContainer {
        height: 140px;
    }

    .ProductsList {
        max-height: 475px;
        min-height: 475px;
        overflow: scroll;
    }
</style>
