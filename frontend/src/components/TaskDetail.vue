<template>
  <div class="container">
    <div class="taskDetal">
      <router-link to="/task">
        <p class="taskDetal__back">Вернуться к списку заданий</p>
      </router-link>
      <div class="taskDetal__title">
        <h2>{{ infoTask.title }}</h2>
      </div>
      <div class="taskDetal__infoTask">
        <p>Название: {{ infoTask.test_text }}</p>
        <p class="taskDetal__infoTask__complexity">Уровень задания: {{ infoTask.level }}</p>
        <p class="taskDetal__infoTask__topic">Предмет: {{ infoTask.subject }}</p>
      </div>
      <div class="taskDetal__bodyTask">
        <span>Условие задания:</span>
        <quill-editor
          disabled="disabled"
          v-model="infoTask.test_description"
          :options="{ modules: { toolbar: false }, theme: 'bubble' }"
        />
      </div>
      <div class="images" id="gallery">
        <div v-if="infoTask.add_img" v-for="img in images">
          <!-- {{ 'newBack/uploads/' + infoTask.user_id + '/' + img }} -->
          <img :src="img" class="image" alt="Image" data-fancybox="gallery" />
        </div>
      </div>
      <!--  Доп.материалы Start  -->
      <div class="taskDetal__addedFile">
        <p class="files">Дополнительные материалы</p>
        <img
          @click="showFiles()"
          src="../assets/images/arrow.png"
          alt="Arrow"
          class="files__arrow"
          :class="{ rotate: isShow }"
        />

        <div class="taskDetal__infoFile" v-if="isShow">
          <p>{{ this.infoTask.add_file }}</p>
          <a
            v-if="this.infoTask.add_file !== null && this.infoTask.add_file !== ''"
            class="downloadLink"
            ><button @click="downloadFiles()" class="btn">Скачать</button></a
          >
          <p v-else>Файлов нет</p>
        </div>
      </div>
      <!--  END -->

      <!-- Чекбоксы -->

      <div
        class="taskDetal__questions"
        v-for="(options, index) in this.infoTask.questions"
        v-if="infoTask.level == 1 && infoTask.decided === 'Не решено'"
        :key="index"
      >
        <label>{{ index + 1 }}) {{ options.text }}</label>
        -
        <input
          type="checkbox"
          :name="`question-${index}`"
          :value="options.text"
          v-model="userAnswers[index]"
          ref="checkAnswer"
        />
      </div>

      <!--   Конец чекбоксы   -->

      <!-- Решение начало -->
      <div
        class="taskDetal__answer"
        v-if="(infoTask.level == 2 || infoTask.level == 3) && infoTask.decided === 'Не решено'"
      >
        <textarea
          class="taskDetal__infoAnswer"
          placeholder="Введите ваш ответ"
          v-model="infoArea"
        ></textarea>
        <input type="file" class="taskDetal__file" ref="file" multiple />
      </div>
      <!-- Решение конец -->

      <!-- Подсказка начало -->
      <!-- <div class="taskDetal__hitn" v-if="hint">
        <p>Подсказка:</p>
        <quill-editor
          disabled="disabled"
          v-model="this.hint"
          :options="{ modules: { toolbar: false }, theme: 'bubble' }"
        />
      </div> -->
      <!-- Подсказка конец -->

      <!-- Ответ начало -->

      <!-- <div class="taskDetal__answer" v-if="answer">
        <p>Ответ:</p>
        <quill-editor
          disabled="disabled"
          v-model="this.answer"
          :options="{ modules: { toolbar: false }, theme: 'bubble' }"
        />
      </div> -->
      <!-- Ответ конец -->

      <!-- Кнопки  начало -->
      <div
        class="taskDetal__buttons"
        v-if="infoTask.level == 2 && infoTask.decided === 'Не решено'"
      >
        <button class="taskDetal__btn" @click="sendLevelTwoTest">Отправить</button>
        <!-- <button class="taskDetal__btn" @click="showHint">Взять подсказку</button>
        <button class="taskDetal__btn" @click="showAnswer">Показать ответ</button> -->
      </div>
      <button
        class="taskDetal__button"
        v-if="infoTask.level == 1 && infoTask.decided === 'Не решено'"
        @click="sendLevelOneTest"
      >
        Отправить
      </button>

      <div class="taskDetal__buttons" v-if="infoTask.level == 3">
        <button class="taskDetal__btn" @click="sendLevelThreeTest">Отправить</button>
        <!-- <button class="taskDetal__btn" @click="showHint">Взять подсказку</button>
        <button class="taskDetal__btn" @click="showAnswer">Показать ответ</button> -->
      </div>
      <!-- Кнопки конец -->

      <!--  Блок только для 1 лвл заданий START  -->
      <!-- <div
        class="likes"
        v-if="infoTask.decided === 'Не решено'"
      >
        {{ like }}
        <img
          src="../assets/images/hert.png"
          alt="Like"
          class="like"
          
        >
      </div> -->
      <div class="likes">
        {{ this.infoTask.likes }}
        <img src="../assets/images/hert.png" alt="Like" class="like" @click="changeLike" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { quillEditor } from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
