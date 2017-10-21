<template>
    <div id="all-categories">
        <el-row>
            <el-col :span="10" :offset="6"><h1>Toutes les catégories</h1>

                <p>
                    <router-link :to="{ name: 'category_create' }" class="btn btn-primary">Créer une catégorie
                    </router-link>
                </p>

                <!--<div class="form-group">-->
                <!--<input type="text" name="search" v-model="productSearch" placeholder="Search products" class="form-control"-->
                <!--v-on:keyup="searchProducts">-->
                <!--</div>-->

                <el-table
                        :data="categories"
                        style="width: 100%">
                    <el-table-column
                            prop="id"
                            label="Id">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="Name">
                    </el-table-column>
                    <el-table-column
                            prop="level"
                            label="Level">
                    </el-table-column>
                    <el-table-column
                            prop="image"
                            label="Image">
                    </el-table-column>
                    <el-table-column
                            prop="parent"
                            label="Parent">
                    </el-table-column>
                    <el-table-column
                            label="Actions">
                        <template scope="scope">
                            <el-button
                                    @click.native.prevent="deleteCategory(scope.$index, categories)"
                                    type="text"
                                    size="small">
                                Suppr.
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        categories: [],
        originalCategories: [],
        categorySearch: ''
      }
    },

    created: function () {
      this.fetchCategoryData()
    },

    methods: {
      fetchCategoryData: function () {
        axios.get(`http://localhost:8080/category/list`)
          .then(response => {
            this.categories = response.data
            this.originalCategories = this.categories
          })
          .catch(e => {
            this.errors.push(e)
          })
      },

      deleteCategory: function (index, rows) {
        axios.delete('http://localhost:8080/category/' + rows[index].id + '/delete')
          .then((response) => {
          })
          .catch(function (error) {
            console.log(error)
          })

        rows.splice(index, 1)
      }
    }
  }
</script>
