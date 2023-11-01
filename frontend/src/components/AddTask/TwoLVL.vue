<script>
import axios from 'axios';
export default {
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
    };
  },
  methods: {
    clearForm() {
      this.condition = '';
    },
    handler() {
      this.token = JSON.parse(localStorage.getItem('local'));
      const task_test = encodeURIComponent(this.taskName);
      const task_description = encodeURIComponent(this.taskDescription);
      const task_help = encodeURIComponent(this.taskHelp);
      const task_answer = encodeURIComponent(this.taskAnswer);

      this.files = this.$refs.fileInput.files;
      let allFiles = Object.values(this.files).map((el) => {
        return el;
      });
      axios.post(
        `/api/add_level_2/${task_test}/${task_description}/${task_help}/${task_answer}/${this.selectedClass}/${this.selectedItems}`,
        allFiles,
        {
          headers: {
            Authorization: `Bearer ${this.token.token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      alert('Задание успешно загружено');
      console.log(
        this.taskName,
        this.taskDescription,
        this.taskHelp,
        this.taskAnswer,
        '||',
        this.selectedClass,
        this.selectedItems,
        '||',
        allFiles,
      );
      this.taskName = this.taskDescription = this.taskHelp = this.taskAnswer = '';
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
        <textarea id="textAreaUsl" v-model="taskDescription"></textarea>
        <div>
          <p>Дополнительные материалы:</p>
          <input type="file" id="fileInput" ref="fileInput" />
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
        <textarea id="textAreaUsl" v-model="taskHelp"></textarea>
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
        <textarea id="answer" v-model="taskAnswer"></textarea>
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
  font-size: 1.5rem;
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
  font-size: 1.5rem;
  resize: none;
  height: 8rem;
  outline: none;
  font-size: 1.2rem;
  border-radius: 1rem;
  padding: 0.625rem;
}
.name__task {
  padding: 0.5rem;
  margin-top: 10px;
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
  padding: 10px;
  border-radius: 1.5rem;
  margin: 10px 0;
}

.shablonZadaniaTwo p {
  margin: 15px 0 5px 0;
}

.btn {
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
</style>
