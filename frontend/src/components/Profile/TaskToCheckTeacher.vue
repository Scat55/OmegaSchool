<script setup>

import StatusTaskToCheckeTeacher from "@/components/TaskToCheckeTeacher/StatusTaskToCheckeTeacher.vue";
</script>

<script>
import axios from "axios";

export default {
  data(){
    return {
      token: '',
      tasks: []
    }
  },
  computed: {
    filteredTasks() {
      return this.$store.getters.filterCheckedTask(false)
    }
  },
  // mounted() {
  //   this.token = JSON.parse(localStorage.getItem('local'))
  //   axios.get('/api/getTasksForExpert', {
  //     headers: {
  //       'Authorization': `Bearer ${this.token.token}`,
  //     },
  //   }).then(response => {
  //     this.tasks = response.data
  //   })
  //
  // }
}
// TODO: комонент задачи
</script>
<!-- Эта вкладка для эксперта тут он просматривает задачи от учителей-->
<template>
  <div>
<h1>TaskToCheckTeacher</h1>
    <StatusTaskToCheckeTeacher v-for="task in tasks" :key="task.id" :task="task" />
  </div>
</template>

<style scoped lang="scss">

</style>