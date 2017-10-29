<template>
    <div id="create-capacity">
        <el-row>
            <el-col :span="10" :offset="6">
                <h1>Créer une capacité</h1>
                <p>
                    <router-link to="/backoffice/capacity">Retourner à la liste des capacités</router-link>
                </p>

                <el-form ref="form" label-width="240px">
                    <el-form-item label="Valeur de la capacité">
                        <el-input v-model="capacity.value"></el-input>
                    </el-form-item>
                    <el-form-item label="Type">
                        <el-select v-model="capacity.type" placeholder="Selectionner un type">
                            <el-option
                                    v-for="type in types"
                                    :key="type.name"
                                    :label="type.name"
                                    :value="type.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="addCapacity">Créer</el-button>
                        <el-button>Annuler</el-button>
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
        capacity: {
          value: '',
          type: ''
        },
        types: [{
          id: '0',
          name: 'cl'
        }, {
          id: '1',
          name: 'gr'
        }]
      }
    },

    methods: {
      addCapacity: function () {
        axios.post('http://localhost:8080/capacity/create', this.capacity)
          .then(response => {
            location.reload()
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }
</script>
