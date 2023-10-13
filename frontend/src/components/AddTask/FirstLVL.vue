<script>
export default {
  data() {
    return {
      checkboxes: [
        { text: '', checked: false},
        { text: '', checked: false}
      ],
      // checkboxText: Array(2).fill(''),
      isWindowOpen: false,
    };
  },
  methods: {
    addCheckbox() {
      this.checkboxes.push({ text: '', checked: false});
    },
    toggleWindow() {
      this.isWindowOpen = !this.isWindowOpen;
    },
    removeCheckbox(index) {
      this.checkboxes.splice(index, 1)
    },
    sendTest() {
      console.log(this.checkboxes)
    },
    addTask(){
      alert('Заданме добавлено')
    },

    deleteCheckBox() {
      this.checkboxes = [
        { text: '', checked: false},
        { text: '', checked: false}
      ]
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
<!--  Вот здесь начинается блок с checkbox    -->
      <div class="shablonZadaniaFirst__option_answers">
        <button @click="addCheckbox" type="button" v-if="checkboxes.length !== 6">Добавить чекбокс</button>
        <div v-for="(checkbox, index) in checkboxes" :key="index">
          <div class="shablonZadaniaFirst__checkbox-item">
            <input type="checkbox" v-model="checkbox.checked" :id="'checkbox-' + index"/>
            <input type="text" v-model="checkbox.text"/>
            <button @click="removeCheckbox(index)" type="button">X</button>
          </div>
        </div>
      </div>
<!--   Конец. Наконец-то сделал адекватный вывод. Я бухать!   -->
      <div class="shablonZadaniaFirst__btn_send">
        <button  @click="sendTest" class = "btn" type="submit">Отправить задание на проверку эксперту!</button>
        <button  class = "btn-reset" type="reset" @click="deleteCheckBox">Удалить все!</button>
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