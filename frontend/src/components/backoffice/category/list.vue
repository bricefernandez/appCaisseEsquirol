<template>
    <div id="all-categories">
        <el-row>
            <el-col :span="21" :offset="3"><h1>Toutes les catégories</h1>

                <p>
                    <router-link to="/backoffice/category/create" class="btn btn-primary">Créer une catégorie</router-link>
                </p>

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
                            prop="parent"
                            label="Parent">
                    </el-table-column>
                    <el-table-column
                            prop="image"
                            label="Image">
                        <template slot-scope="scope">
                            <img :src="'static/images/' + scope.row.image"/>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="Actions">
                        <template slot-scope="scope">
                          <router-link :to="{ path: `category/update/${scope.row.id}`}" class="btn btn-primary">
                              <i class="icon el-icon-edit"></i>
                          </router-link>
                          <el-button
                                  @click.native.prevent="deleteCategory(scope.$index, categories)"
                                  type="text"
                                  size="small">
                              <i class="icon el-icon-delete"></i>
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
        axios.get(`${this.$store.state.url}/category/list`)
          .then(response => {
            this.categories = response.data
            this.originalCategories = this.categories
          })
          .catch(e => {
            this.errors.push(e)
          })
      },

      deleteCategory: function (index, rows) {
        axios.delete(`${this.$store.state.url}/category/` + rows[index].id + '/delete')
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

<style>
    img {
        height: 100px;
    }
</style>
