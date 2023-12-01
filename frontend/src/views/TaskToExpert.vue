<template>
  <div class="container">
    <div class="task__info">
      <div class="task__main-info">
        <div class="task__main-info-text">
          <p class="task__main-info-title">{{ info.test_text }}</p>

          <div class="task__main-info-student">
            <p>Класс - {{ info.classes }}</p>
            <p>{{ info.subject }}</p>
          </div>
        </div>
      </div>
      <div>
        <textarea
          type="text"
          :value="info.test_description"
          disabled="disabled"
          class="task__main-info-descr"
        ></textarea>
      </div>
      <div
        class="images"
        id="gallery"
        v-if="info.add_img"
      >
        <div v-for="img in images">
          <img
            :src="img"
            class="image"
            alt="Image"
            data-fancybox="gallery"
          />
        </div>
      </div>
      <div
        v-for="question in info.questions"
        class="options"
      >
        <div>{{ question.text }} - <span v-if="question.is_correct">Верно</span> <span v-else>Не верно</span></div>
        <!-- <div v-for="option in question.options">{{ option.text }} - {{ option.is_correct }}</div> -->
      </div>
      <div
        class="answer"
        v-if="info.task_hint || info.task_answer"
      >
        <p>Подсказдка - {{ info.task_hint }}</p>
        <p>Ответ - {{ info.task_answer }}</p>
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
        <a
          v-if="this.info.add_file"
          class="downloadLink"
        ><button
            @click="downloadFiles()"
            class="btn"
          >Скачать</button></a>
        <p v-else>Файлов нет</p>
      </div>

      <div class="estimation">
        <p>Оцените задание (1-на доработку. 2-отлично):</p>
        <form
          class="estimation__form"
          @submit.prevent="handler()"
        >
          <label class="estimation__label">
            <input
              type="radio"
              value="1"
              name="2"
              id="1"
              v-model="valChek"
            />1</label>
          <label class="estimation__label">
            <input
              type="radio"
              value="2"
              name="2"
              id="2"
              v-model="valChek"
            />2</label>
          <textarea
            name="message"
            placeholder="Обратная связь по заданию"
            class="estimation__message"
            v-model="message"
            v-if="this.valChek === '1'"
          ></textarea>
          <button
            class="estimation__btn"
            type="submit"
          >Отправить</button>
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
  props: {
    options: Object,
  },
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
      userID: '',
      addIMG: '',
      files: [],
      image: '',
      images: []
    };
  },
  computed: {
    splitFiles() {
      return this.image.split(',')
    }
  },
  methods: {
    // Скачивание файла
    async downloadFiles() {
      this.token = JSON.parse(localStorage.getItem('local'));
      await fetch(`/api/download_file/${this.infoTask.add_file}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.token.token}`,
          'Custom-UUID': this.userID,
        },
      })
        .then(res => res.blob())
        .then(data => {
          let url = URL.createObjectURL(data) // Создаем ссылку

          let anchor = document.createElement('a')
          anchor.href = url;
          anchor.download = this.fileName
          document.body.append(anchor)
          anchor.style = "display:none"
          anchor.click()
          anchor.remove()
          URL.revokeObjectURL(url)
        })
    },
    // Появление файла
    changeStatus() {
      this.isShow = !this.isShow;
    },
    // Обработка формы
    handler() {
      this.token = JSON.parse(localStorage.getItem('local'));
      const profileID = JSON.parse(localStorage.getItem('local'));
      let ver = this.valChek;
      let ver_masseg = this.message;
      const test_id = this.id;
      if (ver === '2') {
        ver_masseg = '';
      }
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
            'Content-Type': 'application/json',
          },
        },
      );
      alert('Спасибо за оценку');
      ver_masseg = '';
      this.$router.push(`/profile/${profileID.userID}`);
    },
  },

  created() {
    // Получение информации о задаче по id
    this.token = JSON.parse(localStorage.getItem('local'));

  },

  mounted() {
    axios
      .get(`/api/getTasksForExpertbyID/${this.id}`, {
        headers: { Authorization: `Bearer ${this.token.token}` },
      })
      .then((response) => {
        console.log(response.data);
        this.info = response.data;
        this.addIMG = response.data.add_img;
        this.userID = response.data.user_id;
        this.teachrID = response.data.user_id;

        let nameImage = this.addIMG.split(',')

        for (let i = 0; i < nameImage.length; i++) {
          axios.get(`/api/download_image/${nameImage[i]}`, {
            headers: {
              Authorization: `Bearer ${this.token.token}`,
              'Custom-UUID': this.teachrID,
            },
          }).then(res => {
            this.image = `data:${res.data.contentType};base64,${res.data.data}`
            this.images.push(this.image)
          })
        }
      });

    Fancybox.bind(this.$refs.container, '[data-fancybox]', {
      ...(this.options || {}),
      groupAttr: false,
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
  width: 10rem;
  cursor: pointer;
}

.answer {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 1rem;
}

.images {
  display: flex;
  gap: 1rem;
  max-width: 10rem;
}

.btn {
  padding: .625rem;
  margin-top: 0.5rem;
  cursor: pointer;
  background-color: #fff;
  color: #000;
  border-radius: 0.5rem;
  border: 1px solid #000;
  transition: all .3s;

  &:hover {
    background-color: rgba(94, 183, 255, 0.9);
    color: #fff;
    border: none;
  }
}
</style>
