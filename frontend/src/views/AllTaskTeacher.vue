<template>
  <div class="container">
    <div class="infoTask">
      <div class="infoTask__titles">
        <!-- Название задания-->
        <p>{{ infoTask.test_text }}</p>
        <div class="infoTask__allInfo">
          <p>Класс - {{ infoTask.classes }}</p>
          <p>Предмет - {{ infoTask.subject }}</p>
        </div>
      </div>

      <!-- Описание задания -->
      <textarea
        type="text"
        :value="infoTask.test_description"
        disabled="disabled"
        class="infoTask__descr"
      ></textarea>

      <!-- Картинка -->
      <img
        v-if="this.infoTask.add_img"
        :src="require('../../../newBack/uploads/' + infoTask.user_id + '/' + infoTask.add_img)"
        class="infoTask__image"
        alt="Image"
        data-fancybox="gallery"
      />

      <!-- Блок с вопросами -->
      <div v-for="question in infoTask.questions" class="infoTask__options">
        <div v-for="option in question.options">{{ option.text }} - {{ option.is_correct }}</div>
      </div>

      <!-- Блок с подсказками -->
      <p class="infoTask__show" @click="isShowAnswer = !isShowAnswer">Показать подсказки</p>
      <div v-if="isShowAnswer">
        <div class="infoTask__answer" v-if="infoTask.task_hint || info.task_answer">
          <p>Подсказдка - {{ infoTask.task_hint }}</p>
          <p>Ответ - {{ infoTask.task_answer }}</p>
        </div>
      </div>

      <div class="infoTask__dop">
        <p>Дополнительные файлы</p>
        <img
          class="infoTask__arrow"
          :class="{ rotate: isShow }"
          src="../assets/images/arrow.png"
          alt="Arrow"
          @click="isShow = !isShow"
        />
      </div>

      <div v-if="isShow">
        <p>{{ infoTask.add_file }}</p>
        <a v-if="infoTask.add_file !== null" class="downloadLink"
          ><button @click="downloadFiles()" class="infoTask__btn">Скачать</button></a
        >
        <p v-else>Файлов нет</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
export default {
  props: {
    options: Object,
  },
  data() {
    return {
      id: this.$route.params.id,
      token: '',
      infoTask: '',
      isShowAnswer: false,
      isShow: false,
      userID: '',
      blob: '',
      url: '',
    };
  },
  methods: {
    // Скачивание файла
    async downloadFiles() {
      this.token = JSON.parse(localStorage.getItem('local'));
      await axios
        .get(`/api/download/${this.infoTask.add_file}`, {
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
  },
  mounted() {
    this.token = JSON.parse(localStorage.getItem('local'));
    axios
      .get(`/api/getTasksForTeacherByID/${this.id}`, {
        headers: {
          Authorization: `Bearer ${this.token.token}`,
        },
      })
      .then((response) => {
        this.infoTask = response.data;
        this.userID = response.data.user_id;
      });
    Fancybox.bind(this.$refs.container, '[data-fancybox]', {
      ...(this.options || {}),
    });
  },
};
</script>

<style lang="scss" scoped>
.infoTask {
  margin-top: 1rem;
  background-color: #fff;
  padding: 1.25rem;
  border-radius: 1rem;
  border: 1px solid #000;

  &__titles {
    display: flex;
    justify-content: space-between;
  }

  &__allInfo {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__descr {
    margin-top: 2rem;
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

  &__image {
    margin-top: 1rem;
    width: 18.75rem;
    cursor: pointer;
  }

  &__options {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2rem;
  }

  &__answer {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-top: 1rem;
  }

  &__dop {
    display: flex;
    gap: 0.5rem;
    margin-top: 2rem;
  }

  &__show {
    margin-top: 1rem;
    cursor: pointer;
  }
  &__arrow {
    transition: all 0.3s;
  }

  &__btn {
    padding: 0.625rem;
    background-color: #fff;
    border-radius: 0.5rem;
    border: 1px solid #000;
    margin-top: 1rem;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      transform: scale(0.9);
    }
  }
}

.rotate {
  transform: rotate(-180deg);
}
</style>
