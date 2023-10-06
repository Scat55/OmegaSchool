<template>
  <div class="big">
    <div class="container">
      <p class="big__title">Начние учиться уже сегодня!</p>
      <p class="big__subtitle">Зарегестируйтесь и получайте знания</p>

      <div class="big__content">
        <div class="big__content-info">
          <p class="big__content-text">Обучение может быть не только полезным, но и увлекательным! Попробуйте наши
            образовательные игры и квизы,
            разработанные для закрепления и проверки знаний в интерактивной форме. Играя, вы будете учиться быстрее!</p>

          <p class="big__content-text">Общение и обмен опытом - ключевые компоненты успешного образования. На нашей
            платформе вы найдете
            единомышленников, готовых поделиться своими знаниями, ответить на ваши вопросы и помочь в решении сложных
            задач.
          </p>
          <a
            href="#"
            class="big__content-btn"
          >Войти</a>
        </div>
        <img
          src="../assets/images/spaceMan.png"
          alt="SpaceMan"
          class="big__content-img"
        >

      </div>
    </div>
  </div>
</template>

<!-- <script setup>
import { useCounterStore } from '../stores/counter';

const status = useCounterStore();

const body = document.querySelector('body')

const changeStatusOnTrue = () => {
  status.statusForm = true
  body.style.overflow = "hidden"
}
</script> -->


<style lang="scss" scoped>
@import '../assets/styles/vars.scss';

.big {
  background-color: #0046B8;
  border-radius: 1rem;
  margin-top: 1.875rem;

  &__title {
    font-size: 2rem;
    padding-top: 2.25rem;
    color: $whiteColor;

  }

  &__subtitle {
    color: $whiteColor;

  }

  &__content {
    display: flex;
    align-items: start;
    justify-content: space-between;

    &-img {
      align-self: start;
      width: 25rem;
    }

    &-info {
      display: flex;
      flex-direction: column;
    }

    &-btn {
      width: 12.5rem;
      text-align: center;
      background-color: $accentColor;
      padding: .625rem 1.25rem;
      margin-top: 2.25rem;
      border-radius: 1rem;
      cursor: pointer;
      color: $whiteColor;
      text-decoration: none;
      box-shadow: 0 0 10px 10px #2a7afc;
      transition: all .3s;

      &:hover {
        transform: scale(1.1);
      }
    }

    &-text {
      color: $whiteColor;
      font-size: 1.4rem;
      margin-top: 3rem;
    }
  }
}
</style>