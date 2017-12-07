<template>
    <div>
        <!--<el-header>-->
            <!--<div class="caisseTitle">Vente</div>-->
        <!--</el-header>-->
        <div class="Container">
            <el-row class="ProductsList">
                <el-row class="RowContainer" :gutter="2">
                    <el-col class="HeaderText" :span="10">Produit</el-col>
                    <el-col class="HeaderText" :span="6">Prix</el-col>
                    <el-col class="HeaderText" :span="5">Qté</el-col>
                    <el-col class="HeaderText" :span="3"></el-col>
                </el-row>
                <el-row v-for="item in items" class="RowContainer" :gutter="3" v-bind:data="item" :key="item.id">
                    <el-col :span="10" class="ListElement">{{ item.name }}</el-col>
                    <el-col :span="6"><el-input v-model="item.price" @change="setPrice(item, $event)"></el-input></el-col>
                    <el-col :span="5"><el-input v-model="item.quantity" @change="setQuantity(item, $event)"></el-input></el-col>
                    <el-col :span="3" class="ListElement"><i v-on:click="removeProduct(item, $event)" class="el-icon-close iconRed"></i></el-col>
                </el-row>
            </el-row>
        </div>
    </div>
</template>

<script>
  import ElRow from 'element-ui/packages/row/src/row'
  import ElInput from '../../../node_modules/element-ui/packages/input/src/input.vue'

  export default {
    components: {
      ElInput,
      ElRow},
    name: 'sale',
    computed: {
      items () {
        return this.$store.state.productList
      }
    },
    methods: {

      removeProduct (item, event) {
        let itemIndex = this.findIndex(item)
        if (item.quantity === 1) {
          this.$store.commit('removeProduct', itemIndex)
        } else {
          this.$store.commit('removeQuantity', itemIndex)
          this.$store.commit('hackUpdate')
        }
      },

      setPrice (item, event) {
        if (event !== '') {
          let itemIndex = this.findIndex(item)
          this.$store.commit('setPrice', {index: itemIndex, price: parseFloat(event)})
        }
      },

      setQuantity (item, event) {
        if (event !== '') {
          let itemIndex = this.findIndex(item)
          this.$store.commit('setQuantity', {index: itemIndex, quantity: parseInt(event)})
        }
      },

      findIndex (item) {
        let index = this.$store.state.productList.findIndex(x => x.id === item.id)
        return index
      }
    }
  }
</script>

<style scoped>
    .Container {
        text-align: left;
    }

    .RowContainer {
        margin-top: 5px;
        margin-bottom: 5px;
        padding-bottom: 5px;
        border-bottom: groove 1px grey;
    }

    .HeaderText {
        font-size: 14px;
        font-weight: bold;
    }

    .iconRed {
        color: red;
    }

    .ListElement {
        margin-top: 6px;
    }

    .el-input__inner {
        height: 25px !important;
    }
</style>
