<script>
import ProgressBar from '@/UI/ProgressBar.vue';
export default {
  components: {
    ProgressBar
  },
  props: {
    grades: {
      type: Array,
      required: true
    }
  },
  data() {
    return {

    }
  },

}
</script>

<template>
<div class="main_rait">
    <h2 class="title_my_rating">Мой рейтинг</h2>
    <div class="grades_teacher informatics">
      <h3>Мой балл по информатике: {{ grades[0].informatics }}</h3>
      <p>Мой прогресс по достижение звания "Эксперт" в этом предмете:</p>
      <progress-bar :score="grades[0].informatics"></progress-bar>
    </div>
    <div class="grades_teacher mathematics">
      <h3>Мой балл по математике: {{ grades[0].mathematics }}</h3>
      <p>Мой прогресс по достижение звания "Эксперт" в этом предмете:</p>
      <progress-bar :score="grades[0].mathematics"></progress-bar>
    </div>
    <div class="grades_teacher physics">
      <h3>Мой балл по физике: {{ grades[0].physics }}</h3>
      <p>Мой прогресс по достижение звания "Эксперт" в этом предмете:</p>
      <progress-bar :score="grades[0].physics"></progress-bar>
    </div>
    <div class="grades_teacher chemistry">
      <h3>Мой балл по химии: {{ grades[0].chemistry }}</h3>
      <p>Мой прогресс по достижение звания "Эксперт" в этом предмете:</p>
      <progress-bar :score="grades[0].chemistry"></progress-bar>
    </div>
    <div class="grades_teacher biology">
      <h3>Мой балл по биологии: {{ grades[0].biology }}</h3>
      <p>Мой прогресс по достижение звания "Эксперт" в этом предмете:</p>
      <progress-bar :score="grades[0].biology"></progress-bar>
    </div>
    <div class="grades_teacher geography">
      <h3>Мой балл по географии: {{ grades[0].geography }}</h3>
      <p>Мой прогресс по достижение звания "Эксперт" в этом предмете:</p>
      <progress-bar :score="grades[0].geography"></progress-bar>
    </div>
    <div class="grades_teacher technology">
      <h3>Мой балл по технологии: {{ grades[0].technology }}</h3>
      <p>Мой прогресс по достижение звания "Эксперт" в этом предмете:</p>
      <progress-bar :score="grades[0].technology"></progress-bar>
    </div>


    <h2 class="title_my_rating">Мои достижения</h2>
    <div class="my_achivment">
      <div class="achievement-card">
        <img src="@/assets/images/prizes/prizes (1).png" alt="achievement.title" class="achievement-image">
        <h4 class="achievement-title">Первое задание создано!</h4>
        <p class="achievement-text">Ваш первый вклад в обучение неоценим. Продолжайте вдохновлять учеников!</p>
      </div>
      <div class="achievement-card">
        <img src="@/assets/images/prizes/prizes (18).png" alt="achievement.title" class="achievement-image">
        <h4 class="achievement-title">25 заданий в арсенале!</h4>
        <p class="achievement-text">Вы создали 25 уникальных заданий. Ваше мастерство формирует будущее образования!</p>
      </div>
      <div class="achievement-card">
        <img src="@/assets/images/prizes/prizes (5).png" alt="achievement.title" class="achievement-image">
        <h4 class="achievement-title">50 заданий для жаждущих знаний!</h4>
        <p class="achievement-text">50 заданий добавлено! Ваше стремление к обучению укрепляет основы знаний.</p>
      </div>
      <div class="achievement-card">
        <img src="@/assets/images/prizes/prizes (4).png" alt="achievement.title" class="achievement-image">
        <h4 class="achievement-title">75 шедевров педагогики!</h4>
        <p class="achievement-text">Вы достигли великолепной отметки в 75 заданий! Ваш опыт и творчество ценятся выше всего.</p>
      </div>
      <div class="achievement-card inactive">
        <img src="@/assets/images/prizes/prizes (6).png" alt="achievement.title" class="achievement-image">
        <h4 class="achievement-title">100 заданий - вековой юбилей!</h4>
        <p class="achievement-text">Ваши 100 заданий стали вехой в образовании. Вы истинная легенда учения!</p>
      </div>
    </div>
</div>
</template>

<style scoped lang="scss">
.title_my_rating {
  text-align: center;
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 20px;
}

.grades_teacher {
  background: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 0 50px #888888;

  h3 {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 10px;
  }
}

// card

.my_achivment {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px; // Определяем пространство между карточками

  .achievement-card {
    flex: 1 1 calc(33.333% - 20px); // каждая карточка занимает 1/3 ширины контейнера минус gap
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    opacity: 1;
    &.inactive {
      opacity: 0.5; // Полупрозрачность для неактивных карточек
      pointer-events: none; // Отключение взаимодействия с пользователем
    }

    &:not(:nth-child(3n)) {
      margin-right: 0; // Убираем margin справа для каждой третьей карточки
    }

    .achievement-image {
      width: 100%; // или фиксированный размер, если нужно
      height: auto; // сохранить пропорции изображения
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

@media (max-width: 767px) { // Медиа-запрос для мобильных устройств
  .my_achivment {
    justify-content: center; // Центрируем карточки на маленьких экранах
  }

  .achievement-card {
    flex-basis: 100%; // Карточки занимают всю ширину на маленьких экранах
    max-width: 100%; // Ограничиваем максимальную ширину для учета отступов
    opacity: 1;

    &.inactive {
      opacity: 0.1; // Полупрозрачность для неактивных карточек
      pointer-events: none; // Отключение взаимодействия с пользователем
    }
  }
}

</style>
