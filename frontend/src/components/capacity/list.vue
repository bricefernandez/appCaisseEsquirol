<template>
    <div id="all-capacities">
        <el-row>
            <el-col :span="10" :offset="6"><h1>Toutes les capacités</h1>

                <p>
                    <router-link to="/capacity/create" class="btn btn-primary">Créer une capacité</router-link>
                </p>

                <!--<div class="form-group">-->
                <!--<input type="text" name="search" v-model="productSearch" placeholder="Search products" class="form-control"-->
                <!--v-on:keyup="searchProducts">-->
                <!--</div>-->

                <el-table
                        :data="capacities"
                        style="width: 100%">
                    <el-table-column
                            prop="id"
                            label="Id">
                    </el-table-column>
                    <el-table-column
                            prop="value"
                            label="Valeur">
                    </el-table-column>
                    <el-table-column
                            prop="type"
                            label="Type">
                    </el-table-column>
                    <el-table-column
                            label="Actions">
                        <template scope="scope">
                            <el-button
                                    @click.native.prevent="deleteCapacity(scope.$index, capacities)"
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
        capacities: []
      }
    },

    created: function () {
      this.fetchCapacityData()
    },

    methods: {
      fetchCapacityData: function () {
        axios.get(`http://localhost:8080/capacity/list`)
          .then(response => {
            this.capacities = response.data
          })
          .catch(e => {
            this.errors.push(e)
          })
      },

      deleteCapacity: function (index, rows) {
        axios.delete('http://localhost:8080/capacity/' + rows[index].id + '/delete')
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
