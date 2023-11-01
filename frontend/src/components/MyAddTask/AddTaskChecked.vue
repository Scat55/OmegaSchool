<!-- Тут компанент который выводит все эти задачи которые добавил учитель -->
<template>
  <div class="taskTeacher">
    <h1>{{ task.id }}</h1>
    <h1>{{ task.title }}</h1>
    <h1>{{ task.statusCheck }}</h1>
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
  background-color: #fff;
  margin-top: 1rem;
  border: 1px solid #000;
  border-radius: 1rem;
  padding: 0.625rem;
}
</style>
