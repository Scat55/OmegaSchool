<template>
  <div class="header">
    <div class="container">

      <div class="header__logo">

          <img
            src="../assets/images/Logo_px (2).png"
            alt="Logo"
            class="header__logo-img">

        <div class="header__logo-lists">
          <ul class="header__logo-list">
            <router-link to="/task" class = "router">
              <li
                  v-if="this.$store.state.isAuth"
                  class="header__logo-item"
              >Задания</li>
            </router-link>
<!--            <router-link :to="/profile/ + id" class = "router">-->
<!--              <li-->
<!--                  v-if="this.$store.state.isAuth"-->
<!--                  class="header__logo-item"-->
<!--              >Кабинет</li>-->
<!--            </router-link>-->
<!--            <li class="header__logo-item" v-if="!this.$store.state.isAuth">-->
<!--              <a href="#comp">О нас</a>-->
<!--            </li>-->
<!--            <li class="header__logo-item" v-if="!this.$store.state.isAuth">Полезное</li>-->
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
              <li v-else
                  class="header__logo-item login"
                  v-on:click="logout()">
                Выйти</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store/index';
import router from '../router/index';
export default {
  data() {
    return {
      id: this.$route.params['id'],
    }
  },

  methods: {
    changeStatusOnTrue() {
      const body = document.querySelector('body')
      store.state.status = true
      body.style.overflow = "hidden"
    },
    logout() {
      const body = document.querySelector('body')
      body.style.overflow = ""
      store.state.isAuth = false
      store.state.status = false

      if (this.$route.name === 'home'){
        return
      } else {
        this.$nextTick(() => {
          this.$router.push('/')
        });
      }
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