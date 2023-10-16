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
        <button id="send" type="submit">Отправить задание на проверку эксперту!</button>
        <button id="clear" @click="clearForm" type="reset">Удалить все!</button>
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