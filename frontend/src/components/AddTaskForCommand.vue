<template>
  <div class="addTask">
    <h1>Добавление заданий</h1>

    <div>
      <form class="addTask__form">
        <label for="quantity">Ведите количество тестовых заданий</label>
        <input
          class="addTask__form-quantity"
          type="number"
          name="quantity"
          v-model="quantityField"
        />
      </form>

      <div class="test" v-for="quantity in +quantityField">
        <div v-for="task in discriptionTask" class="test2">
          <input placeholder="Название задачи" type="text" v-model="task.name" />
          <textarea placeholder="Описание задачи" type="text" v-model="task.descr" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AddTaskForCommand',
  data() {
    return {
      quantityField: 0,
      discriptionTask: [
        {
          name: '',
          descr: '',
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.addTask {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-top: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  &__form {
    margin-top: 1.25rem;
  }
}
.test {
  background: green;
  margin-top: 1rem;
}
.test2 {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
