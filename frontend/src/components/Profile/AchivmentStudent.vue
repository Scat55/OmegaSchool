<script>
export default {
  props: {
    grades: Array,
    achievements: Array,
  },
  data() {
    return {
      selectedItem: '',
    };
  },
  methods: {},
};
</script>

<template>
  <div>
    <div class="achievement_title">
      <p>Витрина достижений</p>
      <select v-model="selectedItem">
        <option value="">Общие награды</option>
        <option value="Биология">Биология</option>
        <option value="География">География</option>
        <option value="Информатика">Информатика</option>
        <option value="Математика">Математика</option>
        <option value="Технология">Технология</option>
        <option value="Физика">Физика</option>
        <option value="Химия">Химия</option>
      </select>
    </div>
    <div class="achievement_body"></div>
  </div>
</template>

<style scoped lang="scss">
.achievement_title {
  text-align: center;
  & > select {
    font-size: 1.1rem;
    padding: 5px;
    outline: none;
    border-radius: 1rem;
    margin-top: 15px;
    width: 100%;
    text-align: center;
  }
}
</style>
