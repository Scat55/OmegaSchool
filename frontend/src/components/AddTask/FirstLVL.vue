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
    removeCheckbox(index) {
      this.checkboxes--;
      this.checkboxText.splice(index, 1);
    },
    sendTest() {
      console.log(this.checkboxText, this.checkboxes)
    },
    addTask(){
      alert('Заданме добавлено')
    }
  },
};

</script>

<template>
  <form @submit.prevent="addTask()">
    <div class="shablonZadaniaFirst">
      <div class="shablonZadaniaFirst__name_task">
        <h3>Название задания:</h3>
        <input type="text" placeholder="Введите название задания">
      </div>
      <div class="shablonZadaniaFirst__description_task">
        <p>Описании задачи / Условие</p>
        <textarea></textarea>
      </div>
      <div class="shablonZadaniaFirst__window">
        <button @click="toggleWindow" type="button">{{ isWindowOpen === false ? 'Показать инструкцию' : 'Скрыть инструкцию' }}</button>
        <div v-if="isWindowOpen">
          <p>Тут будет инструкци как использовать чекбоксы. Нажать на кнопку "добавить чекбокс" добавит один чекбокс в
            инпут надо будет ввести значение. Те которые правильные варианты ответа нужно будет ответить нажам на
            чекбокс</p>
        </div>
      </div>
      <div class="shablonZadaniaFirst__option_answers">
        <button @click="addCheckbox" type="button">Добавить чекбокс</button>
        <div v-for="index in checkboxes" :key="index">
          <div class="shablonZadaniaFirst__checkbox-item">
            <input type="checkbox" :id="'checkbox-' + (index)"/>
            <input type="text" v-model="checkboxText[index-1]"/>
            <button @click="removeCheckbox(index-1)" type="button">X</button>
            <!--          <label :for="'checkbox-' + index">Введите текст</label>-->
          </div>
        </div>
      </div>
      <div class="shablonZadaniaFirst__btn_send">
        <button  @click="sendTest" class = "btn" type="submit">Отправить задание на проверку эксперту!</button>
        <button  class = "btn-reset" type="reset">Удалить все!</button>
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

  &__checkbox-item {

  }


  &__btn_send {
    width: 100%;
    padding: 15px;
    display: flex;
    justify-content: space-between;
  }


}

.btn{
  padding: 8px;
  border-radius: 1rem;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all .3s;

  &:hover{
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
</style>