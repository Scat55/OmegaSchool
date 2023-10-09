<template>
  <div class="reg ">
    <div class="container">
      <form
        action="#"
        class="reg__form no-scroll"
        @submit.prevent="handler()"
      >
        <p class="reg__form-title">Регистрация</p>
        <img
          src="../assets/images/closeForm.png"
          alt="CloseForm"
          class="reg__form-img"
          @click="changeStatusOnFalse()"
        >

        <div
          class="reg__info"
          :class="{ invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email) }"
        >
          <span class="reg__info-name ">Почта</span>
          <input
            type="email"
            class="reg__input name"
            v-model.trim="email"
          >
        </div>
        <small
          v-if="$v.email.$dirty && !$v.email.required"
          class="activeClass"
        >Поле не должно быть пустым</small>
        <small
          v-else-if="$v.email.$dirty && !$v.email.email"
          class="activeClass"
        >Введите валидную почту</small>
        <div
          class="reg__info"
          :class="{ invalid: ($v.pass.$dirty && !$v.pass.required) || ($v.pass.$dirty && !$v.pass.minLength) }"
        >
          <span class="reg__info-name">Пароль</span>
          <input
            type="password"
            class="reg__input"
            v-model.trim="pass"
          >
        </div>
        <small
          v-if="$v.pass.$dirty && !$v.pass.required"
          class="activeClass"
        >Введите пароль</small>
        <small
          v-else-if="$v.pass.$dirty && !$v.pass.minLength"
          class="activeClass"
        >Пароль должен быть не меньше 8 символов</small>

        <span>Пол</span>
        <select
          name="gender"
          id="gender"
          class="reg__form-prof"
          v-model="gender.name"
        >
          <option
            class="reg__from-option"
            v-for="gender in gender"
            :value="gender.name"
          >
            {{ gender.name }}
          </option>
        </select>


        <span>Учитель / Ученик</span>
        <select
          name="proffesion"
          id="proffesion"
          class="reg__form-prof"
          v-model="proffesion.name"
        >
          <option
            class="reg__from-option"
            v-for="prof in proffesion"
            :value="prof.name"
          >
            {{ prof.name }}
          </option>
        </select>

        <button
          class="reg__form-btn"
          type="submit"
        >Зарегестрироваться</button>
        <p>Есть аккаут? <span class="reg__auth"> Войти</span> </p>
      </form>


    </div>
  </div>
</template>

<script>
import { email, minLength, required } from 'vuelidate/lib/validators';
import axios from 'axios';

export default {
  validations: {

    pass: { required, minLength: minLength(8) },
    email: { email, required }

  },
  data() {

    return {
      pass: '',
      email: '',
      proffesion: [{ id: 0, name: 'Ученик' }, { id: 1, name: 'Учитель' }],
      gender: [{ id: 0, name: 'Мужской' }, { id: 1, name: 'Женский' }],
      activeClass: false
    }
  },

  methods: {
    changeStatusOnFalse() {
      const body = document.querySelector('body')
      this.$store.state.status = false
      body.style.overflow = ""
    },
    changeUserList() {
      const email = this.email
      const pass = this.pass
      // console.log(email)
      axios.post('/checkUser', {
        email: email,
        password: pass

      })
        .then(function (response) {
          console.log(email, pass)
          alert(response.data.message);
          if (email && pass) {
            return true
          }
          else {
            return false
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    handler() {
      // if (this.$v.$invalid) {

      //   this.$v.$touch()

      //   return
      // } else {

      // }

      this.changeUserList()

      // console.log(typeof this.email)
    }
  },
}
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
  background-color: rgba(0, 0, 0, 0.3);


  &__form {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.25rem;
    width: 25.5rem;
    height: 32.5rem;
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
      transition: all .3s;

      &:hover {
        transform: rotate(-90deg);
      }
    }

    &-prof {
      width: 18rem;
      border: 1px solid $accentColor;
      border-radius: 0.5rem;
      padding: .625rem 1.25rem;
      font-family: Visitor;
      font-size: 1rem;
      outline: none;
    }

    &-btn {
      padding: .625rem;
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
    padding: .625rem 1.25rem;

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
}

.invalid {
  border: 1px solid red;
}
</style>
