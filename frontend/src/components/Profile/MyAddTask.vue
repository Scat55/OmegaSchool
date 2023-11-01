<template>
  <div>
    <!--  Тут все задачи которые добавил учитель. И проверенные и не проверенные -->
    <h1>MyAddTask</h1>
    <AddTaskChecked v-for="task in $store.state.Temp.addTask" :key="task.id" :task="task" />
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
      .get(`/apigetTasksForTeacherByID`, {
        headers: {
          Authorization: `Bearer ${this.token.token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      });
  },
};
</script>

<style scoped lang="scss"></style>
