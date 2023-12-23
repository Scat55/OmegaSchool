<template>
  <div>
    <taskComand
      v-if="currentTask"
      :taskTitle="currentTask.task_name"
      :taskDescription="currentTask.task_description"
      :taskId="currentTask.task_description"
      @nextTask="nextTask"
    />
    <!-- <button v-if="currentTask" @click="nextTask">Далее</button>
    <div v-else>
      <p>Все задания выполнены</p>
    </div> -->
  </div>
</template>

<script>
import taskComand from '@/components/taskComand.vue';
import axios from 'axios';

export default {
  components: { taskComand },
  data() {
    return {
      tasks: [],
      currentTaskIndex: 0,
    };
  },
  computed: {
    currentTask() {
      return this.tasks[this.currentTaskIndex];
    },
  },
  methods: {
    nextTask() {
      if (this.currentTaskIndex < this.tasks.length - 1) {
        this.currentTaskIndex++;
      } else {
        // Все задания выполнены, можно выполнить какое-то действие
        console.log('Все задания выполнены');
      }
    },
    fetchTasks() {
      this.tokenComand = JSON.parse(localStorage.getItem('comand'));
      axios
        .get('/commands/getTasks', {
          headers: {
            Authorization: `Bearer ${this.tokenComand.token}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          this.tasks = res.data.task;
        });
    },
  },
  mounted() {
    this.fetchTasks();
  },
};
</script>

<style lang="scss" scoped></style>
