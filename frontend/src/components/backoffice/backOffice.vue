<template>
    <div class="backoffice">
        <el-col :span="4">
            <h5>Menu backoffice</h5>
            <el-menu
                    :router="true"
                    :default-active="$route.path"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#FFF"
                    default-openeds="[1, 2, 3]">
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span><icon name="beer"></icon>Capacités</span>
                    </template>
                    <el-menu-item index="/backoffice/capacity" route="/backoffice/capacity"><i class="el-icon-information"></i> Lister les capacités</el-menu-item>
                    <el-menu-item index="/backoffice/capacity/create" route="/backoffice/capacity/create"><i class="el-icon-plus"></i> Créer une capacité</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>Catégories</span>
                    </template>
                    <el-menu-item index="/backoffice/category" route="/backoffice/category"><i class="el-icon-information"></i> Lister les catégories</el-menu-item>
                    <el-menu-item index="/backoffice/category/create" route="/backoffice/category/create"><i class="el-icon-plus"></i> Créer une catégorie</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>Produits</span>
                    </template>
                    <el-menu-item index="/backoffice/product" route="/backoffice/product"><i class="el-icon-information"></i> Lister les produits</el-menu-item>
                    <el-menu-item index="/backoffice/product/create" route="/backoffice/product/create"><i class="el-icon-plus"></i> Créer un produit</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-col>

        <el-col :span="18">
            <router-view></router-view>
        </el-col>
    </div>
</template>

<script>
  export default {
    name: 'backoffice'
  }
</script>

<style>

</style>
