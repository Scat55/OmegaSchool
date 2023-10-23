<script setup>

</script>

<template>
  <div class="footer">
    <div class="container">

      <div class="footer__logo">
        <div class="footer__logo-omega">

          <img
            src="../assets/images/Logo_px (2).png"
            alt="Logo"
            class="footer__logo-img"
            @click="goToTopPage()"
          >

          <p class="footer__omega-title">Омега класс</p>
        </div>
        <div class="footer__universitet">

          <img
            src="../assets/images/logo_w.png"
            alt="LogoUniversitet"
            class="footer__logo-img"
            @click="goToTopPage()"
          >

          <p class="footer__logo-title">Липецкий Государственный Педагогический Университет имени П.П.
            Семенова-Тян-Шанского</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToTopPage() {
      window.scrollTo(0, 0);
    }
  },
}
</script>


<style lang="scss" scoped>
@import '../assets/styles/vars.scss';

.footer {
  background-color: $accentColor;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  margin-top: 2rem;
  padding-bottom: 1rem;

  &__logo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;

    &-omega {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: .625rem;
    }

    &-img {
      width: 5.3rem;
      margin-top: .625rem;
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
    gap: .625rem;
  }

  &__omega {
    &-title {
      color: $whiteColor;
    }
  }
}
</style>