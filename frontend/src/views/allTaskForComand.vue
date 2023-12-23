<template>
  <div>
    <taskComand
      v-if="currentTask"
      :taskTitle="currentTask.task_name"
      :taskDescription="currentTask.task_description"
      :taskId="currentTask.task_description"
      @nextTask="nextTask"
      @saveResult="saveResult"
    />
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
      results: [],
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
        alert('Все задания выполнены');
        this.sendResults();
        // this.$router.push('comandPage');
      }
    },
    saveResult(result) {
      this.results.push(result);
    },
    sendResults() {
      axios.post(
        '/commands/SubmitAnswer',
        {
          test_id: this.tasks.test_id,
          data: this.results,
        },
        {
          headers: {
            Authorization: `Bearer ${this.tokenComand.token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      // Здесь отправьте массив результатов на сервер
      // Например, используя axios.post('/api/saveResults', this.results)
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
