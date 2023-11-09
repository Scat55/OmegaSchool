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
        <span>Условие задания:</span> {{ infoTask.test_description }}
      </div>
      <img
        v-if="this.infoTask.add_img"
        :src="require('../../../newBack/uploads/' + infoTask.user_id + '/' + infoTask.add_img)"
        class="taskDetal__image"
        alt="Image"
        data-fancybox="gallery"
      />
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
          <a v-if="this.infoTask.add_file !== null" class="downloadLink"
            ><button @click="downloadFiles()">Скачать</button></a
          >
          <p v-else>Файлов нет</p>
        </div>
      </div>
      <!--  END -->

      <!-- Чекбоксы -->
      
      <div
        class="taskDetal__questions"
        v-for="options, index in this.infoTask.questions"
        v-if="infoTask.level == 1"
        :key="index"
      >

      <label>{{ index + 1 }}) {{ options.text }}</label>
      <input type="checkbox" :name="`question-${index}`" :value="options.text" v-model="userAnswers[index]" ref="checkAnswer" />
      
      <!-- Чекбоксы можно убрать если надо, пока используется для проверки -->
      - {{ options.is_correct }}

        <!-- <ul class="taskDetal__list">
          <li class="taskDetal__question" v-for="question in options.options">
            {{ question.text }} -
            <input type="checkbox" name="question.text" :value="question.text" ref="checkAnswer" />
          </li>
        </ul> -->
      </div>

      <!-- Решение начало -->
      <div class="taskDetal__answer" v-if="infoTask.level == 2 || infoTask.level == 3">
        <textarea
          class="taskDetal__infoAnswer"
          placeholder="Введите ваш ответ"
          v-model="infoArea"
        ></textarea>
        <input type="file" class="taskDetal__file" ref="file" multiple />
      </div>
      <!-- Решение конец -->

      <!-- Подсказка начало -->
      <div class="taskDetal__hitn" v-if="hint">
        <p>{{ this.hint }}</p>
      </div>
      <!-- Подсказка конец -->

      <!-- Ответ начало -->

      <div class="taskDetal__answer" v-if="answer">
        <p>{{ this.answer }}</p>
      </div>
      <!-- Ответ конец -->

      <!-- Кнопки  начало -->
      <div class="taskDetal__buttons" v-if="infoTask.level == 2">
        <button class="taskDetal__btn" @click="sendLevelTwoTest">Отправить</button>
        <button class="taskDetal__btn" @click="showHint">Взять подсказку</button>
        <button class="taskDetal__btn" @click="showAnswer">Показать ответ</button>
      </div>
      <button class="taskDetal__button" v-if="infoTask.level == 1" @click="sendLevelOneTest">Отправить</button>

      <div class="taskDetal__buttons" v-if="infoTask.level == 3">
        <button class="taskDetal__btn" @click="sendLevelThreeTest">Отправить</button>
        <button class="taskDetal__btn" @click="showHint">Взять подсказку</button>
        <button class="taskDetal__btn" @click="showAnswer">Показать ответ</button>
      </div>
      <!-- Кнопки конец -->

      <!--  Блок только для 1 лвл заданий START  -->
      <!-- <div
      class="container_answer"
      v-if="task.complexity === '1'"
    >
      <p>Варианты ответов. Выберите верный ответ(-ы):</p>
      <div
        v-for="(chP, index) in task.checkPoint"
        :key="index"
      >
        <div class="itemAnswer">
          <input
            type="checkbox"
            :value="chP.text"
            v-model="userChecks[index]"
          /><label>{{
            chP.text
          }}</label>
        </div>
      </div>
    </div> -->
      <!--  END -->

      <!-- <div class="container_button">
      <button
        class="container_button-btn"
        @click="checkAnswer"
      >Проверить</button>
      <button
        class="container_button-btn"
        @click="helpMe"
      >Взять подсказку</button>
      <button
        class="container_button-btn"
        @click="showMeAnswer"
      >Показать ответ</button>
    </div> -->
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
      userChecks: [],
      // chPt: this.task.checkPoint,
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
    };
  },
  // computed: {
  //   task() {
  //     return this.infoTask = this.id;
  //   },
  // },
  methods: {
    initializeUserAnswers() {
      this.userAnswers = this.infoTask.questions.map(() => false);
  },
    test() {
      console.log(this.infoArea);
    },
    sendLevelOneTest() {
// const comparisonResult = this.infoTask.questions.map((question, index) => {
    //   return question.is_correct === this.userAnswers[index];
    // });
    // const comparisonResult2 = this.infoTask.questions.map((question, index) => {
    //   return question.is_correct;
    // });

    const results = this.userAnswers.map((answer, index) => {
      return answer === this.infoTask.questions[index].is_correct;
    });

    const allCorrect = results.every(isCorrect => isCorrect);

    console.log(allCorrect);
    if (allCorrect) {
      alert('Верно! Вы получили 1 балл.');
    } else {
      alert('Неверно. Вы получили 0 баллов.');
    }

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
      await axios
        .get(`/api/download/${this.infoTask.add_file}`, {
          responseType: 'blob',
          headers: {
            Authorization: `Bearer ${this.token.token}`,
            'Custom-UUID': this.teachrID,
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
    this.initializeUserAnswers();
  },

  mounted() {
    this.token = JSON.parse(localStorage.getItem('local'));
    axios
      .get(`/api/getTasksForStudent/${this.id}`, {
        headers: {
          Authorization: `Bearer ${this.token.token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response.data);
        this.infoTask = response.data;
        this.teachrID = response.data.user_id;
        this.testID = response.data.test_id;
      });

    Fancybox.bind(this.$refs.container, '[data-fancybox]', {
      ...(this.options || {}),
    });
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
  padding: 0.625rem 0.625rem 1rem 1rem;
  border-radius: 1rem;
  border: 2px solid #487fb8;

  &__title {
    text-align: center;
  }

  &__infoTask {
    display: flex;
    justify-content: space-around;
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
    margin-top: 1rem;
  }

  &__infoAnswer {
    padding: 0.625rem;
    resize: none;
    border-radius: 1rem;
    width: 27rem;
    height: 10rem;
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

.rotate {
  transform: rotate(-180deg);
}
</style>
