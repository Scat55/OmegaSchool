<template>
  <div class="container">
    <div class="container__title">
      <h2>{{ task.title }}</h2>
    </div>
    <div class="container__infoTask">
      <div class="container__infoTask__id">
        <p>Номер задачи: {{ task.id }}</p>
      </div>
      <div class="container__infoTask__complexity">
        Уровень задания: {{ task.complexity }}
      </div>
      <div class="container__infoTask__topic">
        Предмет: {{ task.topic }}
      </div>
    </div>
    <div class="container__bodyTask">
      <span>Условие задания:</span> {{ task.bodyTask }}
    </div>



    <!--  Доп.материалы Start  -->
    <div class="addedFile" v-if="task.addedFile.length !== 0">
      <p>Дополнительные материалы:</p>
      <div v-for="file in task.addedFile">
        <a :href="file" :key="file">{{ getFileName(file) }}</a>
      </div>
    </div>
    <!--  END -->

    <!--  Блок только для 1 лвл заданий START  -->
    <div class="container_answer" v-if="task.complexity === '1'">
      <p>Варианты ответов. Выберите верный ответ(-ы):</p>
      <div v-for="(chP, index) in task.checkPoint"
           :key="index"
      >
        <div class="itemAnswer">
          <input type="checkbox" :value="chP.text" v-model="userChecks[index]"><label>{{ chP.text }}</label>
        </div>
      </div>
    </div>
    <!--  END -->

    <div class="container_button">
      <button @click="checkAnswer">Проверить</button>
      <button @click="helpMe">Взять подсказку</button>
      <button @click="showMeAnswer">Показать ответ</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userChecks: []
      // chPt: this.task.checkPoint
    }
  },
  methods: {
    initializeUserChecks() {
      this.userChecks = this.task.checkPoint.map(() => false);
    },
    getFileName(url) {
      return url.substring(url.lastIndexOf('/') + 1);
    },
    checkAnswer() {
      this.task.status = true
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
    helpMe(){},
    showMeAnswer(){},
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
      return this.$store.state.Temp.zadania.find(t => t.id.toString() === this.$route.params.id)
    }
  }
}
</script>

<style scoped lang="scss">
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

    & > span {
      font-weight: bold;
    }

  }

}

.addedFile {
  padding: 15px 0 10px 0;
  text-decoration: none;

  &>p {
    margin-bottom: 5px;
  }

  &>div>a {
    text-decoration: none;
    color: inherit;
    display: block;
    padding: 5px 0;

    &:hover {
      text-decoration: underline;
    }
  }
}

.container_answer {
  padding: 5px 0 15px 0;
}

.itemAnswer {
  margin: 8px 0;
  display: flex;
  align-items: center;

  &>input {
    margin-right: 5px;
  }
}
</style>