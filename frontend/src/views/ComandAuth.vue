<template>
  <div class="comand">
    <div class="container">
      <form action="#" class="comand__form" @submit.prevent="handler()">
        <p class="comand__form-title">Регистрация команды</p>

        <div class="comand__info">
          <span class="comand__info-name">Название команды</span>
          <input type="text" class="comand__input name" v-model="comandName" />
        </div>
        <div class="comand__info">
          <span class="comand__info-name">Пароль</span>
          <input type="password" class="comand__input" v-model="pass" />
        </div>
        <span class="comand__people-name">Участники</span>
        <div class="comand__people" v-for="user in users">
          <div>
            <input type="email" class="comand__input name" v-model="user.name" />
          </div>
        </div>
        <p class="comand__add" @click="addUsers" v-if="lenghtUsers !== 5">
          Добавить участника <span>+</span>
        </p>
        <button class="comand__form-btn" type="submit">Регистрация</button>
      </form>
    </div>
  </div>
</template>

<script>
import store from '../store/index';
export default {
  data() {
    return {
      comandName: '',
      pass: '',
      token: '',
      userID: '',
      lenghtUsers: 0,
      userName: '',
      users: [],
    };
  },
  methods: {
    addUsers() {
      this.lenghtUsers += 1;
      this.users.push({ name: this.userName });
      // this.userName = '';
    },
    handler() {
      const users = this.users.map((el) => {
        return el.name;
      });
      console.log(this.comandName, this.pass, users);
      store.state.isAuth = true;
      this.$router.push(`/comandPage`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/vars.scss';

.comand {
  display: flex;
  align-items: center;
  justify-content: center;
  // height: 100vh;
  background-color: #c7fdff;

  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.25rem;
    width: 25.5rem;
    height: 38.5rem;
    margin-top: 2rem;
    border: 2px solid $lightBlueColor;
    border-radius: 1rem;
    padding: 5.75rem;
    box-shadow: 0 0 20px 0px $accentColor;
    background-color: #fff;
    overflow-y: auto;
    overflow-x: hidden;

    &-title {
      font-weight: bold;
      font-size: 1rem;
      text-align: center;
    }

    &-btn {
      padding: 0.625rem;
      background-color: $lightBlueColor;
      color: $whiteColor;
      font-family: Visitor;
      border: none;
      border-radius: 0.5rem;
      letter-spacing: 0.15rem;
      cursor: pointer;

      &:hover {
        box-shadow: 0 0 20px 0px $accentColor;
      }
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    width: 18rem;
    border: 1px solid $accentColor;
    border-radius: 0.5rem;
    padding: 0.625rem 1.25rem;

    &-name {
      color: rgba(17, 17, 17, 0.49);
      font-size: 0.9rem;
    }
  }

  &__input {
    border: none;
    outline: none;
    background-color: transparent;
    font-size: 1rem;
  }

  &__people {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    width: 18rem;
    border: 1px solid $accentColor;
    border-radius: 0.5rem;
    padding: 0.625rem 1.25rem;

    &-name {
      color: rgba(17, 17, 17, 0.49);
      font-size: 0.9rem;
      justify-content: start;
    }
  }

  &__add {
    font-size: 0.6rem;
    justify-content: start;
    cursor: pointer;
  }
}

.name {
  font-family: Visitor;
}
</style>
