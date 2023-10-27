<template>
  <div class="container">
    <div class="task__info">
      <p>{{ info.test_text }}</p>
      <p>{{ info.test_description }}</p>
      <div v-for="question in info.questions" class="options">
        <div v-for="option in question.options">{{ option.text }} - {{ option.is_correct }}</div>
      </div>
      <!-- {{ info.add_file }} -->
      <a :href="this.url" :download="this.fileName" @click="downloadFiles()">Скачать</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      id: this.$route.params.id,
      token: '',
      info: '',
      fileName: '',
      url: '',
      blob: '',
    };
  },

  methods: {
    // Скачивание файла
    downloadFiles() {
      this.token = JSON.parse(localStorage.getItem('local'));
      axios
        .get(`/api/download/${this.fileName}`, {
          responseType: 'blob',
          headers: {
            Authorization: `Bearer ${this.token.token}`,
          },
        })
        .then((response) => {
          let blob = new Blob([response.data], { type: 'application/octet-stream' });
          this.url = URL.createObjectURL(blob);
        });
    },
    // Получаем имя файла
    getNameFiles() {
      axios
        .get('/api/list_all_files/', {
          headers: { Authorization: `Bearer ${this.token.token}` },
        })
        .then((response) => {
          console.log(response.data);
          this.fileName = response.data.userFiles;
        });
    },
  },

  mounted() {
    // Получение информации о задаче по id
    this.token = JSON.parse(localStorage.getItem('local'));
    axios
      .get(`/api/getTasksForExpertbyID/${this.id}`, {
        headers: { Authorization: `Bearer ${this.token.token}` },
      })
      .then((response) => {
        console.log(response.data);
        this.info = response.data;
      });

    this.getNameFiles();
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/vars.scss';
.task__info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  border: 2px solid $lightBlueColor;
  border-radius: 1rem;
  margin-top: 2rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  background: white;
  overflow: hidden;
  transition: all 0.3s;
}
.options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
}
</style>
