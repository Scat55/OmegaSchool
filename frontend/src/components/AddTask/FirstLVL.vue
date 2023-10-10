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
    <div class="btn-send">
      <button id="send">Отправить задание на проверку эксперту!</button>
      <button id="clear">Удалить все!</button>
    </div>
  </div>
</template>



<style scoped lang="scss">
.btn-send {
  width: 100%;
  padding: 15px;
  display: flex;
  justify-content: space-between;
}

#send {
  background: #00DFCC;
  border: 2px solid white;
  border-radius: 1rem;
  padding: 15px;
}

#send:hover, #clear:hover {
  font-size: 1.1rem;
}

#clear {
  background: indianred;
  border: 2px solid white;
  border-radius: 1rem;
  padding: 15px;
}
</style>