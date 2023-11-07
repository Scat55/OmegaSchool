<template>
  <div class="studentTask">
    <h3>Задачи на проверку от ученика</h3>

    <div class="studentTask__tasks">
      <div
        v-for="task in info"
        class="studentTask__info"
      >
        <p>{{ task.task_test }}</p>
        <p>Уровень - {{ task.level }}</p>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      token: '',
      info: ''
    }
  },

  methods: {

  },

  mounted() {
    this.token = JSON.parse(localStorage.getItem('local'));
    axios.get(`/api/getTasksForTeacherByStudent`, {
      headers: {
        Authorization: `Bearer ${this.token.token}`,
      },
    }).then(response => {
      this.info = response.data
      console.log(response.data)
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
  }
}
</style>
