<script>
import TwoLVL from "@/components/AddTask/TwoLVL.vue";

export default {
  components: {TwoLVL},
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
          this.rules = 'Это тест. Здесь может быть неограниченное кол-во заданий 1 уровня и 2 уровня.'
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