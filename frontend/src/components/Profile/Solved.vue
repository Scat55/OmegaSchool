<template>
  <div class="myTasks">
    <div class="myTasks__info">
      <div class="myTasks__text wda">
        <p>{{ info.title }}</p>
        <p>Предмет - {{ info.topic }}</p>
        <p>Класс - {{ info.class }}</p>
        <div class="comment">
          <details v-if="info.complexity === 2 || info.complexity === 3" class="comDetail">
          <summary >Комментарий:</summary>
          <!-- <span class="comment__text">{{ info.ocenka.length > 0 ? info.ocenka : 'Комментарий не был написан' }}</span> -->
          <span class="comment__text">{{ info.ocenka }}</span>
        </details>
        </div>
      </div>
      <div class="myTasks__text">
        <div v-if="info.complexity === 1">
          <p>Уровень - {{ info.complexity }}</p>
          <p>Оценка: {{ info.opt_score }}</p>
        </div>

        <div v-else-if="info.complexity === 2">
          <p>Уровень - {{ info.complexity }}</p>
          <p v-if="info.opt_score">Оценка: {{ info.opt_score }}</p>
          <p v-else>На проверке...</p>
        </div>

        <div v-else-if="info.complexity === 3">
          <p>Уровень - {{ info.complexity }}</p>
          <p v-if="info.opt_score">Оценка: {{ info.opt_score }}</p>
          <p v-else>На проверке...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['info'],
  data() {
    return {};
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
    word-break: break-all;
  }
}

.wda {
  width: 70%;
}

.comDetail {
  display: flex;
  align-items: center;
  &>span {
    margin: 10px 0;
  }
}
</style>
