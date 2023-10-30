<script setup>
import StatusTaskToCheckeTeacher from '@/components/TaskToCheckeTeacher/StatusTaskToCheckeTeacher.vue';
</script>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      token: '',
      tasks: [],
      taskID: '',
    };
  },
  computed: {
    filteredTasks() {
      return this.$store.getters.filterCheckedTask(false);
    },
  },
  mounted() {
    this.token = JSON.parse(localStorage.getItem('local'));
    axios
      .get('/api/getTestForExpert', {
        headers: {
          Authorization: `Bearer ${this.token.token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        this.taskID = response.data.tast_id;
        this.tasks = response.data;
      });
  },
};
// TODO: комонент задачи
</script>
<!-- Эта вкладка для эксперта тут он просматривает задачи от учителей-->
<template>
  <div>
    <h1>Задачи от учителя</h1>
    <div class="task">
      <div v-for="task in tasks">
        <StatusTaskToCheckeTeacher :key="task.id" :task="task" class="task__item" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.task {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}
</style>
