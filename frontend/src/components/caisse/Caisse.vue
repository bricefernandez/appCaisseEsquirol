<template>
    <div class="caisse">
        <el-col :span="24">
            <el-row :gutter="10">
                <el-col :span="14">
                    <router-view name="products"></router-view>
                </el-col>
                <el-col :span="5">
                    <router-view name="sale"></router-view>
                </el-col>
                <el-col :span="5">
                    <router-view name="shortcuts"></router-view>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="14">
                    <router-view name="payments"></router-view>
                </el-col>
                <el-col :span="5">
                    <router-view name="total"></router-view>
                </el-col>
            </el-row>
        </el-col>
    </div>
</template>

<script>
  export default {
    name: 'caisse'
  }
</script>

<style>
    .caisseTitle {
        font-size: 24px;
        font-weight: bold;
        padding: 6px;
        margin-bottom: 10px;
        background-color: beige;
    }
</style>
