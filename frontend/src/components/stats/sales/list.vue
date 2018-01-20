<template>
    <div id="all-sales">
        <el-row>
            <el-col :span="20" :offset="2">
              <!--<router-link to="/backoffice/product">Aller aux statistiques annuelles</router-link>-->
              <h1>Période du: {{ this.formatDate(this.rangeValue[0]) }} au {{ this.formatDate(this.rangeValue[1]) }}</h1>
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
              <el-row :gutter="15" class="DateShortcutContainer">
                <el-col :span="4" :offset="6">
                  <div class="DateShortcut" v-bind:class="{ activeSC: isToday }" v-on:click="setRangeFromShortCut(0)">Aujourd'hui</div>
                </el-col>
                <el-col :span="4">
                  <div class="DateShortcut" v-bind:class="{ activeSC: isWeek }" v-on:click="setRangeFromShortCut(1)">Semaine en cours</div>
                </el-col>
                <el-col :span="4">
                  <div class="DateShortcut" v-bind:class="{ activeSC: isMonth }" v-on:click="setRangeFromShortCut(2)">Mois en cours</div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="9">
                  <el-col :span="24">
                    <div class="KpiTitle">
                      Total litres
                    </div>
                    <div class="KpiContainer">
                      <span class="KpiContent">{{ this.totalLiters }} L</span>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="KpiContainer KpiContainerRed">
                      <span class="KpiContentSmall">{{ (this.totalFM / 100).toFixed(2) }} L</span>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="KpiContainer KpiContainerOrange">
                      <span class="KpiContentSmall">{{ (this.totalFVL / 100).toFixed(2) }} L</span>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="KpiContainer KpiContainerGreen">
                      <span class="KpiContentSmall">{{ (this.totalFVI / 100).toFixed(2) }} L</span>
                    </div>
                  </el-col>
                </el-col>
                <el-col :span="5">
                  <div class="KpiTitle">
                    Total euros
                  </div>
                  <div class="KpiContainer">
                    <span class="KpiContent">{{ this.totalEuros }} €</span>
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
                    <span class="KpiContent">{{ this.averageBasket }} €</span>
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
        pickerOptions2: {},
        rangeValue: [new Date(), new Date(new Date().getTime() + 24 * 60 * 60 * 1000)],
        isToday: true,
        isWeek: false,
        isMonth: false
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
        this.colorShortCut()
      },

      colorShortCut () {
        if (new Date(this.rangeValue[0]).getTime() === new Date(this.getTodayRange()[0]).getTime() &&
          new Date(this.rangeValue[0]).getTime() === new Date(this.getTodayRange()[0]).getTime()) {
          this.isToday = true
        } else {
          this.isToday = false
        }

        if (new Date(this.rangeValue[0]).getTime() === new Date(this.getWeekRange()[0]).getTime() &&
          new Date(this.rangeValue[0]).getTime() === new Date(this.getWeekRange()[0]).getTime()) {
          this.isWeek = true
        } else {
          this.isWeek = false
        }

        if (new Date(this.rangeValue[0]).getTime() === new Date(this.getMonthRange()[0]).getTime() &&
          new Date(this.rangeValue[0]).getTime() === new Date(this.getMonthRange()[0]).getTime()) {
          this.isMonth = true
        } else {
          this.isMonth = false
        }
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

      setRangeFromShortCut (value) {
        switch (value) {
          case 0:
            this.rangeValue = this.getTodayRange()
            break
          case 1:
            this.rangeValue = this.getWeekRange()
            break
          case 2:
            this.rangeValue = this.getMonthRange()
            break
        }
      },

      getTodayRange () {
        let end = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
        let start = new Date()
        start.setHours(0, 0, 0, 0)
        end.setHours(0, 0, 0, 0)

        return [start, end]
      },

      getWeekRange () {
        let end = new Date()
        let d = new Date()
        let day = d.getDay()
        let diff = d.getDate() - day + (day === 0 ? -6 : 1)
        let start = new Date(d.setDate(diff))
        start.setHours(0, 0, 0, 0)
        end.setHours(0, 0, 0, 0)

        return [start, end]
      },

      getMonthRange () {
        let end = new Date()
        let date = new Date()
        let start = new Date(date.getFullYear(), date.getMonth(), 1)
        start.setHours(0, 0, 0, 0)
        end.setHours(0, 0, 0, 0)

        return [start, end]
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
    width: 120px;
    height: 120px;
    border: solid 3px;
    border-radius: 50%;
    text-align: center;
    margin: 20px auto;
  }

  .KpiContainerRed {
    width: 90px;
    height: 90px;
    border-color: #79000a;
    background-color: #79000a;
    color: white;
    margin-bottom: 30px;
  }

  .KpiContainerOrange {
    width: 90px;
    height: 90px;
    border-color: #fc7a19;
    background-color: #fc7a19;
    color: white;
    margin-bottom: 30px;
  }

  .KpiContainerGreen {
    width: 90px;
    height: 90px;
    border-color: #556B2F;
    background-color: #556B2F;
    color: white;
    margin-bottom: 30px;
  }

  .KpiContent {
    line-height: 120px;
    font-weight: bold;
    font-size: 20px;
  }

  .KpiContentSmall {
    line-height: 90px;
    font-weight: bold;
    font-size: 16px;
  }

  .KpiTitle {
    font-weight: bold;
    font-size: 20px;
  }

  .DateShortcutContainer {
    border-bottom: solid 1px lightgrey;
    padding-bottom: 15px;
    margin-bottom: 20px;
  }

  .DateShortcut {
    border: solid 1px;
    border-radius: 10px;
    padding: 5px;
    margin-bottom: 10px;
    font-weight: bold;
  }

  .activeSC {
    background-color: #20a0ff;
    color: white;
  }

</style>
