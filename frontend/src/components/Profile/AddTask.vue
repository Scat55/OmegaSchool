<script>
import TwoLVL from '@/components/AddTask/TwoLVL.vue';
import FirstLVL from '@/components/AddTask/FirstLVL.vue';
import ThreeLVL from '@/components/AddTask/ThreeLVL.vue';

export default {
  components: {
    ThreeLVL,
    FirstLVL,
    TwoLVL,
  },
  data() {
    return {
      selectedValue: '1',
      rules: '',
      selectedClass: '',
      selectedItems: '',
    };
  },
  methods: {},
  watch: {
    selectedValue(rules) {
      switch (this.selectedValue) {
        case '1':
          this.rules =
            'За задание дается 1 балл. Предполагает вопрос в котором есть вариант ответов.';
          break;
        case '2':
          this.rules =
            'За задание дается максимум 3 балла. Предполагается вопрос с развернутым ответом, где ответ проверяет учитель.';
          break;
        case '3':
          this.rules = 'Проектная работа. Дается только тема и необходимые материалы.';
          break;
        default:
          this.rules = 'у вас не выбран уровень задания.';
      }
    },
  },
};
</script>

<template>
  <div class="window_Add">
    <h2>Добавление задачи</h2>
    <div class="tasks">
      <!--  Выборка уровня задания  -->
      <div class="window_variantLVL">
        <div>
          <label>Уровень задачи: </label>
          <select v-model="selectedValue" class="window_Add-level">
            <option value="1">1 уровень</option>
            <option value="2">2 уровень</option>
            <option value="3">3 уровень</option>
          </select>
        </div>
        <div>
          <p>{{ rules }}</p>
        </div>
      </div>
      <!--  Выборка предмета  -->
      <div class="window_Items">
        <label>Предмет: </label>
        <select v-model="selectedItems" class="window_Add-level">
          <option value="Биология">Биология</option>
          <option value="География">География</option>
          <option value="Информатика">Информатика</option>
          <option value="Математика">Математика</option>
          <option value="Технология">Технология</option>
          <option value="Физика">Физика</option>
          <option value="Химия">Химия</option>
        </select>
      </div>
      <!--  Выборка класса  -->
      <div class="window_Class">
        <label>Для какого класса: </label>
        <select v-model="selectedClass" class="window_Add-level">
          <option value="8">8 класс</option>
          <option value="9">9 класс</option>
          <option value="10">10 класс</option>
        </select>
      </div>
    </div>
    <FirstLVL
      v-show="selectedValue === '1'"
      :selectedValue="selectedValue"
      :selectedClass="selectedClass"
      :selectedItems="selectedItems"
    />
    <TwoLVL v-show="selectedValue === '2'" />
    <ThreeLVL v-show="selectedValue === '3'" />
  </div>
</template>

<style scoped lang="scss">
.window_Add {
  display: flex;
  height: 100%;
  width: 100%;
  //padding: 10px;
  flex-direction: column;

  & > h2 {
    margin-bottom: 15px;
  }

  &-level {
    padding: 1px;
    border-radius: 1rem;
    margin-bottom: 1rem;
  }

  .tasks {
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (min-width: 300px) and (max-width: 490px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
}
</style>
