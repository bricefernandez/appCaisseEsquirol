<template>
    <div id="all-sales">
        <el-row>
            <el-col :span="21" :offset="3">
              <h1>Période du: {{ this.formatDate(this.rangeValue[0]) }} au {{ this.formatDate(this.rangeValue[0]) }}</h1>
              <el-row class="RangePicker">
                <el-col :span="4" :offset="6">
                  Selectionner une prériode :
                </el-col>
                <el-col :span="8">
                  <el-date-picker
                    v-model="rangeValue"
                    type="daterange"
                    unlink-panels
                    range-separator=" - "
                    :picker-options="pickerOptions2"
                    @change="rangePickerChange()">
                  </el-date-picker>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="9">
                  <el-col :span="24">
                    <div class="KpiTitle">
                      Total litres
                    </div>
                    <div class="KpiContainer">
                      <span class="KpiContent">{{ this.totalLiters }}</span>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="KpiContainer KpiContainerSmall KpiContainerRed">
                      <span class="KpiContentSmall">{{ (this.totalFM / 100).toFixed(2) }}</span>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="KpiContainer KpiContainerSmall KpiContainerOrange">
                      <span class="KpiContentSmall">{{ (this.totalFVL / 100).toFixed(2) }}</span>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="KpiContainer KpiContainerSmall KpiContainerGreen">
                      <span class="KpiContentSmall">{{ (this.totalFVI / 100).toFixed(2) }}</span>
                    </div>
                  </el-col>
                </el-col>
                <el-col :span="5">
                  <div class="KpiTitle">
                    Total euros
                  </div>
                  <div class="KpiContainer">
                    <span class="KpiContent">{{ this.totalEuros }}</span>
                  </div>
                </el-col>
                <el-col :span="5">
                  <div class="KpiTitle">
                    Nombre de ventes
                  </div>
                  <div class="KpiContainer">
                    <span class="KpiContent">{{ this.totalSales }}</span>
                  </div>
                </el-col>
                <el-col :span="5">
                  <div class="KpiTitle">
                    Panier moyen
                  </div>
                  <div class="KpiContainer">
                    <span class="KpiContent">{{ this.averageBasket }}</span>
                  </div>
                </el-col>
              </el-row>
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
                   {{ formatDate(sale.date, true) }}
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
        sales: [],
        totalEuros: 0,
        totalSales: 0,
        averageBasket: 0,
        totalLiters: 0,
        totalFM: 0,
        totalFVL: 0,
        totalFVI: 0,
        pickerOptions2: {
          shortcuts: [{
            text: 'Semaine dernière',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: 'Mois dernier',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: 'Derniers 3 mois',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        rangeValue: [new Date(), new Date(new Date().getTime() + 24 * 60 * 60 * 1000)]
      }
    },

    created: function () {
      this.fetchSaleData()
    },

    methods: {
      fetchSaleData: function () {
        axios.get(`${this.$store.state.url}/sale/list?startDate=${this.formatDateForReq(this.rangeValue[0])}&endDate=${this.formatDateForReq(this.rangeValue[1])}`)
          .then(response => {
            this.sales = response.data
            this.totalSales = this.sales.length
            this.totalEuros = this.calculateTotals().euros
            this.averageBasket = (this.totalEuros / this.totalSales).toFixed(2)
            let totals = this.calculateTotals()
            this.totalFM = totals.FM
            this.totalFVL = totals.FVL
            this.totalFVI = totals.FVI
            this.totalLiters = ((this.totalFM + this.totalFVL + this.totalFVI) / 100).toFixed(2)
          })
          .catch(e => {
            console.log(e)
          })
      },

      rangePickerChange () {
        this.fetchSaleData()
      },

      formatDate (date, withHours) {
        let formatDate = new Date(date)
        if (withHours) {
          return (this.addLeadingZero(formatDate.getDate()) + '/' + (this.addLeadingZero(formatDate.getMonth() + 1)) + '/' + formatDate.getFullYear() + ' ' + formatDate.getHours() + ':' + formatDate.getMinutes())
        } else {
          return (this.addLeadingZero(formatDate.getDate()) + '/' + (this.addLeadingZero(formatDate.getMonth() + 1)) + '/' + formatDate.getFullYear())
        }
      },

      formatDateForReq (date) {
        let formatDate = new Date(date)
        return (formatDate.getFullYear() + '-' + (this.addLeadingZero(formatDate.getMonth() + 1)) + '-' + this.addLeadingZero(formatDate.getDate()))
      },

      addLeadingZero (number) {
        return (number < 10) ? ('0' + number) : number
      },

      calculateTotals () {
        let euros = 0
        let FM = 0
        let FVL = 0
        let FVI = 0

        for (let j = 0; j < this.sales.length; j++) {
          euros += this.sales[j].totalPrice
          for (let i = 0; i < this.sales[j].SaleProducts.length; i++) {
            switch (this.sales[j].SaleProducts[i].Product.CategoryId) {
              case 16:
                FM += this.sales[j].SaleProducts[i].quantity * this.sales[j].SaleProducts[i].Product.Capacity.value
                break
              case 18:
                FVL += this.sales[j].SaleProducts[i].quantity * this.sales[j].SaleProducts[i].Product.Capacity.value
                break
              case 19:
                FVI += this.sales[j].SaleProducts[i].quantity * this.sales[j].SaleProducts[i].Product.Capacity.value
                break
              default:
            }
          }
        }

        return {
          'euros': euros,
          'FM': FM,
          'FVL': FVL,
          'FVI': FVI
        }
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

  .RangePicker {
    margin-bottom: 20px;
  }

  .KpiContainer {
    width: 80px;
    height: 80px;
    border: solid 3px;
    border-radius: 50%;
    text-align: center;
    margin: 0 auto;
  }

  .KpiContainerSmall {
    width: 50px;
    height: 50px;
  }

  .KpiContainerRed {
    width: 50px;
    height: 50px;
    border-color: #79000a;
  }

  .KpiContainerOrange {
    width: 50px;
    height: 50px;
    border-color: #fc7a19;
  }

  .KpiContainerGreen {
    width: 50px;
    height: 50px;
    border-color: #556B2F;
  }

  .KpiContent {
    line-height: 80px;
  }

  .KpiContentSmall {
    line-height: 50px;
  }

  .KpiTitle {
    font-weight: bold;
    font-size: 20px;
  }

</style>
