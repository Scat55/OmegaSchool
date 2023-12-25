<script>
import axios from 'axios';
import { quillEditor } from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

export default {
  components: {
    quillEditor,
  },
  props: {
    selectedValue: {
      type: String,
      default() {
        return '';
      },
    },
    selectedClass: {
      type: String,
      default() {
        return '';
      },
    },
    selectedItems: {
      type: String,
      default() {
        return '';
      },
    },
  },
  data() {
    return {
      checkboxes: [
        { option_text: '', is_correct: false },
        { option_text: '', is_correct: false },
      ],
      // Для загрузки файлов
      selectedFiles: [],
      // checkboxText: Array(2).fill(''),
      isWindowOpen: false,
      nameTask: '',
      descriptionTask: '',
      class: '',
      level: '',
      topic: '',
      file: '',
      token: '',
      newFile: '',
      files: [],
      taskID: '',
    };
  },
  methods: {
    addCheckbox() {
      this.checkboxes.push({ option_text: '', is_correct: false });
    },
    toggleWindow() {
      this.isWindowOpen = !this.isWindowOpen;
    },
    removeCheckbox(index) {
      this.checkboxes.splice(index, 1);
    },
    // Обработка форма и отправка данных с нее
    async sendTest(event) {
      // console.log(this.nameTask, this.descriptionTask, this.checkboxes,  this.file)

      const task_test = this.nameTask;
      const task_description = this.descriptionTask;
      const questions = this.checkboxes;

      this.files = this.$refs.fileInput.files;

      let allFiles = Object.values(this.files).map((el) => {
        return el;
      });

      this.token = JSON.parse(localStorage.getItem('local'));
      await axios
        .post(
          `/api/add_level_1/`,
          {
            task_test: task_test,
            task_description: task_description,
            classes: this.selectedClass,
            subject: this.selectedItems,
            options: questions,
          },

          {
            headers: {
              Authorization: `Bearer ${this.token.token}`,
            },
          },
        )
        .catch((err) => {
          if (err.response) {
            alert('Ошибка');
          } else if (err.request) {
            // Запрос был сделан, но ответ не получен
            // `error.request`- это экземпляр XMLHttpRequest в браузере и экземпляр
            // http.ClientRequest в node.js
            console.log(err.request);
          }
        })
        .then((res) => {
          this.taskID = res.data.testId;
        });
      let formData = new FormData();
      for (let i = 0; i < allFiles.length; i++) {
        formData.append('file', allFiles[i]);
      }
      axios
        .post(`/api/add_file_level_1/${this.taskID}`, formData, {
          headers: {
            Authorization: `Bearer ${this.token.token}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .catch((err) => {
          alert('Ошибка');
          if (err.response) {
            alert(err);
          } else if (err.request) {
            // Запрос был сделан, но ответ не получен
            // `error.request`- это экземпляр XMLHttpRequest в браузере и экземпляр
            // http.ClientRequest в node.js
            console.log(err.request);
          }
        })
        .then((res) => {
          alert('Задание успешно загружено');
          this.nameTask = this.descriptionTask = this.class = '';
          this.selectedFiles = '';
          for (let i = 0; i < this.checkboxes.length; i++) {
            this.checkboxes[i].text = '';
            this.checkboxes[i].checked = false;
          }
        });
    },

    deleteCheckBox() {
      this.checkboxes = [
        { option_text: '', is_coorect: false },
        { option_text: '', is_coorect: false },
      ];
      this.selectedFiles = [];
    },
    // Для загрузки файлов
    handleFileChange() {
      // При изменении выбранных файлов обновляем список имен файлов
      const fileInput = this.$refs.fileInput;
      const files = fileInput.files;
      const fileNames = [];

      for (let i = 0; i < files.length; i++) {
        fileNames.push(files[i].name);
      }

      this.selectedFiles = fileNames;
      // console.log(event.target.files[0])
      // this.file = event.target.files[0]
      // console.log(this.file)
      // this.file = this.$refs.fileInput.files[0]
      // this.file = this.$refs.fileInput.files
      // const allFile = Object.values(this.file)
      // for (let i = 0; i < allFile.length; i++){
      //   this.newFile = allFile[i]
      // }
    },
    updateFileList(newFiles) {
      const newFileList = new DataTransfer(); // Создаем новый объект DataTransfer
      newFiles.forEach((file) => newFileList.items.add(file)); // Добавляем файлы
      this.$refs.fileInput.files = newFileList.files; // Обновляем файлы в input
    },

    removeFile(index) {
      this.selectedFiles.splice(index, 1); // Удаляем имя файла из списка

      // Удаляем файл из списка файлов в input
      const remainingFiles = Array.from(this.$refs.fileInput.files).filter(
        (_, fileIndex) => fileIndex !== index,
      );
      this.updateFileList(remainingFiles); // Обновляем файлы в input
    },
  },
  computed: {
    // Для загрузки файлов
    buttonText() {
      return this.selectedFiles.length > 0
        ? `Выбрано файлов ${this.selectedFiles.length}`
        : 'Выберите файлы';
    },
  },

  // mounted() {
  //   axios.get(`/api/download`, {
  //     headers: {
  //       'Authorization': `Bearer ${this.token.token}`,
  //     }
  //   }).then(response => {
  //     try {
  //       this.files = response.data.userFiles
  //     } catch (err){
  //       alert(err)
  //     }
  //   })
  // }
};
</script>

<template>
  <form @submit.prevent="sendTest()">
    <div class="shablonZadaniaFirst">
      <div class="shablonZadaniaFirst__name_task">
        <h3>Название задания:</h3>
        <input
          type="text"
          placeholder="Введите название задания"
          v-model="nameTask"
          class="name__task"
        />
      </div>
      <div class="shablonZadaniaFirst__description_task">
        <p>Описании задачи / Условие</p>
        <!--        <textarea v-model="descriptionTask"></textarea>-->
        <div class="ObolochaQuilEd">
          <quill-editor
            v-model="descriptionTask"
            class="QuilEd"
            :options="{
              placeholder: 'Введите ваш текст здесь...',
              modules: {
                toolbar: [
                  ['bold', 'italic', 'underline', 'strike'],
                  ['blockquote', 'code-block'],
                  [{ header: 1 }, { header: 2 }],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  [{ script: 'sub' }, { script: 'super' }],
                  [{ indent: '-1' }, { indent: '+1' }],
                  [{ direction: 'rtl' }],
                  [{ size: ['small', !1, 'large', 'huge'] }],
                  [{ header: [1, 2, 3, 4, 5, 6, !1] }],
                  [{ color: [] }, { background: [] }],
                  [{ font: [] }],
                  [{ align: [] }],
                  ['clean'],
                  ['link', 'video'],
                ],
              },
            }"
          />
        </div>
      </div>
      <div class="shablonZadaniaFirst__addFile">
        <p class="shablonZadaniaFirst__addFile">Дополнительные материалы</p>
        <!--     Загрузка файлов мб удалю нахер   -->
        <!--        TODO: Сделать выбор загруженных файлов-->
        <div class="add__file">
          <div>
            <label for="fileInput" class="custom-file-upload">
              <span>{{ buttonText }}</span>
              <input
                type="file"
                id="fileInput"
                ref="fileInput"
                multiple
                @change="handleFileChange"
                accept="application/pdf, .jpg,.jpeg,.png"
              />
            </label>
            <div class="list_task_file">
              <p v-show="selectedFiles.length !== 0">Выбранные файлы:</p>
              <ul>
                <li v-for="(fileName, index) in selectedFiles" :key="index">
                  <span>{{ index + 1 }}</span>
                  {{ fileName }}
                  <button @click.prevent="removeFile(index)" id="btn_del_file">X</button>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <!-- <select class="files">
              <option disabled selected>-- Прикрепите файл --</option>
              <option>Файл2</option>
              <option>Файл3</option>
              <option>Файл4</option>
              <option>Файл5</option>
            </select> -->
          </div>
        </div>
        <div class="shablonZadaniaFirst__window">
          <button @click="toggleWindow" type="button">
            {{ isWindowOpen === false ? 'Показать инструкцию' : 'Скрыть инструкцию' }}
          </button>
          <div v-if="isWindowOpen">
            <p>
              При нажатии на кнопку "добавить вариант" добавляется один вариант ответа. В поле надо
              будет ввести значение. Те варианты ответов, которые правильные, нужно будет отметить.
              <br /><br />
              <span style="color: red"> Максимальное число вариантов - 6</span>
            </p>
          </div>
        </div>
        <!--  Вот здесь начинается блок с checkbox    -->
        <div class="shablonZadaniaFirst__option_answers">
          <button @click="addCheckbox" type="button" v-if="checkboxes.length !== 6">
            Добавить чекбокс
          </button>
          <div v-for="(checkbox, index) in checkboxes" :key="index">
            <div class="shablonZadaniaFirst__checkbox_item">
              <label>{{ index + 1 }}&nbsp;</label>
              <input
                class="shablonZadaniaFirst__checkbox_item_check"
                type="checkbox"
                v-model="checkbox.is_correct"
                :id="'checkbox-' + index"
              />
              <input
                class="shablonZadaniaFirst__checkbox_item_input"
                type="text"
                v-model="checkbox.option_text"
              />
              <button @click="removeCheckbox(index)" type="button">X</button>
            </div>
          </div>
        </div>
        <!--   Конец. Наконец-то сделал адекватный вывод. Я бухать!   -->
        <div class="shablonZadaniaFirst__btn_send">
          <button class="btn" type="submit">Отправить задание на проверку эксперту!</button>
          <button class="btn-reset" type="reset" @click="deleteCheckBox">Сброс</button>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped lang="scss">
@import '../../assets/styles/vars';

.shablonZadaniaFirst {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;

  &__name_task {
    width: 100%;
    & > h3 {
      text-align: center;
    }

    input {
      font-size: 1.2rem;
    }
  }

  &__description_task {
    & > p {
      margin: 0 0 10px 0;
      text-align: center;
    }

    & > textarea {
      width: 100%;
      height: 200px;
      resize: none;
      margin-bottom: 10px;
      padding: 8px;
      border-radius: 1rem;
      outline: none;
      font-size: 1.2rem;
    }
  }

  &__addFile {
    margin: 0 0 15px 0;

    & > p {
      margin: 0 0 10px 0;
      text-align: center;
    }
  }

  &__window {
    & > button {
      width: 100%;
      padding: 5px;
      margin-bottom: 10px;
      border-radius: 1rem;
      border: none;
    }

    & > div {
      margin-bottom: 10px;
    }

    & > div > p {
      background: white;
      padding: 10px;
      border-radius: 1rem;
    }
  }

  &__option_answers {
    & > button {
      width: 100%;
      padding: 5px;
      margin-bottom: 10px;
      border-radius: 1rem;
      border: none;
    }
  }

  &__checkbox_item {
    margin: 10px 0;
    display: flex;
    align-items: center;

    &_check {
      margin-right: 3px;
    }

    &_input {
      border: none;
      margin-right: 3px;
      border-radius: 4px;
      width: 50%;
      padding: 3px;

      &:focus {
        border: none;
        outline: none;
      }
    }

    & > button {
      padding: 2px;
      background: #ff6e6e;
      color: white;
      border-radius: 4px;
      border: none;
    }
  }

  &__btn_send {
    width: 100%;
    padding: 15px;
    display: flex;
    justify-content: space-between;
  }
}

.btn {
  font-family: Visitor;
  padding: 8px;
  border-radius: 1rem;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #00dfcc;
  }
}

.btn-reset {
  font-family: Visitor;
  padding: 8px;
  border-radius: 1rem;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #ff6e6e;
  }
}

.custom-file-upload {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.custom-file-upload:hover {
  background-color: #0056b3;
}

.custom-file-upload input[type='file'] {
  display: none;
}

#btn_del_file {
  padding: 2px;
  background: #ff6e6e;
  color: white;
  border-radius: 4px;
  border: none;
}

.list_task_file {
  margin: 10px 0;

  & > ul > li {
    list-style-type: none;
  }
}

.add__file {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.files {
  font-family: Visitor;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  margin-bottom: 0.7rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #0056b3;
  }

  option {
    background-color: #fff;
    color: #000;
  }
}

.name__task {
  width: 100%;
  padding: 0.5rem;
  margin-top: 10px;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  outline: none;
  border: none;
}

.ObolochaQuilEd {
  margin: 20px 0;
}

.QuilEd {
  background: white;
  //border-radius: 1rem;
  //font-size: 1rem;
}
</style>
