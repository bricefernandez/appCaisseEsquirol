<template>
    <el-container>
        <el-header>
            <div class="caisseTitle">Modes de paiement</div>
        </el-header>
        <el-main>
            <div class="PaymentsContainer">
                <el-radio-group v-model="$store.state.payment" @change="activatedThis($event)">
                    <el-radio class="PaymentMethod" label="cb"><icon id="cb" v-bind:class="{ 'colorBlue': icons['cb'] }" name="credit-card"></icon></el-radio>
                    <el-radio class="PaymentMethod" label="cash"><icon id="cash" v-bind:class="{ 'colorBlue': icons['cash'] }" name="money"></icon></el-radio>
                    <el-radio class="PaymentMethod" label="cheque"><icon id="cheque" v-bind:class="{ 'colorBlue': icons['cheque'] }" name="pencil-square-o"></icon></el-radio>
                    <el-radio class="PaymentMethod" label="virement"><icon id="virement" v-bind:class="{ 'colorBlue': icons['virement'] }"  name="exchange"></icon></el-radio>
                </el-radio-group>
            </div>
        </el-main>
    </el-container>
</template>

<script>
  import 'vue-awesome/icons'

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

<style>

    .PaymentsContainer {
        margin-top: 20px;
    }

    .PaymentMethod {
        margin: 10px 20px;
    }

    .colorBlue {
        color: #20a0ff;
    }

    .fa-icon {
        width: auto;
        height: 50px;
        max-width: 100%;
        max-height: 100%;
    }

    .el-radio__input {
        display: none;
    }
</style>
