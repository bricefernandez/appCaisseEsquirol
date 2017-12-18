<template>
    <div id="all-sales">
        <el-row>
            <el-col :span="21" :offset="3">
                <h1>Toutes les ventes</h1>
                <el-row class="HeaderRow">
                  <el-col :span="4">
                    N°
                  </el-col>
                  <el-col :span="4">
                    Date
                  </el-col>
                  <el-col :span="4">
                    Total
                  </el-col>
                  <el-col :span="12">
                    Liste des produits
                  </el-col>
                </el-row>
                <el-row class="SecondRow" v-for="sale in sales">
                    <el-col :span="4">
                        {{ sale.id }}
                    </el-col>
                    <el-col :span="4">
                       {{ sale.date }}
                    </el-col>
                    <el-col :span="4">
                       {{ sale.totalPrice }} €
                    </el-col>
                    <el-col :span="12">
                        <div v-for="product in sale.SaleProducts">
                            <div>{{ product.Product.name }} x{{ product.quantity }}</div>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        sales: []
      }
    },

    created: function () {
      this.fetchSaleData()
    },

    methods: {
      fetchSaleData: function () {
        axios.get(`${this.$store.state.url}/sale/list`)
          .then(response => {
            this.sales = response.data
          })
          .catch(e => {
            this.errors.push(e)
          })
      }
    }
  }
</script>

<style scoped>

  .HeaderRow {
    padding: 15px;
    background: rgba(211, 211, 211, 0.58);
    font-weight: bold;
  }

  .SecondRow {
    padding: 10px;
  }

</style>
