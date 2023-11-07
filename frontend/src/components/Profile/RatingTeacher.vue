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

    <div class="my_achivment">
      
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
</style>
