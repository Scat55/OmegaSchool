<template>
  <div class="myTasks">
    <h1 class="myTasks__title">Мои решенные задачи</h1>
    <div class="myTasks__tasks">
      <div v-for="info in info" :key="info.id" class="myTasks__task">
        <div class="myTasks__info">
          <div class="myTasks__text">
            <p>{{ info.title }}</p>
            <p>Предмет - {{ info.topic }}</p>
            <p>Класс - {{ info.class }}</p>
          </div>
          <div class="myTasks__text">
            <p v-if="info.complexity">Баллы - {{ info.complexity }}</p>
            <p v-else>На проверке...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      token: '',
      info: '',
    };
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
<style scoped lang="scss">
.myTasks {
  &__title {
    margin-bottom: 1rem;
  }

  &__tasks {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  &__task {
    background-color: #fff;
    padding: 0.625rem;
    border: 1px solid #000;
    border-radius: 0.5rem;
  }

  &__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__text {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
