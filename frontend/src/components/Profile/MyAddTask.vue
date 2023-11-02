<template>
  <div>
    <!--  Тут все задачи которые добавил учитель. И проверенные и не проверенные -->
    <h1>Мои добавленные задачи:</h1>
    <AddTaskChecked v-for="task in paginatedData" :key="task.id" :task="task" />
    <div class="buttons">
      <button class="buttons__btn" @click="prevPage" :disabled="pageNumber == 0">Назад</button
      ><button class="buttons__btn" @click="nextPage" :disabled="pageNumber >= pageCount - 1">
        Вперед
      </button>
    </div>
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
      pageNumber: 0,
      size: 10,
    };
  },
  computed: {
    pageCount() {
      let l = this.info.length,
        s = this.size;
      // редакция переводчика спасибо комментаторам
      return Math.ceil(l / s);
      // оригинал
      // return Math.floor(l / s);
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
@import '../../assets/styles/vars.scss';
h1 {
  margin-bottom: 2rem;
}
.buttons {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  justify-content: flex-end;

  &__btn {
    padding: 0.625rem;
    background-color: #fff;
    border: 1px solid #000;
    border-radius: 0.5rem;
    cursor: pointer;
  }
}
</style>
