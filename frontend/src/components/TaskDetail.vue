<template>
  <div class="container">
    <router-link to="/task">
      <p class="back__tasks">Вернуться к списку заданий</p>
    </router-link>
    <div class="container__title">
      <h2>{{ task.title }}</h2>
    </div>
    <div class="container__infoTask">
      <div class="container__infoTask__id">
        <p>Номер задачи: {{ task.id }}</p>
      </div>
      <div class="container__infoTask__complexity">Уровень задания: {{ task.complexity }}</div>
      <div class="container__infoTask__topic">Предмет: {{ task.topic }}</div>
    </div>
    <div class="container__bodyTask"><span>Условие задания:</span> {{ task.bodyTask }}</div>

    <!--  Доп.материалы Start  -->
    <div class="addedFile" v-if="task.addedFile.length !== 0">
      <p class="files">Дополнительные материалы</p>
      <img
        @click="showFiles()"
        src="../assets/images/arrow.png"
        alt="Arrow"
        class="files__arrow"
        :class="{ rotate: isShow }"
      />
      <div v-for="file in task.addedFile" v-if="isShow">
        <a :href="file" :key="file">{{ getFileName(file) }}</a>
      </div>
    </div>
    <!--  END -->

    <!--  Блок только для 1 лвл заданий START  -->
    <div class="container_answer" v-if="task.complexity === '1'">
      <p>Варианты ответов. Выберите верный ответ(-ы):</p>
      <div v-for="(chP, index) in task.checkPoint" :key="index">
        <div class="itemAnswer">
          <input type="checkbox" :value="chP.text" v-model="userChecks[index]" /><label>{{
            chP.text
          }}</label>
        </div>
      </div>
    </div>
    <!--  END -->

    <div class="container_button">
      <button class="container_button-btn" @click="checkAnswer">Проверить</button>
      <button class="container_button-btn" @click="helpMe">Взять подсказку</button>
      <button class="container_button-btn" @click="showMeAnswer">Показать ответ</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userChecks: [],
      // chPt: this.task.checkPoint,
      isShow: false,
    };
  },
  methods: {
    initializeUserChecks() {
      this.userChecks = this.task.checkPoint.map(() => false);
    },
    getFileName(url) {
      return url.substring(url.lastIndexOf('/') + 1);
    },
    checkAnswer() {
      this.task.status = true;
      let isCorrect = true;
      for (let i = 0; i < this.task.checkPoint.length; i++) {
        if (this.userChecks[i] !== this.task.checkPoint[i].checked) {
          isCorrect = false;
          break;
        }
      }
      if (isCorrect) {
        alert('Верно! Вы получили 2 балла.');
      } else {
        alert('Неверно. Вы получили 0 баллов.');
      }
    },
    helpMe() {},
    showMeAnswer() {},
    showFiles() {
      this.isShow = !this.isShow;
    },
  },
  created() {
    this.initializeUserChecks();
  },

  // props: {
  //   task: {
  //     type: Object,
  //     required: true
  //   }
  // },
  computed: {
    task() {
      return this.$store.state.Temp.zadania.find((t) => t.id.toString() === this.$route.params.id);
    },
  },
};
</script>

<style scoped lang="scss">
@import '../assets/styles/vars.scss';

.container {
  margin-top: 80px;
  background: white;
  padding: 10px;
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

    &__id {
    }
  }

  &__bodyTask {
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
}

.addedFile {
  padding: 15px 0 10px 0;
  text-decoration: none;

  & > p {
    margin-bottom: 5px;
  }

  & > div > a {
    text-decoration: none;
    color: inherit;
    display: inline-block;
    padding: 5px 0;

    &:hover {
      text-decoration: underline;
    }
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

.back__tasks {
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
