<template>
  <div class="container">
    <div class="task__info">fgsdfgdfg</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/vars.scss';
.task__info {
  border: 2px solid $lightBlueColor;
  border-radius: 1rem;
  margin-top: 2rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  background: white;
  overflow: hidden;
  transition: all 0.3s;
}
</style>
