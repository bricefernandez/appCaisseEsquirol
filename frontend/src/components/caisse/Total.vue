<template>
    <el-container>
        <!--<el-header>-->
            <!--<div class="caisseTitle">Total</div>-->
        <!--</el-header>-->
        <el-main>
            <el-row class="TotalContainer">
                <el-col class="TotalTitle" :span="12">Total :</el-col>
                <el-col class="TotalValue" :span="12">{{ $store.state.totalPrice }} €</el-col>
                <el-col class="TotalTitle" :span="12">Total remisé :</el-col>
                <el-col class="TotalValue" :span="12">{{ totalDiscounted }} €</el-col>
                <el-col class="TotalTitle" :span="16">Remise (%) :</el-col>
                <el-col class="TotalValue" :span="8"><el-input v-on:change="changeRemise">{{ remise }}</el-input></el-col>
                <!--<el-col class="TotalTitle" :span="14">Paiement :</el-col>-->
                <!--<el-col class="TotalValue" :span="10"><el-input type="numeric" v-on:change="changeRendu">{{ payment }}</el-input></el-col>-->
                <!--<el-col class="TotalTitle" :span="12">Rendu :</el-col>-->
                <!--<el-col class="TotalValue" :span="12">{{ rendu }} €</el-col>-->
            </el-row>
        </el-main>
    </el-container>
</template>
<script>
  import ElRow from 'element-ui/packages/row/src/row'
  import ElCol from 'element-ui/packages/col/src/col'
  import ElInput from '../../../node_modules/element-ui/packages/input/src/input.vue'

  export default {
    components: {
      ElInput,
      ElCol,
      ElRow},
    name: 'total',
    data () {
      return {
//        payment: 0,
        remise: 0,
        totalDiscounted: '-'
//        rendu: 0
      }
    },
    methods: {
      changeRemise (event) {
        if (event !== 0) {
          this.totalDiscounted = (this.$store.state.totalPrice * (1 - event / 100)).toFixed(2)
          this.$store.commit('setDiscountedTotal', parseFloat(this.totalDiscounted))
        } else {
          this.totalDiscounted = '-'
          this.$store.commit('setDiscountedTotal', 0)
        }
      }
    }
  }
</script>

<style>

    .TotalContainer {
        text-align: left;
        padding: 5px;
    }

    .TotalTitle {
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 5px;
    }

    .TotalValue {
        text-align: right;
        margin-bottom: 5px;
    }
</style>
