<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    clearForm() {
      this.condition = ''

    }
  }
}
</script>

<template>
  <form @submit.prevent>
    <div class="shablonZadaniaTwo">
      <div class="name_task">
        <h3>Название задания:</h3>
        <input type="text" placeholder="Введите название задания">
      </div>
      <div class="block">
        <p>Введите условие задания:</p>
        <textarea id="textAreaUsl"></textarea>
        <div>
          <p>Дополнительные материалы:</p>
          <input type="file" id="fileInput">
        </div>
      </div>
      <div class="block">
        <p>Введите подсказку - <span id="warning">ВНИМАНИЕ! ЕСЛИ УЧЕНИК ИСПОЛЬЗУЕТ ПОДСКАЗКУ, ОН МОЖЕТ ПОЛУЧИТЬ МАКСИМУМ 2 БАЛЛА. В ТО ВРЕМЯ У ВАС ВО ВКЛАДКЕ "ЗАДАЧИ НА ПРОВЕРКУ ( ОТ УЧЕНИКОВ )" БУДЕТ ПОМЕЧЕНО ИСПОЛЬЗОВАЛ ЛИ УЧЕНИК ПОДСКАЗКУ."</span>
        </p>
        <textarea id="textAreaUsl"></textarea>
        <div>
          <p>Дополнительные материалы:</p>
          <input type="file" id="fileInput">
        </div>
      </div>
      <div class="block">
        <p>Ответ - <span id="warning">ВНИМАНИЕ! ЕСЛИ УЧЕНИК ИСПОЛЬЗУЕТ ОТВЕТ, ОН ПОЛУЧИТ 0 БАЛЛОВ. В ТО ВРЕМЯ У ВАС ВО ВКЛАДКЕ "ЗАДАЧИ НА ПРОВЕРКУ ( ОТ УЧЕНИКОВ )" БУДЕТ ПОМЕЧЕНО ИСПОЛЬЗОВАЛ ЛИ УЧЕНИК ОТВЕТ."</span>
        </p>
        <textarea id="answer"></textarea>
        <div>
          <p>Дополнительные материалы:</p>
          <input type="file" id="fileInput">
        </div>
      </div>
      <div class="btn-send">
        <button class = "btn"> Отправить задание на проверку эксперту!</button>
        <button class = "btn-reset" type="reset">Удалить все!</button>
      </div>
    </div>
  </form>
</template>

<style scoped lang="scss">
#textAreaUsl {
  width: 100%;
  font-size: 1.5rem;
  resize: none;
  height: 20rem;
}

#warning {
  color: white;
}

#answer {
  width: 100%;
  font-size: 1.5rem;
  resize: none;
  height: 10rem;
}

.btn-send {
  width: 100%;
  padding: 15px;
  display: flex;
  justify-content: space-between;
}

.block {
  padding: 10px;
  border: 3px solid black;
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
  transition: all .3s;

  &:hover {
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