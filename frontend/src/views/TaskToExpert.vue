<template>
  <div class="container">
    <div class="task__info">
      <p>{{ info.test_text }}</p>
      <p>{{ info.test_description }}</p>
      <div v-for="question in info.questions" class="options">
        <div v-for="option in question.options">{{ option.text }} - {{ option.is_correct }}</div>
      </div>

      <div class="dop">
        <p>Дополнительные файлы</p>
        <img
          class="arrow__img"
          :class="{ rotate: isShow }"
          src="../assets/images/arrow.png"
          alt="Arrow"
          @click="changeStatus()"
        />
      </div>

      <div v-if="isShow">
        <p>{{ this.info.add_file }}</p>
        <a class="downloadLink"><button @click="downloadFiles()">Скачать</button></a>
      </div>
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
      isShow: false,
      file: '',
    };
  },
  // computed: {
  //   changeName() {
  //     return this.info.add_file.split('_')[4];
  //   },
  // },
  methods: {
    // Скачивание файла
    async downloadFiles() {
      this.token = JSON.parse(localStorage.getItem('local'));
      await axios
        .get(`/api/download/${this.info.add_file}`, {
          responseType: 'blob',
          headers: {
            Authorization: `Bearer ${this.token.token}`,
          },
        })
        .then((response) => {
          this.blob = new Blob([response.data], { type: 'application/pdf' });
          this.url = URL.createObjectURL(this.blob);
          const a = document.querySelector('.downloadLink');
          a.href = this.url;
          a.download = this.fileName;
        });
    },
    changeStatus() {
      this.isShow = !this.isShow;
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
.dop {
  display: flex;
  gap: 0.5rem;
}
.downloadLink {
  margin-top: 1rem;
  text-decoration: none;
}
.arrow__img {
  transition: all 0.3s;
}
.rotate {
  transform: rotate(-180deg);
}
</style>
