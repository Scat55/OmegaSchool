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
    axios.get(`/getUserIdForInf/${this.id}`).then(response => {
      console.log(response.data)
      this.email = response.data.user.email
    })
  },
}
</script>

<style lang="scss" scoped></style>