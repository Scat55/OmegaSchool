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
      taskName: '',
      taskDescription: '',
      taskAnswer: '',
      taskHelp: '',
      token: '',
      files: '',
      selectedFiles: [],
      taskId: '',
      files: '',
    };
  },
  methods: {
    // Для загрузки файлов
    handleFileChange() {
      // При изменении выбранных файлов обновляем список имен файлов
      const fileInputTwo = this.$refs.fileInputTwo;
      const files = fileInputTwo.files;
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
      this.$refs.fileInputTwo.files = newFileList.files; // Обновляем файлы в input
    },

    removeFile(index) {
      this.selectedFiles.splice(index, 1); // Удаляем имя файла из списка

      // Удаляем файл из списка файлов в input
      const remainingFiles = Array.from(this.$refs.fileInputTwo.files).filter(
        (_, fileIndex) => fileIndex !== index,
      );
      this.updateFileList(remainingFiles); // Обновляем файлы в input
    },
    clearForm() {
      this.condition = '';
    },
    async handler() {
      this.token = JSON.parse(localStorage.getItem('local'));
      const task_test = this.taskName;
      const task_description = this.taskDescription;
      const task_help = this.taskHelp;
      const task_answer = this.taskAnswer;
      this.files = this.$refs.fileInputTwo.files;

      let allFiles = Object.values(this.files).map((el) => {
        return el;
      });
      await axios
        .post(
          `/api/add_level_2/`,
          {
            task_test: task_test,
            task_description: task_description,
            task_hint: task_help,
            task_answer: task_answer,
            classes: this.selectedClass,
            subject: this.selectedItems,
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
          console.log(res.data.testId);
          this.taskId = res.data.testId;
        });

      let formData = new FormData();
      for (let i = 0; i < allFiles.length; i++) {
        formData.append('file', allFiles[i]);
      }
      await axios
        .post(`/api/add_file_level_2/${this.taskId}`, formData, {
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
        .then(() => {
          alert('Задание успешно загружено');
          this.taskName = this.taskDescription = this.taskHelp = this.taskAnswer = '';
          this.selectedFiles = '';
        });
    },
  },
  computed: {
    buttonText() {
      return this.selectedFiles.length > 0
        ? `Выбрано файлов ${this.selectedFiles.length}`
        : 'Выберите файлы';
    },
  },
};
</script>

<template>
  <form @submit.prevent="handler()">
    <div class="shablonZadaniaTwo">
      <div class="name_task">
        <h3>Название задания:</h3>
        <input
          type="text"
          placeholder="Введите название задания"
          class="name__task"
          v-model="taskName"
        />
      </div>
      <div class="block">
        <p>Введите условие задания:</p>
        <!--        <textarea id="textAreaUsl" v-model="taskDescription"></textarea>-->
        <div class="ObolochaQuilEd">
          <quill-editor
            v-model="taskDescription"
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

      <div class="add__file">
        <div>
          <label for="fileInputTwo" class="custom-file-upload">
            <span>{{ buttonText }}</span>
            <input
              type="file"
              id="fileInputTwo"
              ref="fileInputTwo"
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

      <div class="block">
        <p>
          Введите подсказку -
          <span id="warning"
            >Внимание! Если ученик использует подсказку, он может получить максимум 1 балл. в то
            время у вас во вкладке "задачи на проверку ( от учеников )" будет помечено использовал
            ли ученик подсказку."</span
          >
        </p>
        <!--        <textarea id="textAreaUsl" v-model="taskHelp"></textarea>-->
        <div class="ObolochaQuilEd">
          <quill-editor
            v-model="taskHelp"
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
      <div class="block">
        <p>
          Ответ -
          <span id="warning"
            >Внимание! Если ученик использует ответ, он получит 0 баллов. в то время у вас во
            вкладке "задачи на проверку ( от учеников )" будет помечено использовал ли ученик
            ответ."</span
          >
        </p>
        <!--        <textarea id="answer" v-model="taskAnswer"></textarea>-->
        <div class="ObolochaQuilEd">
          <quill-editor
            v-model="taskAnswer"
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
      <div class="btn-send">
        <button class="btn" type="submit">Отправить задание на проверку эксперту!</button>
        <button class="btn-reset" type="reset">Удалить все!</button>
      </div>
    </div>
  </form>
</template>

<style scoped lang="scss">
#textAreaUsl {
  width: 100%;
  resize: none;
  height: 8rem;
  outline: none;
  font-size: 1.2rem;
  border-radius: 1rem;
  padding: 0.625rem;
}

#warning {
  color: white;
  font-size: 0.7rem;
}

#answer {
  width: 100%;
  resize: none;
  height: 8rem;
  outline: none;
  font-size: 1.2rem;
  border-radius: 1rem;
  padding: 0.625rem;
}

.name__task {
  width: 100%;
  padding: 0.5rem;
  margin: 10px 0;
  border-radius: 0.5rem;
  outline: none;
  border: none;
}

.btn-send {
  width: 100%;
  padding: 15px;
  display: flex;
  justify-content: space-between;
}

.block {
  //padding: 10px;
  padding: 10px 0;
  border-radius: 1.5rem;
  margin: 10px 0;
}

.shablonZadaniaTwo p {
  margin: 15px 0 5px 0;
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

.add__file {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.custom-file-upload {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  margin-top: 1rem;
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
  margin: 0px 0;

  & > ul > li {
    list-style-type: none;
  }
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
