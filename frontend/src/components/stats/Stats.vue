<template>
    <div class="stats">
        <el-col :span="4">
            <h5>Menu statistiques</h5>
            <el-menu
                    :router="true"
                    :default-active="$route.path"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#FFF"
                    default-openeds="[1]">
                <el-menu-item index="/stats" route="/stats"><i class="el-icon-information"></i> Liste des ventes</el-menu-item>
            </el-menu>
        </el-col>

        <el-col :span="18">
            <router-view></router-view>
        </el-col>
    </div>
</template>

<script>
  export default {
    name: 'stats'
  }
</script>

<style>

</style>
