<script>
import TwoLVL from "@/components/AddTask/TwoLVL.vue";
import FirstLVL from "@/components/AddTask/FirstLVL.vue";

export default {
  components: {
    FirstLVL,
    TwoLVL},
  data() {
    return {
      selectedValue: '',
      rules: '',
    }
  },
  methods: {},
  watch: {
    selectedValue(rules) {
      switch (this.selectedValue) {
        case ('oneLVL'):
          this.rules = 'За задание дается 1 балл. Предполагает вопрос в котором есть вариант ответов.'
          break;
        case ('twoLVL'):
          this.rules = 'За задание дается максимум 3 балла. Предполагается вопрос с развернутым ответом, где ответ проверяет учитель.'
          break;
        case ('threeLVL'):
          this.rules = 'Проектная работа. Дается только тема и необходимые материалы.'
          break;
        default:
          this.rules = 'у вас не выбран уровень задания.'
      }
    }
  }
}
</script>

<template>
  <div class="window_Add">
    <h2>Добавление задачи</h2>
    <div class="variantLVL">
      <label>Выберите уровень задачи: </label>
      <select v-model="selectedValue">
        <option value="oneLVL">1 уровень</option>
        <option value="twoLVL">2 уровень</option>
        <option value="threeLVL">3 уровень</option>
      </select>
      <p>{{ rules }}</p>
    </div>
    <FirstLVL v-show="selectedValue === 'oneLVL'"/>
    <TwoLVL  v-show="selectedValue === 'twoLVL'" />
  </div>
</template>

<style scoped lang="scss">
.window_Add {
  display: flex;
  height: 100%;
  width: 100%;
  //padding: 10px;
  flex-direction: column;
}
</style>