<template>
  <div class="header">
    <div class="header__logo">
      <img
        src="../assets/images/Logo_px (2).png"
        alt="Logo"
        class="header__logo-img"
        v-on:click="goToHomePage()"
      />

      <div class="header__logo-lists" v-if="this.$route.path != '/auth'">
        <ul class="header__logo-list">
          <router-link to="/task" class="router">
            <li v-if="this.$store.state.isAuth" class="header__logo-item">Задания</li>
          </router-link>
          <li
            class="header__logo-item login"
            @click="changeStatusOnTrue()"
            v-if="!this.$store.state.isAuth"
          >
            <img src="../assets/images/userLog.png" alt="" class="log" />
            Войти
          </li>
          <div v-else class="header__logout">
            <li class="header__logo-item login" @click="changeStatusMenu()">Мой кабинет</li>
            <div v-if="statusMenu" class="header__logout-list">
              <li @click="goToPersonPage()">Кабинет</li>
              <li @click="logout()">Выйти</li>
            </div>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store/index';
import router from '../router/index';
import axios from 'axios';

export default {
  data() {
    return {
      id: this.$router.currentRoute.params['id'],
      statusMenu: false,
      type: '',
    };
  },

  methods: {
    // Функция оотображения формы регистрации
    changeStatusOnTrue() {
      const body = document.querySelector('body');
      store.state.status = true;
      body.style.overflow = 'hidden';
    },
    // Выход из личного кабинета
    logout() {
      const body = document.querySelector('body');
      body.style.overflow = '';
      localStorage.removeItem('local');
      store.state.isAuth = false;
      store.state.status = false;
      this.statusMenu = false;
      if (this.$route.name === 'home') {
        return;
      } else {
        this.$nextTick(() => {
          this.$router.push('/');
        });
      }
    },
    // Переход на главную и проверка нахождения на главной или нет
    goToHomePage() {
      if (this.$route.name === 'home') {
        return;
      } else {
        this.$nextTick(() => {
          this.$router.push('/');
        });
      }
    },
    // Открытие меню в личном кабинете
    changeStatusMenu() {
      this.statusMenu = !this.statusMenu;
    },
    // Переход в личный кабинет
    goToPersonPage() {
      let local = localStorage.getItem('local');
      local = JSON.parse(local);
      if (this.$route.fullPath === `/profile/${local.userID}`) {
        this.statusMenu = false;
        return;
      } else {
        this.$nextTick(() => {
          this.$router.push(`/profile/${local.userID}`);
        });
        this.statusMenu = false;
      }
      console.log(this.id);
    },
  },

  mounted() {
    // axios.get('/api/user_list').then((res) => {
    //   this.type = res.data;
    // });
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/vars.scss';

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
      margin-top: 0.625rem;
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
      transition: all 0.3s;

      &:hover {
        transform: scale(1.1);
      }
    }
  }

  &__logout {
    position: relative;
    display: flex;
    flex-direction: column;

    &-list {
      position: absolute;
      display: flex;
      flex-direction: column;
      transition: all 0.3s;
      background-color: #2a7afc;
      list-style: none;
      gap: 1rem;
      text-align: center;
      padding: 15px;
      border-radius: 1rem;
      top: 40px;
      right: 25px;

      li {
        cursor: pointer;
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
  padding: 0.625rem 1.25rem;
  border-radius: 1rem;
}

.log {
  width: 1.5rem;
}
</style>
