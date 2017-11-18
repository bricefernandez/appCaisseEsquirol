<template>
    <el-container>
        <el-header>
            <div class="caisseTitle">Total</div>
        </el-header>
        <el-main>
            <el-row class="TotalContainer">
                <el-col class="TotalTitle" :span="16">Total :</el-col>
                <el-col class="TotalValue" :span="8">{{ $store.state.totalPrice }} €</el-col>
                <el-col class="TotalTitle" :span="16">Paiement :</el-col>
                <el-col class="TotalValue" :span="8"><el-input type="numeric" v-on:change="changeRendu">{{ payment }}</el-input></el-col>
                <el-col class="TotalTitle" :span="16">Rendu :</el-col>
                <el-col class="TotalValue" :span="8">{{ rendu }} €</el-col>
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
        payment: 0,
        rendu: 0
      }
    },
    methods: {
      changeRendu (event) {
        this.rendu = event - this.$store.state.totalPrice
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
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 5px;
    }

    .TotalValue {
        text-align: right;
        margin-bottom: 5px;
    }
</style>
