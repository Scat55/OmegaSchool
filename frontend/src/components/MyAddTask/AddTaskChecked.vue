<script>
export default {
  props: ['task'],
  data() {
    return {};
  },
};
</script>
<!-- Тут компанент который выводит все эти задачи которые добавил учитель -->
<template>
  <div>
    <h1>{{ task.id }}</h1>
    <h1>{{ task.title }}</h1>
    <h1>{{ task.statusCheck }}</h1>
  </div>
</template>

<style scoped lang="scss"></style>
