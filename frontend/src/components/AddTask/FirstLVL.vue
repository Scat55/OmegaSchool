<script>
import axios from "axios";

export default {
  data() {
    return {
      checkboxes: [
        {text: '', checked: false},
        {text: '', checked: false}
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
      newFile: ''
    };
  },
  methods: {
    addCheckbox() {
      this.checkboxes.push({text: '', checked: false});
    },
    toggleWindow() {
      this.isWindowOpen = !this.isWindowOpen;
    },
    removeCheckbox(index) {
      this.checkboxes.splice(index, 1)
    },
    // Обработка форма и отправка данных с нее
    sendTest() {
      // console.log(this.nameTask, this.descriptionTask, this.checkboxes,  this.file)

      const formData = new FormData()
      const data = {
        task_test: this.nameTask,
        task_description: this.descriptionTask,
        questions: this.checkboxes,
      }
      const files = this.file;
      this.token = JSON.parse(localStorage.getItem('local'))
      formData.append('data', data)
      formData.append('files', files)


      console.log(this.file)
      axios.post('/api/uploads_file/',
          data,
          {
            headers: {
              'Authorization': `Bearer ${this.token.token}`,
              'Content-Type': 'application/json'
            }
          })
    },

    // sendTest(event) {
    //   const formData = new FormData();
    //   const file = this.$refs.fileInput.files[0]
    //   const data = {
    //     task_test: this.nameTask,
    //     task_description: this.descriptionTask,
    //     questions: this.checkboxes,
    //   };
    //
    //   formData.append('data', JSON.stringify(data)); // Конвертировать объект данных в строку JSON
    //
    //   if (Array.isArray(this.file)) {
    //     file.forEach((file, index) => {
    //       formData.append(`files[${index}]`, file);
    //     });
    //   } else {
    //     formData.append('files', file);
    //   }
    //
    //   this.token = JSON.parse(localStorage.getItem('local'));
    //
    //   axios.post('/api/uploads_file/', formData, {
    //     headers: {
    //       'Authorization': `Bearer ${this.token.token}` ,
    //       'Content-Type': 'multipart/form-data' // Исправленный Content-Type
    //     }
    //   }).then(response => {
    //     console.log(response.data);
    //   }).catch(error => {
    //     console.error("Error uploading files:", error);
    //   });
    // },

    deleteCheckBox() {
      this.checkboxes = [
        {text: '', checked: false},
        {text: '', checked: false}
      ]
      this.selectedFiles = []
    },
    // Для загрузки файлов
    handleFileChange(event) {
      // При изменении выбранных файлов обновляем список имен файлов
      const fileInput = this.$refs.fileInput;
      const files = fileInput.files;
      const fileNames = [];

      for (let i = 0; i < files.length; i++) {
        fileNames.push(files[i].name);
      }

      this.selectedFiles = fileNames;
      // this.file = event.target.files[0]
      // console.log(this.file)
      // this.file = this.$refs.fileInput.files[0]
      // this.file = this.$refs.fileInput.files
      // const allFile = Object.values(this.file)
      // for (let i = 0; i < allFile.length; i++){
      //   this.newFile = allFile[i]
      // }
    },
    removeFile(index) {
      // Удаляем файл из списка выбранных файлов по индексу
      this.selectedFiles.splice(index, 1);
    },

  },
  computed: {
    // Для загрузки файлов
    buttonText() {
      return this.selectedFiles.length > 0 ? `Выбрано файлов ${this.selectedFiles.length}` : 'Выберите файлы';
    },
  }
};

</script>

<template>
  <form @submit.prevent="sendTest()">
    <div class="shablonZadaniaFirst">
      <div class="shablonZadaniaFirst__name_task">
        <h3>Название задания:</h3>
        <input type="text" placeholder="Введите название задания" v-model="nameTask">
      </div>
      <div class="shablonZadaniaFirst__description_task">
        <p>Описании задачи / Условие</p>
        <textarea v-model="descriptionTask"></textarea>
      </div>
      <div class="shablonZadaniaFirst__addFile">
        <p class="shablonZadaniaFirst__addFile">Дополнительные материалы</p>
        <!--     Загрузка файлов мб удалю нахер   -->
        <div>
          <label for="fileInput" class="custom-file-upload">
            <span>{{ buttonText }}</span>
            <input type="file" id="fileInput" ref="fileInput" multiple @change="handleFileChange"
                   accept="application/pdf ,.docx">
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
        <div class="shablonZadaniaFirst__window">
          <button @click="toggleWindow" type="button">
            {{ isWindowOpen === false ? 'Показать инструкцию' : 'Скрыть инструкцию' }}
          </button>
          <div v-if="isWindowOpen">
            <p>Тут будет инструкци как использовать чекбоксы. Нажать на кнопку "добавить чекбокс" добавит один чекбокс в
              инпут надо будет ввести значение. Те которые правильные варианты ответа нужно будет ответить нажам на
              чекбокс</p>
          </div>
        </div>
        <!--  Вот здесь начинается блок с checkbox    -->
        <div class="shablonZadaniaFirst__option_answers">
          <button @click="addCheckbox" type="button" v-if="checkboxes.length !== 6">Добавить чекбокс</button>
          <div v-for="(checkbox, index) in checkboxes" :key="index">
            <div class="shablonZadaniaFirst__checkbox_item">
              <label>{{ index + 1 }})&nbsp;</label>
              <input class="shablonZadaniaFirst__checkbox_item_check" type="checkbox" v-model="checkbox.checked"
                     :id="'checkbox-' + index"/>
              <input class="shablonZadaniaFirst__checkbox_item_input" type="text" v-model="checkbox.text"/>
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

    & > input {
      margin: 10px 0;
      width: 100%;
      height: 25px;
      border-radius: 1rem;
      border: none;
      padding: 8px;
      outline: none
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
      outline: none
    }
  }

  &__addFile {
    margin: 0 0 15px 0;

    & > p {
      margin: 0 0 10px 0;
      text-align: center;
    }

    & > input {

    }

  }

  &__window {

    & > button {
      width: 100%;
      padding: 5px;
      margin-bottom: 10px;
      border-radius: 1rem;
      border: none
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
      border: none
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
        outline: none
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
  padding: 8px;
  border-radius: 1rem;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all .3s;

  &:hover {
    background-color: #00DFCC;
  }
}

.btn-reset {
  padding: 8px;
  border-radius: 1rem;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all .3s;

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

.custom-file-upload input[type="file"] {
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

</style>