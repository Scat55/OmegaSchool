<!-- Вход команды -->
<template>
  <div class="authComm">
    <div class="container">
      <form action="#" class="authComm__form" @submit.prevent="handler()">
        <p class="authComm__form-title">Вход</p>
        <div class="authComm__info">
          <span class="authComm__info-name">Название команды</span>
          <input type="text" class="authComm__input name" v-model="commandName" />
        </div>
        <div class="authComm__info">
          <span class="authComm__info-name">Пароль</span>
          <input type="password" class="authComm__input" v-model="pass" />
        </div>

        <button class="authComm__form-btn" type="submit">Войти</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commandName: '',
      pass: '',
      token: '',
      userID: '',
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/vars.scss';
.authComm {
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
    height: 32.5rem;
    margin-top: 2rem;
    border: 2px solid $lightBlueColor;
    border-radius: 1rem;
    padding: 5.75rem;
    box-shadow: 0 0 20px 0px $accentColor;
    background-color: #fff;

    &-title {
      font-weight: bold;
      font-size: 1.3rem;
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
}

.name {
  font-family: Visitor;
}
</style>
