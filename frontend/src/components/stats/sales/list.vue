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
                <el-row class="SecondRow" v-for="sale in sales" v-bind:data="sale" v-bind:key="sale.id">
                    <el-col :span="4">
                        {{ sale.id }}
                    </el-col>
                    <el-col :span="4">
                       {{ formatDate(sale.date) }}
                    </el-col>
                    <el-col :span="4">
                       {{ sale.totalPrice }} €
                    </el-col>
                    <el-col :span="12">
                        <div class="ProductRow" v-for="product in sale.SaleProducts">
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
      },

      formatDate (date) {
        let formatDate = new Date(date)
        return (formatDate.getDate() + '/' + (formatDate.getMonth() + 1) + '/' + formatDate.getFullYear())
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
    border-bottom: solid 1px lightgrey;
  }

  .ProductRow {
    padding: 5px;
  }

</style>
