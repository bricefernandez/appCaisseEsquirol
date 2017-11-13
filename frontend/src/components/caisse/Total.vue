<template>
    <el-container>
        <el-header>
            <div class="caisseTitle">Total</div>
        </el-header>
        <el-main>{{ $store.state.totalPrice }}</el-main>
    </el-container>
</template>
<script>
  export default {
    name: 'total',
    data () {
      return {
        totalPrice: this.$store.state.totalPrice
      }
    }
  }
</script>

<style>

</style>
