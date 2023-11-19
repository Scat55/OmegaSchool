<template>
  <div class="myTasks">
    <div class="myTasks__info">
      <div class="myTasks__text">
        <p>{{ info.title }}</p>
        <p>Предмет - {{ info.topic }}</p>
        <p>Класс - {{ info.class }}</p>
      </div>
      <div class="myTasks__text">
        <p info.complexity>Уровень - {{ info.complexity }}</p>

        <p v-if="info.opt_score">Оценка: {{ info.opt_score }}</p>
        <p v-else>На проверке...</p>
        <div class="comment">
          <p v-if="info.opt_score">Комментарий:</p>
          <span class="comment__text">{{ info.ocenka }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['info'],
  data() {
    return {

    }
  },
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
    gap: 0.8rem;
  }
}

.comment {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;

  &__text {
    width: 12.5rem;
  }
}
</style>
