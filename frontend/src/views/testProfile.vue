<template>
  <div>
    <h1>Profile id {{ id }} {{ email }}</h1>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      id: this.$router.currentRoute.params['id'],
      email: ''
    }
  },
  mounted() {
    axios.get(`/getUser/${this.email}`).then(response => {
      console.log(response.data)
    })
  },
}
</script>

<style lang="scss" scoped></style>