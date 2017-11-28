<template>
    <div id="create-category">
        <el-row>
            <el-col :span="10" :offset="6">
                <h1>Créer une catégorie</h1>
                <p>
                    <router-link to="/backoffice/category">Retourner à la liste des catégories</router-link>
                </p>

                <el-form ref="form" label-width="240px">
                    <el-form-item label="Nom de la catégorie">
                        <el-input v-model="category.name"></el-input>
                    </el-form-item>
                    <el-form-item label="Catégorie parente">
                        <el-select @change="selectParent" v-model="category.parent"
                                   placeholder="Selectionner un parent">
                            <el-option
                                    v-for="parent in parents"
                                    :key="parent.id"
                                    :label="parent.name"
                                    :value="parent.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Niveau de la catégrie">
                        <el-input v-model="category.level">{{ category.level }}</el-input>
                    </el-form-item>
                    <el-form-item label="Image">
                        <el-input v-model="category.image" @change="imageUpdate"></el-input>
                        <img :src="imageUrl"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="addCategory">Créer</el-button>
                    </el-form-item>
                    <el-form-item>
                        <!--<el-button type="primary" @click="updateCategory">Modifier</el-button>-->
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  //  import Notification from './notifications.vue'
  import axios from 'axios'

  export default {
    data () {
      return {
        imageUrl: '',
        category: {
          name: '',
          level: '',
          image: '',
          parent: ''
        },
        parents: this.getParents()
      }
    },

    methods: {
      addCategory: function () {
        axios.post(`${this.$store.state.url}/category/create`, this.category)
          .then(response => {
            location.reload()
          })
          .catch(error => {
            console.log(error)
          })
      },

      selectParent: function (event) {
        if (event === 0) {
          this.category.level = 0
        } else {
          axios.get(`${this.$store.state.url}/category/` + event)
            .then(response => {
              let cat = response.data
              this.category.level = parseInt(cat[0].level) + 1
            })
            .catch(e => {
              console.log(e)
            })
        }
      },

      getParents () {
        axios.get(`${this.$store.state.url}/category/list/id&name&level`)
          .then(response => {
            let categories = response.data
            categories.push({id: 0, name: 'Aucun parent'})
            this.parents = categories
          })
          .catch(e => {
            console.log(e)
          })
      },

      imageUpdate (event) {
        this.imageUrl = 'static/images/' + event
      }
    }
  }
</script>
