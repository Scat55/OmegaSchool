<template>
  <div class="quiz-container">
    <h3>Команда: {{ teamName }}</h3>

    <div v-for="(task, index) in tasks" :key="index" class="task-container">
      <h4>{{ task }}</h4>
      <p class="question">Вопрос: {{ question[index] }}</p>
      <p class="answer">Правильный ответ: {{ correctAnswers[index] }}</p>

      <p class="user-answer">Ответ пользователя: {{ userAnswers[index] || 'Нет ответа' }}</p>
      <p class="time">Время: {{ time[index] }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    question: Array,
    schoolName: String,
    teamName: String,
    tasks: Array,
    correctAnswers: Array,
    time: Array,
    userAnswers: Array,
  },
};
</script>

<style scoped>
.quiz-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
h1 {
  display: block;
}
.task-container {
  margin-top: 1rem;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: #fff;
}

h2,
h3 {
  color: #333;
}

.question,
.answer,
.user-answer {
  margin: 5px 0;
  font-size: 14px;
}

.time {
  margin-top: 20px;
  font-weight: bold;
  color: #e44d26; /* цвет красного */
}
</style>
