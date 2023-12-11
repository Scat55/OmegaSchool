<template>
  <div class="container">
    <div class="infoTask">
      <div class="infoTask__titles">
        <div class="infoTask__name">{{ infoTask.test_text }}</div>
        <div class="infoTask__allInfo">
          <p>Класс - {{ infoTask.classes }}</p>
          <p>Предмет - {{ infoTask.subject }}</p>
        </div>
      </div>
      <textarea
        type="text"
        :value="infoTask.test_description"
        disabled="disabled"
        class="infoTask__descr"
      ></textarea>
      <div class="images" id="gallery" v-if="infoTask.add_img">
        <div v-for="img in images">
          <img :src="img" class="image" alt="Image" data-fancybox="gallery" />
        </div>
      </div>
      <div v-for="question in infoTask.questions" class="infoTask__options">
        <div v-for="option in question.options">{{ option.text }} - {{ option.is_correct }}</div>
      </div>
      <p class="infoTask__show" @click="isShowAnswer = !isShowAnswer" v-if="isShowAnswer">
        Показать подсказки
      </p>
      <div v-if="isShowAnswer">
        <div class="infoTask__answer" v-if="infoTask.task_hint || info.task_answer">
          <p>Подсказдка - {{ infoTask.task_hint }}</p>
          <p>Ответ - {{ infoTask.task_answer }}</p>
        </div>
      </div>
      <!--      <div class="questions">-->
      <!--        <div v-for="question in infoTask.questions">-->
      <!--          {{ question.text }} - <span v-if="question.is_correct === true">Верно</span>-->
      <!--          <span v-else>Не верно</span>-->
      <!--        </div>-->
      <!--      </div>-->

      <table>
        <tr>
          <th>Вариант ответа</th>
          <th>-</th>
          <th>Ключ</th>
        </tr>
        <tr v-for="question in infoTask.questions">
          <td>{{ question.text }}</td>
          <td>-</td>
          <td>{{ question.is_correct === true ? 'Верно' : 'Не верно' }}</td>
        </tr>
      </table>

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
        <button
          @click="downloadFiles()"
          class="infoTask__btn"
          v-if="infoTask.add_file !== null || infoTask.add_file !== ''"
        >
          Скачать
        </button>
        <p v-else>Файлов нет</p>
      </div>

      <div class="mesageExpert">
        <div class="firstExpert">
          <p>Оценка первого эксперта: {{ infoTask.ver_1 }}</p>
          <div class="flex__mess">
            <p>Сообщение:</p>
            <span>{{ infoTask.ver_1_masseg }}</span>
          </div>
        </div>
        <div class="secondExpert">
          <p>Оценка второго эксперта: {{ infoTask.ver_2 }}</p>
          <div class="flex__mess">
            <p>Сообщение:</p>
            <span>{{ infoTask.ver_2_masseg }}</span>
          </div>
        </div>
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
      addIMG: '',
      mass: '',
      images: [],
      image: '',
      teachrID: '',
    };
  },
  computed: {
    splitFiles() {
      return this.image.split(',');
    },
  },
  methods: {
    // Скачивание файла
    async downloadFiles() {
      //      const file = this.infoTask.add_file.split(',')
      //      const mass1 = [...this.mass, ...file]
      this.token = JSON.parse(localStorage.getItem('local'));
      await fetch(`/api/download_file/${this.infoTask.add_file}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.token.token}`,
          'Custom-UUID': this.userID,
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
        this.userID = response.data.user_id;
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

<style lang="scss" scoped>
.infoTask {
  margin-top: 1rem;
  background-color: #fff;
  padding: 1.25rem;
  border-radius: 1rem;
  border: 1px solid #000;
  //user-select: none;

  &__titles {
    display: flex;
    justify-content: space-between;
  }

  &__name {
    width: 70%;
    word-break: break-all;
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

.questions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.rotate {
  transform: rotate(-180deg);
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

.mesageExpert {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.flex__mess {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;

  & > span {
    line-height: 140%;
  }
}

.firstExpert {
  border: 1px solid #000;
  border-radius: 0.5rem;
  padding: 0.625rem;

  p {
    line-height: 140%;
  }
}

.secondExpert {
  border: 1px solid #000;
  border-radius: 0.5rem;
  padding: 0.625rem;

  p {
    line-height: 140%;
  }
}

// Таблица

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
  color: black;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:nth-child(odd) {
  background-color: #fff;
}

tr:hover {
  background-color: #ddd;
}

// Конец таблицы
</style>
