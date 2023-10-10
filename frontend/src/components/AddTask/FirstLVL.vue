<script>
export default {
  data() {
    return {
      checkboxes: 2,
      checkboxText: Array(2).fill(''), // Инициализируем массив пустыми строками
      isWindowOpen: false,
    };
  },
  methods: {
    addCheckbox() {
      this.checkboxes++;
      this.checkboxText.push(''); // Добавляем пустую строку при добавлении чекбокса
    },
    toggleWindow() {
      this.isWindowOpen = !this.isWindowOpen;
    },
  },
};

</script>

<template>
  <div class="shablonZadaniaFirst">
    <div class="shablonZadaniaFirst__name_task">
      <h3>Название задания:</h3>
      <input type="text" placeholder="Введите название задания">
    </div>
    <div class="shablonZadaniaFirst__description_task">
      <p>Описании задачи / Условие</p>
      <textarea></textarea>
    </div>
    <div>
      <button @click="toggleWindow">{{ isWindowOpen === false ? 'Показать инструкцию' : 'Скрыть инструкцию' }}</button>
      <div class="shablonZadaniaFirst__window" v-if="isWindowOpen">
        <p>Тут будет инструкци как использовать чекбоксы. Нажать на кнопку "добавить чекбокс" добавит один чекбокс в
          инпут надо будет ввести значение. Те которые правильные варианты ответа нужно будет ответить нажам на
          чекбокс</p>
      </div>
    </div>
    <div class="shablonZadaniaFirst__option_answers">
      <div v-for="index in checkboxes" :key="index">
        <div class="shablonZadaniaFirst__checkbox-item">
          <input type="checkbox" :id="'checkbox-' + index"/>
          <input type="text" v-model="checkboxText[index]"/>
          <label :for="'checkbox-' + index">Введите текст</label>
        </div>
      </div>
      <button @click="addCheckbox">Добавить чекбокс</button>
    </div>
    <div class="shablonZadaniaFirst__btn_send">
      <button id="send">Отправить задание на проверку эксперту!</button>
      <button id="clear">Удалить все!</button>
    </div>
  </div>
</template>


<style scoped lang="scss">

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
    }
  }

  &__window {

    & > button {
     width: 100%;
    }

  }


  &__btn_send {
    width: 100%;
    padding: 15px;
    display: flex;
    justify-content: space-between;
  }


}


#send {
  background: #00DFCC;
  border: 2px solid white;
  border-radius: 1rem;
  padding: 15px;
  order: 1;
}

#send:hover, #clear:hover {
  font-size: 1.1rem;
}

#clear {
  order: 0;
  background: indianred;
  border: 2px solid white;
  border-radius: 1rem;
  padding: 15px;
}
</style>