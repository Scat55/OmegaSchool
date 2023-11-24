<template>
  <div style="background-color: #487fb8; margin-bottom: 5rem">
    <div class="container">
      <h2 class="faq-heading">Часто задаваемые вопросы</h2>
      <ul class="faq-list">
        <li v-for="item in faqItems" :key="item.id">
          <div class="question" @click="toggleAnswer(item)">
            <span>{{ item.question }}</span>
            <i :class="{ arrow: true, down: item.showAnswer }"></i>
          </div>
  
          <div class="answer" v-if="item.showAnswer">
            <p v-html="item.answer"></p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      faqItems: [
        {
          id: 1,
          showAnswer: false,
          question: 'Не получили код:',
          answer: '    Проверьте "Спам".\n' + '    Убедитесь в правильности адреса.\n',
        },
        {
          id: 2,
          showAnswer: false,
          question: 'Завершение регистрации:',
          answer: 'Подтвердите почту для доступа к сайту.',
        },
        {
          id: 3,
          showAnswer: false,
          question: 'Помощь:',
          answer:
            'Вопросы? Напишите на <a href="mailto:omegalspu@gmail.com" class="email-link">omegalspu@gmail.com</a>.',
        },
      ],
    };
  },
  methods: {
    toggleAnswer(item) {
      item.showAnswer = !item.showAnswer;
    },
  },
};
</script>

<style scoped>
.container {
  user-select: none;
  margin: 0 auto;
  padding: 3rem ;
  background-color: #487fb8; /* темно-синий цвет фона */

}

.faq-heading {
  margin-bottom: 2rem;
  color: #fff; /* белый цвет текста заголовка */
  text-align: center;
}

.faq-list {
  list-style-type: none;
  padding: 0;
}

.question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #1a237e; /* темно-синий цвет границы */
  border-radius: 5px;
  cursor: pointer;
  color: #fff; /* белый цвет текста вопроса */
  margin-bottom: 10px; /* отступ между пунктами */
}

.answer {
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  text-decoration: none;
  color: black;
  border-radius: 5px;
  background-color: #487fb8; /* темно-синий цвет фона ответа */
}

.arrow {
  border: solid #fff; /* белый цвет стрелки */
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  transition: transform 0.3s ease; /* добавлен переход для анимации стрелки */
}

.down {
  transform: rotate(-135deg);
}
</style>
