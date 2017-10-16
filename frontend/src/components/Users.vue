<template>
  <div>
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
console.log('into good script')

export default {
  name: 'users',
  data () {
    return {
      title: 'This the users page'
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
</style>
