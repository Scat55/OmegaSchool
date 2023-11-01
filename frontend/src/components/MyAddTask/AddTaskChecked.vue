<!-- Тут компанент который выводит все эти задачи которые добавил учитель -->
<template>
  <div class="taskTeacher">
    <p class="taskTeacher__name">{{ task.task_test }}</p>
    <span>Уровень - {{ task.level }}</span>
  </div>
</template>

<script>
export default {
  props: ['task'],
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
.taskTeacher {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  margin-top: 1rem;
  border: 1px solid #000;
  border-radius: 1rem;
  padding: 0.625rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: scale(1.03);
  }

  &__name {
    font-size: 1.1rem;
  }
}
</style>
