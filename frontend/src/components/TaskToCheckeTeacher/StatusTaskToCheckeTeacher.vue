<script>
export default {
  props: ['task'],
  data() {
    return {};
  },
};
</script>

<!-- Это компонент который выводит задачи на проверку -->
<!--TODO: Главный компонент на котором все задачи-->
<template>
  <div class="task">
    {{ task.test_id }}

    <p class="task__name">{{ task.task_test }}</p>
    <p class="task__description">{{ task.task_description }}</p>
    <!-- <div v-for="question in task.questions"></div> -->
  </div>
</template>

<style scoped lang="scss">
.task {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #fff;
  padding: 20px;
  border-radius: 1rem;
  border: 1px solid #000;
  margin-top: 1rem;
}
</style>
