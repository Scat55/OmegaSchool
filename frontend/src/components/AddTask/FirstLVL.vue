<script>
export default {
  data() {
    return {
      checkboxes: 2,
      checkboxText: Array(2).fill(''), // Инициализируем массив пустыми строками
    };
  },
  methods: {
    addCheckbox() {
      this.checkboxes++;
      this.checkboxText.push(''); // Добавляем пустую строку при добавлении чекбокса
    },
  },
};

</script>

<template>
  <div class="shablonZadaniaFirst">
    <div class="name_task">
      <h3>Название задания:</h3>
      <input type="text" placeholder="Введите название задания">
    </div>
    <div class="description_task">
      <textarea></textarea>
    </div>
    <div class="option_answers">
      <div v-for="index in checkboxes" :key="index">
        <div class="checkbox-item">
          <input type="checkbox" :id="'checkbox-' + index" />
          <input type="text" v-model="checkboxText[index]" />
          <label :for="'checkbox-' + index">Введите текст</label>
        </div>
      </div>
      <button @click="addCheckbox">Добавить чекбокс</button>
    </div>
  </div>
</template>



<style scoped lang="scss">

</style>