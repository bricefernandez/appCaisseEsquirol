<template>
    <div class="caisse">
        <el-col :span="24">
            <el-row :gutter="10">
                <el-col :span="14">
                    <router-view name="products"></router-view>
                </el-col>
                <el-col :span="5">
                    <router-view name="sale"></router-view>
                </el-col>
                <el-col :span="5">
                    <router-view name="shortcuts"></router-view>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="14">
                    <router-view name="payments"></router-view>
                </el-col>
                <el-col :span="5">
                    <router-view name="total"></router-view>
                </el-col>
                <el-col :span="5">
                    <el-container>
                        <el-header>
                            <div class="caisseTitle">Valider</div>
                        </el-header>
                        <el-main class="Container">
                            <el-col :span="24">
                                <el-button class="ValidIcon" v-on:click="validSale">
                                    <icon name="check"></icon>
                                </el-button>
                            </el-col>
                        </el-main>
                    </el-container>
                </el-col>
            </el-row>
        </el-col>
    </div>
</template>

<script>
  import axios from 'axios'
  import ElButton from '../../../node_modules/element-ui/packages/button/src/button.vue'

  export default {
    components: {ElButton},
    name: 'caisse',
    methods: {
      validSale (event) {
        let sale = {
          totalPrice: this.$store.state.totalPrice,
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
</style>
