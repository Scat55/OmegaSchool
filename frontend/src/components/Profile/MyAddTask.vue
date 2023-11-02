<template>
  <div>
    <!--  Тут все задачи которые добавил учитель. И проверенные и не проверенные -->
    <h1>Мои добавленные задачи:</h1>
    <AddTaskChecked v-for="task in paginatedData" :key="task.id" :task="task" />
    <button @click="nextPage">Next</button><button @click="prevPage">Last</button>
  </div>
</template>

<script>
import AddTaskChecked from '@/components/MyAddTask/AddTaskChecked.vue';
import axios from 'axios';

export default {
  components: { AddTaskChecked },
  data() {
    return {
      info: [],
      token: '',
      pageNumber: 1,
      size: 8,
    };
  },
  computed: {
    pageCount() {
      let l = this.info.length,
        s = this.size;
      // редакция переводчика спасибо комментаторам
      return Math.ceil(l / s);
      // оригинал
      // return Math.floor(l/s);
    },
    paginatedData() {
      const start = this.pageNumber * this.size,
        end = start + this.size;
      return this.info.slice(start, end);
    },
  },
  methods: {
    async getAllTask() {
      this.token = JSON.parse(localStorage.getItem('local'));
      await axios
        .get(`/api/getTasksForTeacher`, {
          headers: {
            Authorization: `Bearer ${this.token.token}`,
          },
        })
        .then((response) => {
          this.info = response.data;
        });
    },
    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    },
  },
  mounted() {
    this.getAllTask();
  },
};
</script>

<style scoped lang="scss">
h1 {
  margin-bottom: 2rem;
}
</style>
