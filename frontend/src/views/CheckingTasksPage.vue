<template>
  <div class="container">
    <div class="task__info">
      <div class="task__main-info">
        <div class="task__main-info-text">
          <p class="task__main-info-title">{{ info.test_text }}</p>

          <div class="task__main-info-student">
            <p>Уровень - {{ info.level }}</p>
            <p>{{ info.subject }}</p>
            <p>Класс - {{ info.classes }}</p>
          </div>
        </div>
      </div>
      <div>
        <textarea
          type="text"
          :value="info.answer_student"
          disabled="disabled"
          class="task__main-info-descr"
        ></textarea>
      </div>
      <img
        v-if="this.info.add_img_by_student"
        :src="require('../../../newBack/uploads/' + info.user_id + '/' + info.add_img_by_student)"
        class="image"
        alt="Image"
        data-fancybox="gallery"
      />

      <div class="answer" v-if="info.task_hint || info.task_answer">
        <p>
          Подсказка бралась - <span>{{ info.check_answer }}</span>
        </p>
        <p>
          Ответ брался - <span>{{ info.check_hint }}</span>
        </p>
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
        <p>{{ this.info.add_file_by_student }}</p>
        <a v-if="this.info.add_file_by_student !== null" class="downloadLink"
          ><button @click="downloadFiles()">Скачать</button></a
        >
        <p v-else>Файлов нет</p>
      </div>

      <div class="estimation">
        <p>Оцените задание (0 - брал ответ. 1-брал подсказку. 2-решил сам):</p>
        <form class="estimation__form" @submit.prevent="handler()">
          <label class="estimation__label">
            <input type="radio" value="0" name="2" id="0" v-model="valChek" />0</label
          >
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
          ></textarea>
          <button class="estimation__btn" type="submit">Отправить</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
export default {
  data() {
    return {
      id: this.$route.params.id,
      userID: this.$route.params.userID,
      token: '',
      info: '',
      isShow: false,
      valChek: '',
      message: '',
      fileName: '',
      url: '',
      blob: '',
      file: '',
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
            'Custom-UUID': this.userID,
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
      const opt_score = this.valChek;
      const text_solution = this.message;
      axios.post(
        `/api/updateTestByTeacher/${this.id}/${this.userID}`,
        {
          opt_score: opt_score,
          text_solution: text_solution,
        },
        {
          headers: {
            Authorization: `Bearer ${this.token.token}`,
          },
        },
      );
      console.log(opt_score);
    },
  },

  mounted() {
    this.token = JSON.parse(localStorage.getItem('local'));
    axios
      .get(`/api/getTasksForTeacherByStudentByID/${this.id}/${this.userID}`, {
        headers: {
          Authorization: `Bearer ${this.token.token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        this.info = response.data;
        console.log(response.data);
      });
    Fancybox.bind(this.$refs.container, '[data-fancybox]', {
      ...(this.options || {}),
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
.task__main-info {
  &-text {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &-title {
    margin-bottom: 2rem;
  }
  &-descr {
    width: 100%;
    overflow: auto;
    height: 20rem;
    padding: 0.625rem;
    outline: none;
    resize: none;
    line-height: 180%;
    font-size: 1.3rem;
    border-radius: 1rem;
    color: #000;
    background: #fff;
  }
  &-student {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
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
  margin-top: 1rem;
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
.image {
  width: 18.75rem;
  cursor: pointer;
}

.answer {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 1rem;
}
</style>
