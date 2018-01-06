<template>
    <div>
        <div>
            <el-row class="Shortcuts">
                <el-col class="ShortcutsContainer" :span="24" v-for="shortcut in shortcuts" v-bind:data="shortcut" :key="shortcut.id" :class="shortcut.catName">
                    <div v-on:click="addProduct(shortcut)">
                      {{ shortcut.name }}
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
  import axios from 'axios'
  import ElRow from 'element-ui/packages/row/src/row'

  export default {
    components: {ElRow},
    name: 'products',
    data () {
      return {
        shortcuts: this.getShortCuts()
      }
    },
    methods: {

      getShortCuts () {
        axios.get(`${this.$store.state.url}/sale/shortcuts`)
          .then(response => {
            this.shortcuts = response.data
          })
          .catch(e => {
            this.errors.push(e)
          })
      },

      addProduct (item) {
        let itemIndex = this.findIndex(item)
        if (itemIndex !== -1) {
          this.$store.commit('addQuantity', itemIndex)
          this.$store.commit('hackUpdate')
        } else {
          item.quantity = 1
          this.$store.commit('addProduct', item)
        }
        this.$store.commit('calculateTotal')
      },

      findIndex (item) {
        let index = this.$store.state.productList.findIndex(x => x.id === item.id)
        return index
      }
    }
  }
</script>

<style scoped>
    .Shortcuts {
        margin-left: 10px;
    }

    .ShortcutsContainer {
      border: solid 1px;
      border-radius: 10px;
      padding: 5px;
      margin-bottom: 10px;
      font-weight: bold;
    }

    .FM {
      background-color: #79000a;
      color: white;
    }

    .FVL {
      background-color: #fc7a19;
      color: white;
    }

    .FVI {
      background-color: #556B2F;
      color: white;
    }

</style>
