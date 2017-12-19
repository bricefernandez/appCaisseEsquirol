<template>
    <div>
        <!--<el-header>-->
            <!--<div class="caisseTitle">Modes de paiement</div>-->
        <!--</el-header>-->
        <div>
            <div class="PaymentsContainer">
                <el-radio-group v-model="$store.state.payment" @change="activatedThis($event)">
                    <el-radio-button class="PaymentMethod" label="cb"><icon id="cb" class="bigIcon" v-bind:class="{ 'colorBlue': icons['cb'] }" name="credit-card"></icon></el-radio-button>
                    <el-radio-button class="PaymentMethod" label="cash"><icon id="cash" class="bigIcon" v-bind:class="{ 'colorBlue': icons['cash'] }" name="money"></icon></el-radio-button>
                    <el-radio-button class="PaymentMethod" label="cheque"><icon id="cheque" class="bigIcon" v-bind:class="{ 'colorBlue': icons['cheque'] }" name="pencil-square-o"></icon></el-radio-button>
                    <el-radio-button class="PaymentMethod" label="virement"><icon id="virement" class="bigIcon" v-bind:class="{ 'colorBlue': icons['virement'] }"  name="exchange"></icon></el-radio-button>
                </el-radio-group>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'payments',
    data () {
      return {
        icons: {
          cb: true,
          cash: false,
          cheque: false,
          virement: false
        }
      }
    },
    methods: {
      clickPayment (event) {
      },

      activatedThis: function (event) {
        this.icons.cb = event === 'cb'
        this.icons.cash = event === 'cash'
        this.icons.cheque = event === 'cheque'
        this.icons.virement = event === 'virement'
        this.$store.commit('updatePayment', event)
      }
    }
  }
</script>

<style scoped>

    .PaymentsContainer {
        margin-top: 20px;
    }

    .bigIcon {
        width: auto;
        height: 30px;
        max-width: 100%;
        max-height: 100%;
    }

</style>