export default {
  components: {
    quillEditor,
  },
  props: {
    options: Object,
  },
  data() {
    return {
      id: this.$route.params.id,
      userChecks: [],
      isShow: false,
      infoTask: '',
      teachrID: '',
      valChek: '',
      answer: '',
      isCorrect: '',
      userAnswers: [],
      infoArea: '',
      hint: '',
      testID: '',
      file: '',
      token: '',
      data: '',
      addIMG: '',
      like: 0,
      images: [],
      image: '',
      isLiked: false,
    };
  },
  computed: {
    splitFiles() {
      return this.image.split(',');
    },
  },
  // computed: {
  //   task() {
  //     return this.infoTask = this.id;
  //   },
  // },
  methods: {
    //   initializeUserAnswers() {
    //     this.userAnswers = this.infoTask.questions.map(() => false);
    // },
    test() {
      console.log(this.infoArea);
    },
    async changeLike() {
      this.token = JSON.parse(localStorage.getItem('local'));
      if (!this.isLiked) {
        this.infoTask.likes++;
        this.isLiked = !this.isLiked;
        await axios.post(
          `/api/likeToDeskriotion/${this.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${this.token.token}`,
              'Content-Type': 'application/json',
            },
          },
        );
      } else {
        this.infoTask.likes--;
        this.isLiked = !this.isLiked;
        await axios.post(
          `/api/likeToDeskriotion/${this.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${this.token.token}`,
              'Content-Type': 'application/json',
            },
          },
        );
      }
    },
    async downloadImages() {
      this.token = JSON.parse(localStorage.getItem('local'));
    },
    sendLevelOneTest() {
      this.token = JSON.parse(localStorage.getItem('local'));
      // const comparisonResult = this.infoTask.questions.map((question, index) => {
      //   return question.is_correct === this.userAnswers[index];
      // });
      // const comparisonResult2 = this.infoTask.questions.map((question, index) => {
      //   return question.is_correct;
      // });

      const results = this.userAnswers.map((answer, index) => {
        return answer === this.infoTask.questions[index].is_correct;
      });

      const allCorrect = results.every((isCorrect) => isCorrect);

      console.log(allCorrect);
      if (allCorrect) {
        alert('Верно! Вы получили 1 балл.');
        this.data = { options: 1 };
        this.$router.push('/task');
      } else {
        alert('Неверно. Вы получили 0 баллов.');
        this.data = { options: 0 };
        this.$router.push('/task');
      }

      axios
        .post(`/api/getAnswerByStudent1/${this.testID}/`, this.data, {
          headers: {
            Authorization: `Bearer ${this.token.token}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log(response.data);
          response.data.options = this.data.options;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    sendLevelTwoTest() {
      this.token = JSON.parse(localStorage.getItem('local'));
      this.file = this.$refs.file.files;
      let allFiles = Object.values(this.file).map((el) => {
        return el;
      });

      axios.post(`/api/getAnswerByStudent2/${this.testID}/${this.infoArea}`, allFiles, {
        headers: {
          Authorization: `Bearer ${this.token.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Задание отпралено на проверку');
      this.infoArea = '';
      this.$router.push('/task');
    },
    sendLevelThreeTest() {
      this.token = JSON.parse(localStorage.getItem('local'));
      this.file = this.$refs.file.files;
      let allFiles = Object.values(this.file).map((el) => {
        return el;
      });

      axios.post(`/api/getAnswerByStudent3/${this.testID}/${this.infoArea}`, allFiles, {
        headers: {
          Authorization: `Bearer ${this.token.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Задание отпралено на проверку');
      this.infoArea = '';
      this.$router.push('/task');
    },
    showAnswer() {
      this.token = JSON.parse(localStorage.getItem('local'));
      axios
        .post(
          `/api/getTasksAnswerForStudent/${this.testID}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${this.token.token}`,
              'Content-Type': 'application/json',
            },
          },
        )
        .then((response) => {
          this.answer = response.data.task_answer;
        });
    },
    showHint() {
      this.token = JSON.parse(localStorage.getItem('local'));
      axios
        .post(
          `/api/getTasksHintForStudent/${this.testID}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${this.token.token}`,
              'Content-Type': 'application/json',
            },
          },
        )
        .then((response) => {
          this.hint = response.data.task_hint;
        });
    },
    // Скачивание файла
    async downloadFiles() {
      this.token = JSON.parse(localStorage.getItem('local'));
      await fetch(`/api/download_file/${this.infoTask.add_file}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.token.token}`,
          'Custom-UUID': this.teachrID,
        },
      })
        .then((res) => res.blob())
        .then((data) => {
          let url = URL.createObjectURL(data); // Создаем ссылку

          let anchor = document.createElement('a');
          anchor.href = url;
          anchor.download = this.fileName;
          document.body.append(anchor);
          anchor.style = 'display:none';
          anchor.click();
          anchor.remove();
          URL.revokeObjectURL(url);
        });
    },
    // initializeUserChecks() {
    //   this.userChecks = this.infoTask.checkPoint.map(() => false);
    // },
    // getFileName(url) {
    //   return url.substring(url.lastIndexOf('/') + 1);
    // },
    // checkAnswer() {
    //   // this.task.status = true;
    //   let isCorrect = true;
    //   for (let i = 0; i < this.infoTask.questions[0].options.length; i++) {
    //     if (this.userChecks[i] !== this.infoTask.questions[i].checked) {
    //       isCorrect = false;
    //       break;
    //     }
    //   }
    //   if (isCorrect) {
    //     alert('Верно! Вы получили 2 балла.');
    //   } else {
    //     alert('Неверно. Вы получили 0 баллов.');
    //   }
    // },
    helpMe() {},
    showMeAnswer() {},
    showFiles() {
      this.isShow = !this.isShow;
    },
  },
  created() {
    // this.initializeUserChecks();
    // this.initializeUserAnswers();
    this.token = JSON.parse(localStorage.getItem('local'));
  },

  mounted() {
    axios
      .get(`/api/getTasksForStudent/${this.id}`, {
        headers: {
          Authorization: `Bearer ${this.token.token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        this.infoTask = response.data;
        this.teachrID = response.data.user_id;
        this.testID = response.data.test_id;
        this.addIMG = response.data.add_img;

        let nameImage = this.addIMG.split(',');

        for (let i = 0; i < nameImage.length; i++) {
          axios
            .get(`/api/download_image/${nameImage[i]}`, {
              headers: {
                Authorization: `Bearer ${this.token.token}`,
                'Custom-UUID': this.teachrID,
              },
            })
            .then((res) => {
              this.image = `data:${res.data.contentType};base64,${res.data.data}`;
              this.images.push(this.image);
            });
        }
      });

    Fancybox.bind(this.$refs.container, '[data-fancybox]', {
      ...(this.options || {}),
    });
    // console.log(this.addIMG)
  },
};
</script>

<style scoped lang="scss">
@import '../assets/styles/vars.scss';

.taskDetal {
  margin-top: 80px;
  background: white;
  // padding-top: .625rem;
  // padding-left: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  border: 2px solid #487fb8;

  &__title {
    text-align: center;
  }

  &__infoTask {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 10px 0;
  }

  &__bodyTask {
    margin-top: 4rem;

    display: flex;
    flex-direction: column;
    line-height: 160%;

    & > span {
      font-weight: bold;
    }

    &-text {
      margin-top: 2rem;
    }
  }

  &_button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    &-btn {
      padding: 0.5rem;
      border-radius: 1rem;
      border: none;
      cursor: pointer;

      &:first-child {
        background-color: $accentColor;
        color: #fff;
      }

      &:nth-child(2) {
        background-color: $lightBlueColor;
        color: #fff;
      }

      &:last-child {
        background-color: #00dfcc;
      }
    }
  }

  &__back {
    background-color: $accentColor;
    display: inline-block;
    margin-bottom: 1rem;
    padding: 0.5rem;
    color: #fff;
    border-radius: 1rem;
    font-size: 0.7rem;
    transition: all 0.3s;

    &:hover {
      transform: scale(0.95);
      cursor: pointer;
    }
  }

  &__addedFile {
    margin-top: 1rem;
  }

  &__infoFile {
    margin-top: 2rem;
  }

  &__image {
    margin-top: 1rem;
    width: 18.75rem;
    cursor: pointer;
  }

  &__questions {
    margin-top: 1rem;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__question {
    list-style: none;
  }

  &__buttons {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;
  }

  // стили кнопка "Выбрать файл" начало

  .taskDetal__file {
    display: block;
    margin-top: 1rem;
    padding: 0.625rem;
    border: 1px solid #487fb8;
    border-radius: 0.5rem;
    cursor: pointer;
    background-color: #fff;
    color: #000;
    //text-align: center;
    transition: all 0.3s;
    outline: none;
    margin-bottom: 1rem;

    &:hover {
      background-color: rgba(94, 183, 255, 0.9);
      color: #fff;
    }

    &::file-selector-button {
      padding: 0.625rem;
      border-radius: 0.5rem;
      border: none;
      background-color: $lightBlueColor;
      color: #fff;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: darken($lightBlueColor, 10%); // Темнее на 10% при наведении
      }
    }
  }

  // стили кнопка конец

  &__btn {
    padding: 0.625rem;
    background-color: #fff;
    border-radius: 0.5rem;
    cursor: pointer;
    border: 1px solid #000;
    transition: all 0.3s;

    &:hover {
      transform: scale(1.1);
    }
  }

  &__button {
    margin-top: 1rem;
    padding: 0.625rem;
    background-color: #fff;
    border-radius: 0.5rem;
    cursor: pointer;
    border: 1px solid #000;
    transition: all 0.3s;

    &:hover {
      transform: scale(1.1);
    }
  }

  &__answer {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    //margin-top: 1rem;
    margin: 1rem auto 0 auto;
    width: 100%;
  }

  &__infoAnswer {
    padding: 0.625rem;
    resize: none;
    border-radius: 1rem;
    width: 100%;
    height: 10rem;
    font-size: 1.2rem;
  }

  &__hitn {
    margin-top: 1rem;
  }
}

.container_answer {
  //padding: 5px 0 15px 0;
  border: 2px solid #000;
  padding: 1rem;
  border-radius: 1rem;
  margin-bottom: 1rem;
}

.itemAnswer {
  margin: 8px 0;
  display: flex;
  align-items: center;

  & > input {
    margin-right: 5px;
  }
}

.files {
  display: inline-block;

  &__arrow {
    cursor: pointer;
    transition: all 0.3s;
    margin-left: 1rem;
  }
}

.images {
  display: flex;
  gap: 1rem;
  max-width: 10rem;
  margin-top: 2rem;
}

.image {
  width: 10rem;
  cursor: pointer;
}

.rotate {
  transform: rotate(-180deg);
}

.btn {
  padding: 0.625rem;
  margin-top: 0.5rem;
  cursor: pointer;
  background-color: #fff;
  color: #000;
  border-radius: 0.5rem;
  border: 1px solid #000;
  transition: all 0.3s;

  &:hover {
    background-color: rgba(94, 183, 255, 0.9);
    color: #fff;
    border: none;
  }
}

.likes {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.like {
  align-items: flex-end;
  width: 2rem;
  cursor: pointer;
}
</style>
