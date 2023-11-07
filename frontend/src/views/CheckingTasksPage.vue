<template>
  <div>
    {{ id }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id
    }
  },
}
</script>

<style lang="scss" scoped></style>