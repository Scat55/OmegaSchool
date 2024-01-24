<template>
  <div class="reg">
    <form action="#" class="reg__form no-scroll" @submit.prevent="handler">
      <p class="reg__form-title">Регистрация</p>

      <div class="reg__info">
        <span class="reg__info-name">Почта<span style="color: red">*</span></span>
        <input type="email" class="reg__input name" v-model.trim="email" />
      </div>
      <small class="activeClass" v-if="activeClass">Поле не должно быть пустым</small>
      <div class="reg__info">
        <span class="reg__info-name">Пароль<span style="color: red">*</span></span>
        <input type="password" class="reg__input" v-model.trim="pass" />
      </div>
      <small class="activeClass" v-if="activeClass">Пароль должен быть не меньше 8 символов</small>

      <button class="reg__form-btn" type="submit">Зарегистрироваться</button>
      <!-- <div>Укажите актуальную электронную почту, на которую будет выслано электронное письмо после нажатия кнопки "Регистрация"</div> -->
      <span style="font-size: 0.8rem"><span style="color: red">*</span> - обязательные поля</span>

      <span class="reg__auth">Войти</span>
    </form>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'AdminRegForm',
  data() {
    return {
      email: '',
      pass: '',
      activeClass: false,
    };
  },
  methods: {
    createAdmin() {
      const username = this.email;
      const password = this.pass;
      axios.post(
        `/commands/create_admin`,
        {
          username: username,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    },
    handler() {
      if (this.pass === '' || this.pass.length < 8 || this.email === '') {
        this.activeClass = true;
        return false;
      } else {
        this.activeClass = false;
        this.createAdmin();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../assets/styles/vars.scss';

.reg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  &__form {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.25rem;
    width: 26.5rem;
    height: 37.5rem;
    border: 2px solid $lightBlueColor;
    border-radius: 1rem;
    padding: 5.75rem;
    box-shadow: 0 0 20px 0px $accentColor;
    background-color: #fff;

    &-title {
      font-weight: bold;
      font-size: 1.3rem;
    }

    &-img {
      position: absolute;
      top: 1.25rem;
      right: 1.25rem;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        transform: rotate(-90deg);
      }
    }

    &-prof {
      width: 18rem;
      border: 1px solid $accentColor;
      border-radius: 0.5rem;
      padding: 0.625rem;
      font-family: Visitor;
      font-size: 1rem;
      outline: none;
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

  &__auth {
    cursor: pointer;
    color: $accentColor;
  }

  small {
    font-size: 0.65rem;
  }
}

.name {
  font-family: Visitor;
}

.activeClass {
  color: red;
  padding: 0;
}

.invalid {
  border: 1px solid red;
}

.gender {
  align-self: start;
  font-size: 0.8rem;
  padding: 0;
}
</style>
