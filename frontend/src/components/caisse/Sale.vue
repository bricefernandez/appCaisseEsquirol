<template>
    <el-container>
        <el-header><div class="caisseTitle">Vente</div></el-header>
        <el-main>
            <el-col :span="24" v-for="item in items">
                <div>{{ item.name }}</div>
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
