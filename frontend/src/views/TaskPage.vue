<template>
  <div>
    <Header />
    <div class="main">

      <div class="window">

        <div class="div1">
          <div>Задания</div>
          <div>Слева вы сможете выбрать фильтры для заданий. <br> По каким предметам, сложность и тд.</div>
        </div>

        <div class="div2">
          <div>
            <FilterItems />
            <ComplexityTasks />
            <filter-items>
              <FilterItems />
            </filter-items>
            <complexity-tasks>
              <ComplexityTasks />
            </complexity-tasks>
          </div>

          <button class="btn_filter">Применить фильтр</button>
          <button class="btn_filter">Сбросить</button>
        </div>

        <div class="div3">
          <div v-for="task in zadania">
            <Task :task="task" />
          </div>
        </div>

      </div>

    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Button from "@/UI/Button.vue";
import FilterItems from "@/components/FilterItems.vue";
import ComplexityTasks from "@/components/ComplexityTasks.vue";
import Footer from "@/components/Footer.vue";
import Task from "@/components/Task.vue";

export default {
  components: {
    ComplexityTasks,
    FilterItems,
    Task
  },
  data() {
    return {
      zadania: [{
        title: "Сложение двух числе",
        topic: "Математика",
        complexity: "Уровень сложности: Тяжелые",
        bodyTask: "sadkjruesiljfkldxlrjk5hjlghjldfxrhljg drg heslrg ersg hkle lkdfxhgljrfhdls ghrfj edrgehsjlgh ldj f gsjl hsdfjl; g dfg jldsf gdr gdf ;lgjdf hgjdfhjgdfl; d gjldfh gkjsdf gjl;dfh gldf nlg hdfgh dflhg ldfhgl hdfg hdfl gsd"
      }, {
        title: "sdrgrsdgsdrgxdrgxrtdht",
        topic: "Математика",
        complexity: "Уровень сложности: Тяжелые",
        bodyTask: "Нужно будет сложить два числа"
      }, {
        title: "Сложение двух числе",
        topic: "Математика",
        complexity: "Уровень сложности: Тяжелые",
        bodyTask: "Нужно будет сложить два числа"
      }, {
        title: "Сложение двух числе",
        topic: "Математика",
        complexity: "Уровень сложности: Тяжелые",
        bodyTask: "Нужно будет сложить два числа"
      }, {
        title: "Сложение двух числе",
        topic: "Математика",
        complexity: "Уровень сложности: Тяжелые",
        bodyTask: "Нужно будет сложить два числа"
      }, {
        title: "Сложение двух числе",
        topic: "Математика",
        complexity: "Уровень сложности: Тяжелые",
        bodyTask: "Нужно будет сложить два числа"
      }, {
        title: "Сложение двух числе",
        topic: "Математика",
        complexity: "Уровень сложности: Тяжелые",
        bodyTask: "Нужно будет сложить два числа"
      }, {
        title: "Сложение двух числе",
        topic: "Математика",
        complexity: "Уровень сложности: Тяжелые",
        bodyTask: "Нужно будет сложить два числа"
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
}
</style>

