<template>
  <div class="myTasks">
    <div class="myTasks__info">
      <div class="myTasks__text">
        <p>{{ info.title }}</p>
        <p>Предмет - {{ info.topic }}</p>
        <p>Класс - {{ info.class }}</p>
      </div>
      <div class="myTasks__text">
        <p v-if="info.complexity">Баллы - {{ info.complexity }}</p>
        <p v-else>На проверке...</p>
      </div>
    </div>

    
  </div>
</template>

<script>
export default {
  props: ['info'],
};
</script>

<style lang="scss" scoped>
.myTasks {
  &__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 0.625rem;
    border: 1px solid #000;
    border-radius: 0.5rem;
  }
  &__text {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
