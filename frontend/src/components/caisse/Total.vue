<template>
    <div>
        <!--<el-header>-->
            <!--<div class="caisseTitle">Total</div>-->
        <!--</el-header>-->
        <div>
            <el-row class="TotalContainer">
                <el-col class="TotalTitle" :span="12">Total :</el-col>
                <el-col class="TotalValue" :span="12">{{ $store.state.totalPrice }} €</el-col>
                <el-col class="TotalTitle" :span="12">Total remisé :</el-col>
                <el-col class="TotalValue" :span="12">{{ totalDiscounted }} €</el-col>
                <el-col class="TotalTitle" :span="16">Remise (%) :</el-col>
                <el-col class="TotalValue" :span="8"><el-input v-on:change="changeRemise">{{ remise }}</el-input></el-col>
            </el-row>
        </div>
    </div>
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
