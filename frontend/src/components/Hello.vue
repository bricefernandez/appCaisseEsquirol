<template>
    <div class="hello">
        <h1>Creation/modification d'une catégorie</h1>
        <el-row>
            <el-col :span="10" :offset="6">
                <el-form ref="form" :model="form" label-width="120px">
                    <el-form-item label="Nom de la catégorie">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="Niveau de la catégrie">
                        <el-select v-model="form.region" placeholder="please select your zone">
                            <el-option v-for="level in form.levels" v-bind:value="level.value">{{level.text}}</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Image">
                        <!--<el-upload-->
                                <!--class="avatar-uploader"-->
                                <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                                <!--:show-file-list="false"-->
                                <!--:on-success="handleAvatarSuccess"-->
                                <!--:before-upload="beforeAvatarUpload">-->
                            <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
                            <!--<i v-else class="el-icon-plus-->
                            <!--avatar-uploader-icon"></i>-->
                        <!--</el-upload>-->
                    </el-form-item>
                    <el-form-item label="Catégorie parente">
                        <el-select v-model="form.region" placeholder="please select your zone">
                            <el-option v-for="category in form.categories" v-bind:value="category.value">{{category.text}}</el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  import ElFormItem from '../../node_modules/element-ui/packages/form/src/form-item.vue'
  import axios from 'axios'

  export default {
    components: {ElFormItem},
    name: 'hello',
    data () {
      console.log('into data')
      console.log(this.getData())
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          levels: [
            { text: '1', value: '1' },
            { text: '2', value: '2' },
            { text: '3', value: '3' }
          ],
          categories: [
            { text: 'Huiles', value: '1' },
            { text: 'Purées', value: '2' },
            { text: 'Confitures', value: '3' }
          ]
        }
      }
    },
    ready () {
      console.log('ce genre de cat')
      console.log(this.getData())
    },
    methods: {
      onSubmit () {
        console.log('submit!')
      },
      getData () {
        axios.get(`http://localhost:8080/category/list`)
          .then(response => {
            // JSON responses are automatically parsed.
            console.log('into get data')
            console.log(response)
            return response
          })
          .catch(e => {
            this.errors.push(e)
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
