<template>
  <div class="robot">
    <div class="container">
      <h1 class="robot__title">Омега класс</h1>
      <div class="robot__line"></div>

      <div class="robot__content">
        <div>
          <p class="robot__subtitle">
            В эпоху цифровизации и глобализации, качественное образование становится нашим главным
            приоритетом. У нас вы найдете сочетание проверенных временем методов и современных
            технологий, чтобы учиться с удовольствием и эффективностью. Присоединяйтесь к команде
            передовых мыслителей!
          </p>
          <button
            class="robot__btn"
            @click="changeStatusOnTrue()"
          >Начать заниматься</button>
        </div>
        <img
          src="../assets/images/robot_text_1.png"
          alt="Robot"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {
    // Проверка авторизации
    changeStatusOnTrue() {
      const local = JSON.parse(localStorage.getItem('local'));
      // Если да, то переходим в личный кабинет
      if (local) {
        this.$router.push(`/profile/${local.userID}`);
      }
      // Если нет, то открывается форма регистрации
      else {
        window.scrollTo(0, 0);
        const body = document.querySelector('body');
        this.$store.state.status = true;
        body.style.overflow = 'hidden';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/vars.scss';

.robot {
  margin-top: 5rem;
  background-color: #00dfcc;
  padding: 1.625rem;

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-around;

    img {
      width: 45%;
    }
  }

  &__title {
    font-size: 4rem;
    margin-bottom: 3rem;
  }

  &__line {
    height: 2px;
    width: 60%;
    background-color: $accentColor;
  }

  &__subtitle {
    display: inline-block;
    line-height: 180%;
    letter-spacing: 0.2rem;
    font-size: 1.1rem;
    margin-bottom: 3rem;
  }

  &__btn {
    font-family: Visitor;
    font-size: 1.3rem;
    padding: 0.625rem 1.25rem;
    background-color: $lightBlueColor;
    color: $whiteColor;
    border: none;
    outline: none;
    border-radius: 1rem;
    cursor: pointer;

    &:hover {
      box-shadow: 0 0 3px 3px $lightBlueColor;
    }
  }
}</style>
