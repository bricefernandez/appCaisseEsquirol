<template>
  <div id="app">
    <el-menu class="el-menu-demo" mode="horizontal" :default-active="activeLink" :router="true">
      <el-menu-item index="backoffice" route="/backoffice">Back Office</el-menu-item>
      <el-menu-item index="caisse" route="/caisse">Caisse</el-menu-item>
      <el-menu-item index="stats" route="/stats">Stats</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      activeLink: null
    }
  },
  mounted () {
    if (this.$route.path.indexOf('/backoffice') !== -1) {
      this.activeLink = 'backoffice'
    }
    if (this.$route.path.indexOf('/caisse') !== -1) {
      this.activeLink = 'caisse'
    }
  }
}
</script>

<style>

body {
  background-color: #FFF;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.icon {
  font-size:20px;
}

</style>
