<script setup></script>

<template>
  <div class="footer">
    <div class="footer__logo-omega">
      <img
        src="../assets/images/Logo_px (2).png"
        alt="Logo"
        class="footer__logo-img"
        @click="goToTopPage()"
      />

      <p class="footer__omega-title">Омега класс</p>
    </div>
    <div class="list_item">
      <router-link to="/feedback" class="router">
        <li v-if="this.$store.state.isAuth || this.$store.state.isComandAuth" class="footer__item">
          Написать нам: <span>Обратная связь</span>
        </li>
      </router-link>
      <p>Почта: omegalspu@gmail.com</p>
    </div>

    <!-- <div class="footer__universitet">
      <img
        src="../assets/images/logo_w.png"
        alt="LogoUniversitet"
        class="footer__logo-img"
        @click="goToTopPage()"
      />

      <p class="footer__logo-title">
        Липецкий Государственный Педагогический Университет имени П.П. Семенова-Тян-Шанского
      </p>
    </div> -->
  </div>
</template>

<script>
export default {
  methods: {
    goToTopPage() {
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/vars.scss';

.footer {
  background-color: $accentColor;
  margin-top: 2rem;
  display: flex;
  //justify-content: space-between;
  padding: 1rem 3rem 1rem 3rem;
  user-select: none;
  align-items: center;

  &__logo {
    &-omega {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.625rem;
    }

    &-img {
      width: 5.3rem;
      margin-top: 0.625rem;
      cursor: pointer;
    }

    &-title {
      color: $whiteColor;
      width: 25rem;
      text-align: center;
    }
  }

  &__universitet {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.625rem;
  }

  &__omega {
    &-title {
      color: $whiteColor;
    }
  }

  &__item {
    text-decoration: none;
    list-style-type: none;
  }
}

.list_item {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  margin-left: 5%;
  color: $whiteColor;
}

.router li span:hover {
  font-size: 1.1rem;
}
</style>
