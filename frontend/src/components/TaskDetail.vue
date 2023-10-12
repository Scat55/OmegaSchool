<template>
  <div class="task-detail">
    <h2>{{ task.title }}</h2>
    <h2>{{ $route.params.id }}</h2>
    <div class="topic">Предмет: {{ task.topic }}</div>
    <div class="complexity">Уровень задания: {{ task.complexity }}</div>
    <div class="bodyTask">{{ task.bodyTask }}</div>
  </div>
</template>

<script>
export default {
  // props: {
  //   task: {
  //     type: Object,
  //     required: true
  //   }
  // },
  computed: {
    task() {
      return this.$store.state.zadania.find(t => t.id == this.$route.params.id)
    }
  }
}
</script>

<style scoped></style>