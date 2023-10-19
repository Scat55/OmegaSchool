<script setup>

import StatusTaskToCheckeTeacher from "@/components/TaskToCheckeTeacher/StatusTaskToCheckeTeacher.vue";
</script>

<script>
export default {
  data(){
    return {
    }
  },
  computed: {
    filteredTasks() {
      return this.$store.getters.filterCheckedTask(false)
    }
  }
}
</script>
<!-- Эта вкладка для эксперта тут он просматривает задачи от учителей-->
<template>
  <div>
<h1>TaskToCheckTeacher</h1>
    <StatusTaskToCheckeTeacher v-for="task in filteredTasks" :key="task.id" :task="task" />
  </div>
</template>

<style scoped lang="scss">

</style>