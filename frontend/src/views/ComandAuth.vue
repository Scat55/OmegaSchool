<template>
  <div class="comand">
    <div class="container">
      <form action="#" class="comand__form" @submit.prevent="handler()">
        <p class="comand__form-title">Регистрация команды</p>
        <div class="comand__info">
          <span class="comand__info-name">Почта</span>
          <input type="email" class="comand__input name" v-model="email" />
        </div>
        <div class="comand__info">
          <span class="comand__info-name">Пароль</span>
          <input type="password" class="comand__input" v-model="pass" />
        </div>

        <div class="comand__people">
          <span class="comand__people-name">Участники</span>
          <select name="" id="comand__select">
            <option id="comand__option" v-for="user in users" :key="user.id">
              {{ user.name }}
            </option>
          </select>
        </div>

        <button class="comand__form-btn" type="submit">Регистрация</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      pass: '',
      token: '',
      userID: '',
      users: [
        { name: 'Коля', email: '111@mail.ru', id: 0 },
        { name: 'Дима', email: '123@mail.ru', id: 1 },
        { name: 'Саня', email: '134@mail.ru', id: 2 },
        { name: 'Леха', email: '145@mail.ru', id: 3 },
        { name: 'Никитос', email: '156@mail.ru', id: 4 },
      ],
    };
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
    height: 32.5rem;
    margin-top: 2rem;
    border: 2px solid $lightBlueColor;
    border-radius: 1rem;
    padding: 5.75rem;
    box-shadow: 0 0 20px 0px $accentColor;
    background-color: #fff;

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
    }
  }
}

.name {
  font-family: Visitor;
}
#comand__select {
  border: none;
  outline: none;
  font-size: 1rem;
}

#comand__option {
  font-size: 1rem;
}
</style>
