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
            <FilterItems/>
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
          <div v-for="task in zadania">
            <TaskList :task="task"/>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>


<script>
import FilterItems from "@/components/FilterItems.vue";
import Task from "@/components/TaskList.vue";
import TaskList from "@/components/TaskList.vue";

export default {
  components: {
    TaskList,
    FilterItems,
  },
  data() {
    return {
      zadania: [{
        id: 1,
        title: "Сложение двух числе",
        topic: "Математика",
        complexity: "1",
        bodyTask: "sadkjruesiljfkldxlrjk5hjlghjldfxrhljg drg heslrg ersg hkle lkdfxhgljrfhdls ghrfj edrgehsjlgh ldj f gsjl hsdfjl; g dfg jldsf gdr gdf ;lgjdf hgjdfhjgdfl; d gjldfh gkjsdf gjl;dfh gldf nlg hdfgh dflhg ldfhgl hdfg hdfl gsd",
        status: false,
      }, {
        id: 2,
        title: "sdrgrsdgsdrgxdrgxrtdht",
        topic: "Математика",
        complexity: "1",
        bodyTask: "Нужно будет сложить два числа",
        status: false,
      }, {
        id: 3,
        title: "Сложение двух числе",
        topic: "Математика",
        complexity: "1",
        bodyTask: "Нужно будет сложить два числа",
        status: false,
      }, {
        id: 4,
        title: "Сложение двух числе",
        topic: "Математика",
        complexity: "1",
        bodyTask: "Нужно будет сложить два числа",
        status: false,
      }, {
        id: 5,
        title: "Сложение двух числе",
        topic: "Математика",
        complexity: "1",
        bodyTask: "Нужно будет сложить два числа",
        status: false,
      }, {
        id: 6,
        title: "Сложение двух числе",
        topic: "Математика",
        complexity: "1",
        bodyTask: "Нужно будет сложить два числа",
        status: false,
      }, {
        id: 7,
        title: "Сложение двух числе",
        topic: "Математика",
        complexity: "1",
        bodyTask: "Нужно будет сложить два числа",
        status: false,
      }, {
        id: 8,
        title: "Сложение двух числе",
        topic: "Математика",
        complexity: "1",
        bodyTask: "Нужно будет сложить два числа",
        status: false,
      },]
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