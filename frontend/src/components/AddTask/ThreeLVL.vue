<script>
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
      score: 5,
      taskName: '',
      taskDescription: '',
    };
  },

  methods: {
    clearForm() {
      console.log('Форма очищена');
    },
    handler() {
      alert('Задание успешно загружено');
      console.log(
        this.taskName,
        this.taskDescription,
        '||',
        this.selectedClass,
        this.selectedItems,
      );
      this.taskName = this.taskDescription = '';
    },
  },
};
</script>

<template>
  <form @submit.prevent="handler">
    <div class="shablonZadaniaThree">
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
        <div class="block">
          <p>Дополнительные материалы:</p>
          <input type="file" id="fileInput" />
        </div>
      </div>
      <div class="btn-send">
        <button class="btn" type="submit">Отправить задание на проверку эксперту!</button>
        <button class="btn-reset" @click="clearForm" type="reset">Удалить все!</button>
      </div>
    </div>
  </form>
</template>

<style scoped lang="scss">
.block,
.shablonZadaniaThree {
  margin: 15px 0;
}

.name__task {
  padding: 0.5rem;
  margin-top: 10px;
  border-radius: 0.5rem;
  outline: none;
  border: none;
}

#textAreaUsl {
  width: 100%;
  margin-top: 1rem;
  font-size: 1.5rem;
  resize: none;
  height: 8rem;
  outline: none;
  font-size: 1.2rem;
  border-radius: 1rem;
  padding: 0.625rem;
}
.btn-send {
  width: 100%;
  padding: 15px;
  display: flex;
  justify-content: space-between;
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
