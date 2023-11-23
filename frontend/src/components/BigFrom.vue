<template>
  <div class="big">
    <div class="container">
      <p class="big__title">Начните учиться уже сегодня!</p>
      <p class="big__subtitle">Зарегистрируйтесь и получайте знания</p>

      <div class="big__content">
        <div
          class="big__content-info"
          v-if="!statusText"
        >
          <p class="big__content-text">
            Обучение может быть не только полезным, но и увлекательным! Попробуйте наши
            образовательные игры и квизы, разработанные для закрепления и проверки знаний в
            интерактивной форме. Играя, вы будете учиться быстрее!
          </p>

          <p class="big__content-text">
            Общение и обмен опытом - ключевые компоненты успешного образования. На нашей платформе
            вы найдете единомышленников, готовых поделиться своими знаниями, ответить на ваши
            вопросы и помочь в решении сложных задач.
          </p>
          <p
            class="big__content-btn"
            @click="changeStatusOnTrue()"
          >Войти</p>
        </div>
        <p v-if="statusText">
          y`V 7E`V `B 2r$j$qYt1[F 1`Vt# 31D z7`V1D2$ 85$ q7`NjzR1 w5$ `C t5^3 - `B qEqjzT1D`B5^ iG
          w^jzéT`V `C jqY82%2$ = z7E`N r#`N 8zj^2 t5$ `C q`C`× t5^`V`×
        </p>
        <img
          src="../assets/images/spaceMan.png"
          alt="SpaceMan"
          class="big__content-img"
          @click="show()"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      statusText: false,
    };
  },

  methods: {
    // Проверка авторизации
    changeStatusOnTrue() {
      const local = JSON.parse(localStorage.getItem('local'));
      // Если да, то переходим в личный кабинет
      if (local) {
        this.$router.push(`/profile/${local.userID}`);
        window.scrollTo(0, 0);
      }
      // Если нет, то открывается форма регистрации
      else {
        window.scrollTo(0, 0);
        const body = document.querySelector('body');
        this.$store.state.status = true;
        body.style.overflow = 'hidden';
      }
    },
    // Отображение пасхалкаи
    show() {
      this.count++;
      if (this.count % 8 === 0) {
        this.statusText = true;
      } else {
        this.statusText = false;
        return;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/vars.scss';

.big {
  background-color: $accentColor;
  margin-top: 1.875rem;
  padding: 1.2rem;

  &__title {
    font-size: 2rem;
    padding-top: 2.25rem;
    color: $whiteColor;
  }

  &__subtitle {
    color: $whiteColor;
    margin-top: 1rem;
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
      background-color: $lightBlueColor;
      width: 12.5rem;
      text-align: center;
      padding: 0.625rem 1.25rem;
      margin-top: 2.25rem;
      border-radius: 1rem;
      cursor: pointer;
      color: $whiteColor;
      text-decoration: none;
      transition: all 0.3s;

      &:hover {
        transform: scale(1.1);
      }
    }

    &-text {
      color: $whiteColor;
      font-size: 1.2rem;
      line-height: 140%;
      margin-top: 3rem;
    }
  }
}</style>
