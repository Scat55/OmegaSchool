<template>
  <div class="header">
    <div class="container">

      <div class="header__logo">
        <router-link to="/">
          <img
            src="../assets/images/Logo_px (2).png"
            alt="Logo"
            class="header__logo-img"
          >
        </router-link>
        <div class="header__logo-lists">
          <ul class="header__logo-list">
            <li
              class="header__logo-item"
              @click="changeStatusOnTrue()"
            >Задания</li>
            <li class="header__logo-item">О нас</li>
            <li class="header__logo-item">Полезное</li>
            <li
              class="header__logo-item login"
              @click="changeStatusOnTrue()"
              v-if="!this.$store.state.isAuth"
            >
              <img
                src="../assets/images/userLog.png"
                alt=""
                class="log"
              >
              Войти
            </li>
            <li
              class="header__logo-item login"
              @click="logout()"
              v-else>
              Выйти
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {

    }
  },

  methods: {
    changeStatusOnTrue() {
      const body = document.querySelector('body')
      this.$store.state.status = true
      body.style.overflow = "hidden"
    },
    logout(){
      this.$store.state.isAuth = false
      this.$router.push('/')
    }

  },

}
</script>

<style lang="scss" scoped>
@import "../assets/styles/vars.scss";

.header {
  color: $whiteColor;

  &__logo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: $accentColor;
    padding: 0 3rem;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    box-shadow: 0 0 10px 2px $accentColor;


    &-img {
      width: 5.3rem;
      margin-top: .625rem;
      margin-bottom: 1rem;
    }

    &-list {
      display: flex;
      align-items: center;
      gap: 1.25rem;
    }

    &-item {
      list-style: none;
      cursor: pointer;
      transition: all .3s;

      &:hover {
        transform: scale(1.1);
      }
    }
  }
}

.login {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: $whiteColor;
  background-color: $lightBlueColor;
  padding: .625rem 1.25rem;
  border-radius: 1rem;
}

.log {
  width: 1.5rem;
}
</style>