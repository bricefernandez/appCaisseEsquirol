<template>
    <el-container>
        <!--<el-header>-->
            <!--<div class="caisseTitle">Vente</div>-->
        <!--</el-header>-->
        <el-main class="Container">
            <el-row class="ProductsList">
                <el-col :span="24" class="RowContainer">
                    <el-col class="HeaderText" :span="13">Produit</el-col>
                    <el-col class="HeaderText" :span="5">Prix</el-col>
                    <el-col class="HeaderText" :span="4">Qté</el-col>
                    <el-col class="HeaderText" :span="2"></el-col>
                </el-col>
                <el-col :span="24" v-for="item in items" class="RowContainer">
                    <el-col :span="13">{{ item.name }}</el-col>
                    <el-col :span="5">{{ item.price }} €</el-col>
                    <el-col :span="4">{{ item.quantity }}</el-col>
                    <el-col :span="2"><i v-on:click="removeProduct(item, $event)" class="el-icon-close iconRed"></i></el-col>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
  import ElRow from 'element-ui/packages/row/src/row'

  export default {
    components: {ElRow},
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
</style>
