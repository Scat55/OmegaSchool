<template>
  <div class="studentTask">
    <h3>Задачи на проверку от ученика</h3>

    <div class="studentTask__tasks">
      <StatusTaskToCheckedStudent
        v-for="(info, idx) in paginatedData"
        :key="idx"
        :info="info"
        class="studentTask__info"
      />

    </div>
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
import axios from 'axios'
import StatusTaskToCheckedStudent from '../TaskToCheckeStudent/StatusTaskToCheckedStudent.vue';
export default {
  components: {
    StatusTaskToCheckedStudent
  },
  data() {
    return {
      token: '',
      info: '',
      pageNumber: 0,
      size: 10,
    }
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
    this.token = JSON.parse(localStorage.getItem('local'));
    axios.get(`/api/getTasksForTeacherByStudent`, {
      headers: {
        Authorization: `Bearer ${this.token.token}`,
      },
    }).then(response => {
      this.info = response.data
    })
  },
}
</script>

<style scoped lang="scss">
.studentTask {

  &__tasks {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

  }

  &__info {
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    border-radius: 0.5rem;
    border: 1px solid #000;
    padding: .625rem;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      transform: scale(1.03);
    }

    &__name {
      font-size: 1.1rem;
    }
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
