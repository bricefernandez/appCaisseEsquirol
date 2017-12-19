<template>
    <div class="caisse">
        <el-col :span="24">
            <el-row :gutter="10">
                <el-col :span="16">
                    <router-view name="products" ref="productsView"></router-view>
                </el-col>
                <el-col :span="5">
                    <router-view name="sale"></router-view>
                </el-col>
                <el-col :span="3">
                    <router-view name="shortcuts"></router-view>
                </el-col>
            </el-row>
            <el-row class="SecondRow" :gutter="10">
                <el-col :span="8">
                    <router-view name="payments"></router-view>
                </el-col>
                <el-col :span="10">
                    <router-view name="total"></router-view>
                </el-col>
                <el-col :span="2">
                    <div>
                        <div class="Container">
                            <el-col :span="24">
                                <router-link to="/caisse" target="_blank">
                                    <icon class="IconNewUser" name="user-plus" scale="2"></icon>
                                </router-link>
                            </el-col>
                            <el-col :span="24">
                                <router-link to="/">
                                    <icon class="IconNewUser" name="backward"></icon>
                                </router-link>
                            </el-col>
                        </div>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div>
                        <div class="Container">
                            <el-col :span="24">
                                <el-button class="ValidIcon" v-on:click="validSale">
                                    <icon name="check" scale="3"></icon>
                                </el-button>
                            </el-col>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </el-col>
    </div>
</template>

<script>
  import axios from 'axios'
  import ElButton from '../../../node_modules/element-ui/packages/button/src/button.vue'
  import ElCol from 'element-ui/packages/col/src/col'

  export default {
    components: {
      ElCol,
      ElButton},
    name: 'caisse',
    methods: {
      validSale (event) {
        let totalPrice = this.$store.state.totalPrice
        if (this.$store.state.totalDiscounted !== 0) {
          totalPrice = this.$store.state.totalDiscounted
        }
        let sale = {
          totalPrice: totalPrice,
          payment: this.$store.state.payment
        }
        axios.post(`${this.$store.state.url}/sale/create`, sale)
          .then(response => {
            let saleProducts = {
              saleId: response.data.id,
              productList: this.$store.state.productList
            }
            axios.post(`${this.$store.state.url}/sale/products/create`, saleProducts)
              .then(response => {
                location.reload()
              })
              .catch(function (error) {
                console.log(error)
              })
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }
</script>

<style>
    .caisseTitle {
        font-size: 24px;
        font-weight: bold;
        padding: 6px;
        margin-bottom: 10px;
        background-color: beige;
    }

    .ValidIcon {
        margin-top: 10px;
        color: green;
    }

    .BackIcon {
        margin-top: 10px;
        color: red;
    }

    .bigIcon {
        width: auto;
        height: 50px;
        max-width: 100%;
        max-height: 100%;
    }

    .IconNewUser {
        margin-top: 10px;
        margin-left: 25px;
    }

    .SecondRow {
        margin-top: 10px;
    }
</style>
