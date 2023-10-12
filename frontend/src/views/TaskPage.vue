<template>
  <div>
    <div class="main">

      <div class="window">

        <div class="div1">
          <div>Задания</div>
          <div>Слева вы сможете выбрать фильтры для заданий. <br> По каким предметам, сложность и тд.</div>
        </div>

        <div class="div2">
          <div>
            <div class="complexity">
              <p>Уровень сложности заданий:</p>
              <input
                  type="checkbox"
                  id="checkbox1"
                  name="checkboxGroup"
                  value="Пункт 1"
              >
              <label for="checkbox1">Легкие</label><br>
              <input
                  type="checkbox"
                  id="checkbox1"
                  name="checkboxGroup"
                  value="Пункт 1"
              >
              <label for="checkbox1">Средние</label><br>
              <input
                  type="checkbox"
                  id="checkbox1"
                  name="checkboxGroup"
                  value="Пункт 1"
              >
              <label for="checkbox1">Тяжелые</label><br>
            </div>
          </div>

          <button class="btn_filter">Применить фильтр</button>
          <button class="btn_filter">Сбросить</button>
        </div>

        <div class="div3">
<!--          <div v-for="task in zadania">-->
<!--            <TaskList :task="task" :key="task.id"/>-->
<!--          </div>-->
          <TaskList
              v-for="task in $store.state.zadania"
              :key="task.id"
              :task="task"
          />
        </div>
      </div>

    </div>
  </div>
</template>


<script>
import TaskList from "@/components/TaskList.vue";

export default {
  computed: {
    taskList() {
      return taskList
    }
  },
  components: {
    TaskList,
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/styles/vars.scss';

.btn_filter {
  margin-top: 50px;
}

.main {
  margin-top: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 10px;
}

.complexity p {
  margin: 15px 0 5px 0;
}

.window {
  width: 1270px;
  //margin: 0 5% 0 5%;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto 1fr;
  gap: 10px;
}

.div1,
.div2,
.div3 {
  border: 2px solid $lightBlueColor;
  padding: 10px;
  border-radius: 1rem;
}

.div1 {
  grid-column: 1 / span 3;
  text-align: center;
  background: white;
}

.div2 {
  margin-top: 10px;
  grid-row: 2 / span 1;
  text-align: center;
  height: 400px;
  background: white;
}

.div3 {
  grid-column: 2 / span 2;
  grid-row: 2 / span 1;
  text-align: center;
  border: none;
  overflow-x: hidden;
  overflow-y: auto;

  // scroll пока работает на firefox
  scrollbar-width: thin;
  scrollbar-color: $lightBlueColor white;
}
</style>