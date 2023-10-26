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
    <router-link :to="'/taskToExpert/' + task.tast_id">
      <p class="task__name">{{ task.task_test }}</p>
    </router-link>
  </div>
</template>

<style scoped lang="scss">
.task {
  background-color: #fff;
  padding: 20px;
  border-radius: 1rem;
  border: 1px solid #000;
  margin-top: 1rem;
  cursor: pointer;
}
</style>
