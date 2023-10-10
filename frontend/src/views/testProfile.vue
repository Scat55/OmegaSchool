<template>
  <div>
    <h1>Profile id {{ id }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$router.currentRoute.params['id']
    }
  },
}
</script>

<style lang="scss" scoped></style>