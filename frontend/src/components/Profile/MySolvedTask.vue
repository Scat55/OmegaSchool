<template>
  <div class="myTasks__tasks">
    <h1 class="myTasks__title">Мои решенные задачи</h1>
    <Solved
      v-for="(info, idx) in paginatedData"
      :key="idx"
      :info="info"
    />
    <div class="buttons">
      <button
        class="buttons__btn"
        @click="prevPage"
        :disabled="pageNumber == 0"
      >Назад</button><button
        class="buttons__btn"
        @click="nextPage"
        :disabled="pageNumber >= pageCount - 1"
      >
        Вперед
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Solved from '../Profile/Solved.vue';
export default {
  components: {
    Solved,
  },
  data() {
    return {
      token: '',
      info: '',
      pageNumber: 0,
      size: 5,
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
    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    },
  },

  mounted() {
    // Получение всех задач и информации о них
    this.token = JSON.parse(localStorage.getItem('local'));
    axios
      .get('/api/getTasksForStudentWithOcenka', {
        headers: {
          Authorization: `Bearer ${this.token.token}`,
        },
      })
      .then((response) => {
        this.info = response.data;
        console.log(response.data);
      });
  },
};
</script>

<style lang="scss" scoped>
.myTasks {
  &__title {
    margin-bottom: 1rem;
  }

  &__tasks {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
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
