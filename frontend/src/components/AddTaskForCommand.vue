<template>
  <div class="addTask">
    <h1>Создание заданий</h1>

    <div>
      <form class="addTask__form" @submit.prevent="handler">
        <label for="quantity">Добавьте нужное количество заданий</label>
        <span class="addTask__form-quantity">{{ quantityField }}</span>
        <button type="button" class="addTask__form-btn" @click="addTask">
          <img src="../assets/images/addTask.png" alt="AddTask" class="addTask__form-img" />
        </button>

        <div class="wrapper" v-for="(task, index) in bodyTasks" :key="index">
          <div class="bodyTask">
            <div class="bodyTask__head">
              <input
                placeholder="Название задачи"
                type="text"
                class="bodyTask__name"
                v-model="task.name"
              />
              <button type="button" @click="removeTask(index)" class="bodyTask__remove">
                <img src="../assets/images/removeTask.png" alt="" class="bodyTask__img" />
              </button>
            </div>
            <textarea
              placeholder="Описание задачи"
              type="text"
              class="bodyTask__description"
              v-model="task.description"
            />
          </div>
        </div>
        <button type="submit" class="submit" v-if="quantityField > 0">Загрузить тест</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddTaskForCommand',

  data() {
    return {
      quantityField: 0,
      bodyTasks: [],
    };
  },

  methods: {
    addTask() {
      this.bodyTasks.push({ name: '', description: '' });
      this.quantityField = this.bodyTasks.length;
    },
    removeTask(index) {
      this.bodyTasks.splice(index, 1);
      this.quantityField = this.bodyTasks.length;
    },
    handler() {
      console.log(this.bodyTasks);
    },
  },
};
</script>

<style scoped lang="scss">
.addTask {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-height: 50rem;
  overflow: auto;

  &__form {
    margin-top: 1.25rem;

    &-quantity {
      border: 1px solid #000;
      border-radius: 0.5rem;
      padding: 0.5rem;
      margin-left: 1rem;
      margin-right: 1rem;
    }

    &-btn {
      background-color: transparent;
      border: none;
      cursor: pointer;
    }

    &-img {
      width: 20px;
      height: 20px;
    }
  }
}

.bodyTask {
  display: flex;
  flex-direction: column;
  border: 1px solid #000;
  border-radius: 0.5rem;
  margin-top: 1rem;

  &__head {
    display: flex;
  }
  &__remove {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  &__img {
    width: 30px;
    height: 30px;
  }
  &__name {
    font-family: 'Visitor';
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    width: 100%;

    &:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
  }
  &__description {
    font-family: 'Visitor';
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    width: 100%;
    height: 12.5rem;
    resize: none;

    &:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
  }
}
.submit {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 1rem;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
}
</style>
