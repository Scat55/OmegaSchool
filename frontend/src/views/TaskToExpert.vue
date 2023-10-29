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

      <div class="estimation">
        <p>Оцените задание (1-на доработку. 2-отлично):</p>
        <form class="estimation__form" @submit.prevent="handler()">
          <label class="estimation__label">
            <input type="radio" value="1" name="2" id="1" v-model="valChek" />1</label
          >
          <label class="estimation__label">
            <input type="radio" value="2" name="2" id="2" v-model="valChek" />2</label
          >
          <textarea
            name="message"
            placeholder="Обратная связь по заданию"
            class="estimation__message"
            v-model="message"
            v-if="this.valChek === '1'"
          ></textarea>
          <button class="estimation__btn" type="submit">Отправить</button>
        </form>
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
      valChek: '',
      message: '',
    };
  },
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
    // Появление файла
    changeStatus() {
      this.isShow = !this.isShow;
    },
    // Обработка формы
    handler() {
      console.log(this.valChek, this.message);
      this.token = JSON.parse(localStorage.getItem('local'));
      const ver = this.valChek;
      const ver_masseg = this.message;
      const test_id = this.id;
      axios.post(
        '/api/updateTestByExpert',
        {
          ver: ver,
          ver_masseg: ver_masseg,
          test_id: test_id,
        },
        {
          headers: {
            Authorization: `Bearer ${this.token.token}`,
            'Content-Type': 'application/json'
          }
        },
      );
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
.estimation {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.estimation__input {
  width: 4.2rem;
  outline: none;
  padding: 0.625rem;
  border-radius: 0.3rem;
  border: 1px solid #000;
}
.estimation__label {
  display: flex;
  gap: 1rem;
  margin-top: 0.2rem;
}
.estimation__message {
  width: 40rem;
  height: 8rem;
  outline: none;
  margin-top: 1rem;
  padding: 0.625rem;
  border-radius: 0.3rem;
  border: 1px solid #000;
  resize: none;
}
.estimation__btn {
  display: block;
  width: 8rem;
  margin-top: 1rem;
  border-radius: 0.5rem;
  border: none;
  padding: 0.625rem;
  cursor: pointer;
  background-color: #5eb6ff;
  transition: all 0.3s;
  color: #fff;

  &:hover {
    transform: scale(1.1);
  }
}
</style>
