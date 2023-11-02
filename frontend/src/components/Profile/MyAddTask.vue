<template>
  <div>
    <!--  Тут все задачи которые добавил учитель. И проверенные и не проверенные -->
    <h1>Мои добавленные задачи:</h1>
    <AddTaskChecked v-for="task in info" :key="task.id" :task="task" />
  </div>
</template>

<script>
import AddTaskChecked from '@/components/MyAddTask/AddTaskChecked.vue';
import axios from 'axios';

export default {
  components: { AddTaskChecked },
  data() {
    return {
      info: '',
      token: '',
    };
  },
  mounted() {
    this.token = JSON.parse(localStorage.getItem('local'));
    axios
      .get(`/api/getTasksForTeacher`, {
        headers: {
          Authorization: `Bearer ${this.token.token}`,
        },
      })
      .then((response) => {
        this.info = response.data;
      });
  },
};
</script>

<style scoped lang="scss">
h1 {
  margin-bottom: 2rem;
}
</style>
