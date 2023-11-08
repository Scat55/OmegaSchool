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
      sum: '',
    };
  },
  methods: {},
  computed: {},
  mounted(){
    this.sum = this.grades[0].informatics + this.grades[0].mathematics + this.grades[0].physics + this.grades[0].chemistry + this.grades[0].biology + this.grades[0].geography + this.grades[0].technology;
  }
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
        <p>Общее количество полученных баллов: {{ sum }} </p>
        <div class="my_achivment">
          <div :class="['achievement-card', sum >= 1 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/prizes (1).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title">В путь к знаниям!</h4>
            <p class="achievement-text"> Ваш первый балл заложил основу стремления к обучению. Это только начало!</p>
          </div>
          <div :class="['achievement-card', sum >= 100 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/prizes (18).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title">100 баллов набрано!</h4>
            <p class="achievement-text"> 100 баллов - и вы уже доказали свою усердность. Продолжайте в том же духе!</p>
          </div>
          <div :class="['achievement-card', sum >= 500 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/prizes (5).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title">500 баллов за плечами!</h4>
            <p class="achievement-text">Собрав 500 баллов, вы показываете истинную жажду знаний. Вперед к новым вершинам!</p>
          </div>
          <div :class="['achievement-card', sum >= 1000 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/prizes (4).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title">1000 баллов - впечатляет!</h4>
            <p class="achievement-text">Вы достигли рубежа в 1000 баллов! Ваши знания и усилия заслуживают восхищения.</p>
          </div>
          <div :class="['achievement-card', sum >= 7000 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/prizes (6).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title">7000 баллов - покорение вершин!</h4>
            <p class="achievement-text">7000 баллов! Ваше имя будет вписано в анналы учебных достижений.</p>
          </div>
        </div>
      </div>
      <div class="selected item2" v-show="selectedItem === 'Биология'">
        <p>Твой балл по Биологии {{ grades[0].biology }}</p>
        <div class="my_achivment">
          <div :class="['achievement-card', sum >= 1 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/prizes (1).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title">Начинающий Натуралист</h4>
            <h4 class="title">Первое задание создано!</h4>
            <p class="achievement-text">Ваш первый вклад в обучение неоценим. Продолжайте вдохновлять учеников!</p>
          </div>
          <div :class="['achievement-card', sum >= 25 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/prizes (18).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title"></h4>
            <h4 class="title" >25 заданий в арсенале!</h4>
            <p class="achievement-text">Вы создали 25 уникальных заданий. Ваше мастерство формирует будущее образования!</p>
          </div>
          <div :class="['achievement-card', sum >= 50 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/prizes (5).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title"></h4>
            <h4 class="title" >50 заданий для жаждущих знаний!</h4>
            <p class="achievement-text">50 заданий добавлено! Ваше стремление к обучению укрепляет основы знаний.</p>
          </div>
          <div :class="['achievement-card', sum >= 75 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/prizes (4).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title"></h4>
            <h4 class="title" >75 шедевров педагогики!</h4>
            <p class="achievement-text">Вы достигли великолепной отметки в 75 заданий! Ваш опыт и творчество ценятся выше всего.</p>
          </div>
          <div :class="['achievement-card', sum >= 100 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/prizes (6).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title"></h4>
            <h4 class="title" >100 заданий - вековой юбилей!</h4>
            <p class="achievement-text">Ваши 100 заданий стали вехой в образовании. Вы истинная легенда учения!</p>
          </div>
        </div>
      </div>
      <div class="selected item3" v-show="selectedItem === 'География'">
        <p>Твой балл по Географии {{ grades[0].geography }}</p>
        <div class="my_achivment">
          <div :class="['achievement-card', sum >= 1 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/prizes (1).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title"></h4>
            <h4 class="title">Первое задание создано!</h4>
            <p class="achievement-text">Ваш первый вклад в обучение неоценим. Продолжайте вдохновлять учеников!</p>
          </div>
          <div :class="['achievement-card', sum >= 25 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/prizes (18).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title"></h4>
            <h4 class="title">25 заданий в арсенале!</h4>
            <p class="achievement-text">Вы создали 25 уникальных заданий. Ваше мастерство формирует будущее образования!</p>
          </div>
          <div :class="['achievement-card', sum >= 50 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/prizes (5).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title"></h4>
            <h4 class="title">50 заданий для жаждущих знаний!</h4>
            <p class="achievement-text">50 заданий добавлено! Ваше стремление к обучению укрепляет основы знаний.</p>
          </div>
          <div :class="['achievement-card', sum >= 75 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/prizes (4).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title"></h4>
            <h4 class="title">75 шедевров педагогики!</h4>
            <p class="achievement-text">Вы достигли великолепной отметки в 75 заданий! Ваш опыт и творчество ценятся выше всего.</p>
          </div>
          <div :class="['achievement-card', sum >= 100 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/prizes (6).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title"></h4>
            <h4 class="title">100 заданий - вековой юбилей!</h4>
            <p class="achievement-text">Ваши 100 заданий стали вехой в образовании. Вы истинная легенда учения!</p>
          </div>
        </div>
      </div>
      <div class="selected item4" v-show="selectedItem === 'Информатика'">
        <p>Твой балл по Информатика {{ grades[0].informatics }}</p>
        <div class="my_achivment">
          <div :class="['achievement-card', sum >= 1 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/prizes (1).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title"></h4>
            <h4 class="title" >Первое задание создано!</h4>
            <p class="achievement-text">Ваш первый вклад в обучение неоценим. Продолжайте вдохновлять учеников!</p>
          </div>
          <div :class="['achievement-card', sum >= 25 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/prizes (18).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title"></h4>
            <h4 class="title">25 заданий в арсенале!</h4>
            <p class="achievement-text">Вы создали 25 уникальных заданий. Ваше мастерство формирует будущее образования!</p>
          </div>
          <div :class="['achievement-card', sum >= 50 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/prizes (5).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title"></h4>
            <h4 class="title">50 заданий для жаждущих знаний!</h4>
            <p class="achievement-text">50 заданий добавлено! Ваше стремление к обучению укрепляет основы знаний.</p>
          </div>
          <div :class="['achievement-card', sum >= 75 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/prizes (4).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title"></h4>
            <h4 class="title">75 шедевров педагогики!</h4>
            <p class="achievement-text">Вы достигли великолепной отметки в 75 заданий! Ваш опыт и творчество ценятся выше всего.</p>
          </div>
          <div :class="['achievement-card', sum >= 100 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/prizes (6).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title"></h4>
            <h4 class="title">100 заданий - вековой юбилей!</h4>
            <p class="achievement-text">Ваши 100 заданий стали вехой в образовании. Вы истинная легенда учения!</p>
          </div>
        </div>
      </div>
      <div class="selected item5" v-show="selectedItem === 'Математика'">
        <p>Твой балл по Математика {{ grades[0].mathematics }}</p>
        <div class="my_achivment">
          <div :class="['achievement-card', sum >= 1 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/prizes (1).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title"></h4>
            <h4 class="title">Первое задание создано!</h4>
            <p class="achievement-text">Ваш первый вклад в обучение неоценим. Продолжайте вдохновлять учеников!</p>
          </div>
          <div :class="['achievement-card', sum >= 25 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/prizes (18).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title"></h4>
            <h4 class="title">25 заданий в арсенале!</h4>
            <p class="achievement-text">Вы создали 25 уникальных заданий. Ваше мастерство формирует будущее образования!</p>
          </div>
          <div :class="['achievement-card', sum >= 50 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/prizes (5).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title"></h4>
            <h4 class="title">50 заданий для жаждущих знаний!</h4>
            <p class="achievement-text">50 заданий добавлено! Ваше стремление к обучению укрепляет основы знаний.</p>
          </div>
          <div :class="['achievement-card', sum >= 75 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/prizes (4).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title"></h4>
            <h4 class="title">75 шедевров педагогики!</h4>
            <p class="achievement-text">Вы достигли великолепной отметки в 75 заданий! Ваш опыт и творчество ценятся выше всего.</p>
          </div>
          <div :class="['achievement-card', sum >= 100 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/prizes (6).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title"></h4>
            <h4 class="title">100 заданий - вековой юбилей!</h4>
            <p class="achievement-text">Ваши 100 заданий стали вехой в образовании. Вы истинная легенда учения!</p>
          </div>
        </div>
      </div>
      <div class="selected item6" v-show="selectedItem === 'Технология'">
        <p>Твой балл по Технологии {{ grades[0].technology }}</p>
        <div class="my_achivment">
          <div :class="['achievement-card', sum >= 1 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/prizes (1).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title"></h4>
            <h4 class="title">Первое задание создано!</h4>
            <p class="achievement-text">Ваш первый вклад в обучение неоценим. Продолжайте вдохновлять учеников!</p>
          </div>
          <div :class="['achievement-card', sum >= 25 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/prizes (18).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title"></h4>
            <h4 class="title">25 заданий в арсенале!</h4>
            <p class="achievement-text">Вы создали 25 уникальных заданий. Ваше мастерство формирует будущее образования!</p>
          </div>
          <div :class="['achievement-card', sum >= 50 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/prizes (5).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title"></h4>
            <h4 class="title">50 заданий для жаждущих знаний!</h4>
            <p class="achievement-text">50 заданий добавлено! Ваше стремление к обучению укрепляет основы знаний.</p>
          </div>
          <div :class="['achievement-card', sum >= 75 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/prizes (4).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title"></h4>
            <h4 class="title">75 шедевров педагогики!</h4>
            <p class="achievement-text">Вы достигли великолепной отметки в 75 заданий! Ваш опыт и творчество ценятся выше всего.</p>
          </div>
          <div :class="['achievement-card', sum >= 100 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/prizes (6).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title"></h4>
            <h4 class="title">100 заданий - вековой юбилей!</h4>
            <p class="achievement-text">Ваши 100 заданий стали вехой в образовании. Вы истинная легенда учения!</p>
          </div>
        </div>
      </div>
      <div class="selected item7" v-show="selectedItem === 'Физика'">
        <p>Твой балл по Физике {{ grades[0].physics }}</p>
        <div class="my_achivment">
          <div :class="['achievement-card', sum >= 1 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/prizes (1).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title"></h4>
            <h4 class="title" >Первое задание создано!</h4>
            <p class="achievement-text">Ваш первый вклад в обучение неоценим. Продолжайте вдохновлять учеников!</p>
          </div>
          <div :class="['achievement-card', sum >= 25 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/prizes (18).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title"></h4>
            <h4 class="title">25 заданий в арсенале!</h4>
            <p class="achievement-text">Вы создали 25 уникальных заданий. Ваше мастерство формирует будущее образования!</p>
          </div>
          <div :class="['achievement-card', sum >= 50 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/prizes (5).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title"></h4>
            <h4 class="title">50 заданий для жаждущих знаний!</h4>
            <p class="achievement-text">50 заданий добавлено! Ваше стремление к обучению укрепляет основы знаний.</p>
          </div>
          <div :class="['achievement-card', sum >= 75 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/prizes (4).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title"></h4>
            <h4 class="title" >75 шедевров педагогики!</h4>
            <p class="achievement-text">Вы достигли великолепной отметки в 75 заданий! Ваш опыт и творчество ценятся выше всего.</p>
          </div>
          <div :class="['achievement-card', sum >= 100 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/prizes (6).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title"></h4>
            <h4 class="title">100 заданий - вековой юбилей!</h4>
            <p class="achievement-text">Ваши 100 заданий стали вехой в образовании. Вы истинная легенда учения!</p>
          </div>
        </div>
      </div>
      <div class="selected item8" v-show="selectedItem === 'Химия'">
        <p>Твой балл по Химии {{ grades[0].chemistry }}</p>
        <div class="my_achivment">
          <div :class="['achievement-card', sum >= 1 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/prizes (1).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title"></h4>
            <h4 class="title" >Первое задание создано!</h4>
            <p class="achievement-text">Ваш первый вклад в обучение неоценим. Продолжайте вдохновлять учеников!</p>
          </div>
          <div :class="['achievement-card', sum >= 25 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/prizes (18).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title"></h4>
            <h4 class="title" >25 заданий в арсенале!</h4>
            <p class="achievement-text">Вы создали 25 уникальных заданий. Ваше мастерство формирует будущее образования!</p>
          </div>
          <div :class="['achievement-card', sum >= 50 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/prizes (5).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title"></h4>
            <h4 class="title">50 заданий для жаждущих знаний!</h4>
            <p class="achievement-text">50 заданий добавлено! Ваше стремление к обучению укрепляет основы знаний.</p>
          </div>
          <div :class="['achievement-card', sum >= 75 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/prizes (4).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title"></h4>
            <h4 class="title" >75 шедевров педагогики!</h4>
            <p class="achievement-text">Вы достигли великолепной отметки в 75 заданий! Ваш опыт и творчество ценятся выше всего.</p>
          </div>
          <div :class="['achievement-card', sum >= 100 ? '' : 'inactive' ]">
            <img src="@/assets/images/prizes/prizes (6).png" alt="achievement.title" class="achievement-image">
            <h4 class="achievement-title"></h4>
            <h4 class="title">100 заданий - вековой юбилей!</h4>
            <p class="achievement-text">Ваши 100 заданий стали вехой в образовании. Вы истинная легенда учения!</p>
          </div>
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
    margin-bottom: 20px;
  }
}

// card 

.my_achivment {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;

  .achievement-card {

    flex: 1 1 calc(33.333% - 20px);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    &.inactive {
      //opacity: 0.5;
      filter: grayscale(100%);
      pointer-events: none;
    }

    &:not(:nth-child(3n)) {
      margin-right: 0;
    }

    .achievement-image {
      width: 100%;
      height: auto;
      margin-bottom: 15px;
    }

    .achievement-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 10px;
      text-align: center;
    }

    .achievement-text {
      font-size: 14px;
      font-weight: 400;
      text-align: center;
    }
  }
}

.title {
  margin-bottom: 10px;
  text-align: center;
}

@media (max-width: 767px) {
  .my_achivment {
    justify-content: center;
  }

  .achievement-card {
    flex-basis: 100%;
    max-width: 100%;
  }
}

.countExercise p {
  margin-bottom: 0;
}
</style>
