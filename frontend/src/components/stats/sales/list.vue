<template>
    <div id="all-sales">
        <el-row>
            <el-col :span="21" :offset="3">
                <h1>Toutes les ventes</h1>
                <div v-for="sale in sales">
                    <el-col :span="4">
                        Vente N°{{ sale.id }}
                    </el-col>
                    <el-col :span="4">
                        Date: {{ sale.date }}
                    </el-col>
                    <el-col :span="4">cd
                        Total: {{ sale.totalPrice }}
                    </el-col>
                    <el-col :span="12">
                        <div v-for="product in sale.SaleProducts">
                            <div>Nom produit : {{ product.Product.name }}</div>
                            <div>Quantité : {{ product.quantity }}</div>
                        </div>
                    </el-col>
                </div>
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

<style>

</style>
