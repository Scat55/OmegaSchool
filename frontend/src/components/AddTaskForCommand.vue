<template>
  <div class="addTask">
    <h1>Создание заданий</h1>

    <div>
      <form class="addTask__form" @submit.prevent="handler">
        <input
          type="text"
          class="addTask__form-name"
          placeholder="Название теста"
          v-model="testName"
          required
        />

        <div class="time__turnir">
          <label for="begin_time">Время начала турнира:</label>
          <input type="datetime-local" name="begin_time" v-model="time_begin" required />
          <label name="end_time">Время окончания турнира:</label>
          <input type="datetime-local" name="end_time" v-model="time_end" required />
        </div>

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
                v-model="task.task_name"
                required
              />
              <button type="button" @click="removeTask(index)" class="bodyTask__remove">
                <img src="../assets/images/removeTask.png" alt="" class="bodyTask__img" />
              </button>
            </div>
            <textarea
              placeholder="Описание задачи"
              type="text"
              class="bodyTask__description"
              v-model="task.task_description"
              required
            />
            <label for="time">Время на решение</label>
            <input
              type="time"
              name="time"
              class="bodyTask__time"
              v-model="task.task_time"
              required
            />
          </div>
        </div>
        <button type="submit" class="submit" v-if="quantityField > 0">Загрузить тест</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'AddTaskForCommand',

  data() {
    return {
      testName: '',
      quantityField: 0,
      bodyTasks: [],
      time_begin: '',
      time_end: '',
    };
  },

  methods: {
    addTask() {
      this.bodyTasks.push({ task_name: '', task_description: '', task_time: '' });
      this.quantityField = this.bodyTasks.length;
    },
    removeTask(index) {
      this.bodyTasks.splice(index, 1);
      this.quantityField = this.bodyTasks.length;
    },
    handler() {
      const testName = this.testName;
      const bodyTasks = this.bodyTasks;
      const time_begin = this.time_begin;
      const time_end = this.time_end;

      axios.post(
        `/commands/createTest`,
        {
          test_name: testName,
          start_time: time_begin,
          end_time: time_end,
          tasks: bodyTasks,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(this.testName, this.bodyTasks);
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
  //max-height: 50rem;
  overflow: auto;

  &__form {
    margin-top: 1.25rem;

    &-name {
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

    .time__turnir {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
      gap: 1rem;
    }

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
  padding: 0.5rem;

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
  &__time {
    width: 100px;
    margin-top: 1rem;
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
