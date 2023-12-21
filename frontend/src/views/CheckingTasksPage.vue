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
      <div class="images" id="gallery">
        <div v-if="infoTask.add_img" v-for="img in splitFiles">
          <img
            :src="require('../../../newBack/uploads/' + infoTask.user_id + '/' + img)"
            class="image"
            alt="Image"
            data-fancybox="gallery"
          />
        </div>
      </div>

      <!-- <div class="answer" v-if="info.task_hint || info.task_answer">
        <p>
          Смотрел подсказку- <span>{{ info.check_answer }}</span>
        </p>
        <p>
          Смотрел ответ - <span>{{ info.check_hint }}</span>
        </p>
      </div> -->
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
        <a v-if="this.info.add_file_by_student" class="downloadLink"
          ><button @click="downloadFiles()" class="btn">Скачать</button></a
        >
        <p v-else>Файлов нет</p>
      </div>

      <details class="intrukcia">
        <summary>Инструкция оценивания задания</summary>
        <p>
          1. Первое задание оценивается от 0 до 1 балла. <br />
          &nbsp;- 0 баллов ставится, если задание не выполнено или выполнено неверно. <br />
          &nbsp;- 1 балл ставится, если задание выполнено верно и полностью. <br />
          <br />
          2. Второе задание оценивается от 0 до 2 баллов. <br />
          &nbsp;- 1 балл ставится за частично правильное выполнение задания. <br />
          &nbsp;- 2 балла ставится за полностью верное выполнение задания.<br />
          <br />
          3. Третье задание оценивается от 0 до 3 баллов. <br />
          &nbsp;- 0 баллов ставится, если задание не выполнено. <br />
          &nbsp;- 1 балл ставится за выполнение первой части задания. <br />
          &nbsp;- 2 балла ставится за выполнение первой и второй частей задания. <br />
          &nbsp;- 3 балла ставится за полностью правильное выполнение всех частей задания. <br />
          <br />
          4. Максимальный балл за все 3 задания - 6. При оценке каждого задания необходимо четко
          следовать приведенным выше критериям.<br />
          Общий балл вычисляется как сумма баллов, выставленных за каждое задание.<br />
        </p>
      </details>

      <div class="estimation">
        <p>Оцените задание:</p>
        <form class="estimation__form" @submit.prevent="handler()">
          <div class="block_ocenka">
            <div>
              <p>Задание 1:</p>
              <label class="estimation__label">
                <input type="radio" value="0" name="task1" id="0" v-model="firstCheck" />0</label
              >
              <label class="estimation__label">
                <input type="radio" value="1" name="task1" id="1" v-model="firstCheck" />1</label
              >
            </div>
            <div>
              <p>Задание 2:</p>
              <label class="estimation__label">
                <input type="radio" value="0" name="task2" id="0" v-model="secondCheck" />0</label
              >
              <label class="estimation__label">
                <input type="radio" value="1" name="task2" id="1" v-model="secondCheck" />1</label
              >
              <label class="estimation__label">
                <input type="radio" value="2" name="task2" id="2" v-model="secondCheck" />2</label
              >
            </div>
            <div>
              <p>Задание 3:</p>
              <label class="estimation__label">
                <input type="radio" value="0" name="task3" id="0" v-model="threeCheck" />0</label
              >
              <label class="estimation__label">
                <input type="radio" value="1" name="task3" id="1" v-model="threeCheck" />1</label
              >
              <label class="estimation__label">
                <input type="radio" value="2" name="task3" id="2" v-model="threeCheck" />2</label
              >
              <label class="estimation__label">
                <input type="radio" value="3" name="task3" id="3" v-model="threeCheck" />3</label
              >
            </div>
          </div>

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
      firstCheck: '',
      secondCheck: '',
      threeCheck: '',
      message: '',
      fileName: '',
      url: '',
      blob: '',
      file: '',
      addIMG: '',
    };
  },

  methods: {
    // Скачивание файла
    async downloadFiles() {
      console.log(this.info);
      this.token = JSON.parse(localStorage.getItem('local'));
      await fetch(`/api/download_file/${this.info.add_file_by_student}`, {
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
    // Появление файла
    changeStatus() {
      this.isShow = !this.isShow;
    },
    // Обработка формы
    handler() {
      const opt_score =
        parseInt(this.firstCheck) + parseInt(this.secondCheck) + parseInt(this.threeCheck);
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
      alert('Спасибо за оценку');
      this.$router.push(`/profile/${this.token.userID}`);
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
        this.addIMG = response.data.add_img;

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

.block_ocenka {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & > div {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
}

.intrukcia {
  cursor: pointer;

  & > p {
    padding: 15px 0 15px 15px;
  }
}
</style>
