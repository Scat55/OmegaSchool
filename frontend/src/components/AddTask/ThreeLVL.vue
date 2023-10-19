<script>
export default {
  date() {
    return {
      score: 5
    }
  },

  methods: {
    clearForm() {
      console.log('Форма очищена')
    }
  }
}
</script>

<template>
  <form @submit.prevent>
    <div class="shablonZadaniaThree">
      <div class="name_task">
        <h3>Название задания:</h3>
        <input type="text" placeholder="Введите название задания">
      </div>
      <div class="block">
        <p>Введите условие задания:</p>
        <textarea id="textAreaUsl"></textarea>
        <div class="block">
          <p>Дополнительные материалы:</p>
          <input type="file" id="fileInput">
        </div>
      </div>
      <div class="btn-send">
        <button class = "btn" type="submit">Отправить задание на проверку эксперту!</button>
        <button  class = "btn-reset" @click="clearForm" type="reset">Удалить все!</button>
      </div>
    </div>
  </form>
</template>

<style scoped lang="scss">
.block, .shablonZadaniaThree {
  margin: 15px 0;
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