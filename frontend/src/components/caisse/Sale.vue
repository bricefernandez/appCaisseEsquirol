<template>
    <el-container>
        <el-header><h2 class="caisseTitle">Vente</h2></el-header>
        <el-main>
            <el-col :span="24" v-for="item in items">
                <!--<div v-on:click="clickProduct(item, $event)">-->
                    <!--<img class="ProductsImg" :src="`static/images${item.image}`"/>-->
                    <div>{{ item.name }}</div>
                    <!--{{ item.id }}-->
                    <!--{{ item.name }}-->
                    <!--{{ item.level }}-->
                    <!--{{ item.parent }}-->
                <!--</div>-->
            </el-col>
        </el-main>
    </el-container>
</template>

<script>
  export default {
    name: 'sale',
    data () {
      return {
        items: this.$store.state.productList
      }
    }
  }
</script>

<style>

</style>
