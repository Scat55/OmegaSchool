<script>
import AchivkaShablon from "@/components/AchivmentStudent/AchivkaShablon.vue";

export default {
  components: {AchivkaShablon},
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
    <div class="achievement_body">
      <div class="selected item1" v-show="selectedItem === ''">
        
      </div>
      <div class="selected item2" v-show="selectedItem === 'Биология'">
        <p>Твой балл по Биологии {{ grades[0].biology }}</p>
        <div class="achivment">

        </div>
      </div>
      <div class="selected item3" v-show="selectedItem === 'География'">
        <p>Твой балл по Географии {{ grades[0].geography }}</p>
        <div class="achivment">

        </div>
      </div>
      <div class="selected item4" v-show="selectedItem === 'Информатика'">
        <p>Твой балл по Информатика {{ grades[0].informatics }}</p>
        <div class="achivment">

        </div>
      </div>
      <div class="selected item5" v-show="selectedItem === 'Математика'">
        <p>Твой балл по Математика {{ grades[0].mathematics }}</p>
        <div class="achivment">

        </div>
      </div>
      <div class="selected item6" v-show="selectedItem === 'Технология'">
        <p>Твой балл по Технологии {{ grades[0].technology }}</p>
        <div class="achivment">

        </div>
      </div>
      <div class="selected item7" v-show="selectedItem === 'Физика'">
        <p>Твой балл по Физике {{ grades[0].physics }}</p>
        <div class="achivment">

        </div>
      </div>
      <div class="selected item8" v-show="selectedItem === 'Химия'">
        <p>Твой балл по Химии {{ grades[0].chemistry }}</p>
        <div class="achivment">

        </div>
      </div>
    </div>
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

.selected {
  margin-top: 20px;

  & > p {
    background: white;
    padding: 15px;
    border-radius: 1rem;
  }
}


</style>
