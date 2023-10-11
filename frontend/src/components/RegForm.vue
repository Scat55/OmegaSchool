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

        <div class="reg__info">
          <span class="reg__info-name ">Почта</span>
          <input
              type="email"
              class="reg__input name"
              v-model.trim="email"
          >
        </div>
        <small
            v-if="activeClass"
            class="activeClass"
        >Поле не должно быть пустым</small>
        <div class="reg__info">
          <span class="reg__info-name">Пароль</span>
          <input
              type="password"
              class="reg__input"
              v-model.trim="pass"
          >
        </div>
        <small
            v-if="activeClass"
            class="activeClass"
        >Пароль должен быть не меньше 8 символов</small>

        <!--TODO: вот недоделанные селекты-->
        <select
            name="gender"
            id="gender"
            class="reg__form-prof"
            v-model="gender.name"
        >
          <option
              disabled
              class="reg__from-option">
            Ваш пол
          </option>

          <option
              class="reg__from-option">
            Мужской
          </option>
          <option
              class="reg__from-option">
            Женский
          </option>
        </select>

        <select
            name="proffesion"
            id="proffesion"
            class="reg__form-prof"
            v-model="proffesion.name"
        >
          <option disabled>
            Ваш статус
          </option>
          <option>
            Ученик
          </option>

          <option>
            Учитель
          </option>
        </select>

        <button
            class="reg__form-btn"
            type="submit"
        >Зарегестрироваться
        </button>
        <p>Есть аккаут? <span class="reg__auth"> Войти</span></p>
      </form>


    </div>
  </div>
</template>

<script>

import axios from 'axios';

export default {

  data() {

    return {
      pass: '',
      email: '',
      proffesion: [{id: 0, name: 'Ученик'}, {id: 1, name: 'Учитель'}],
      gender: [{id: 0, name: 'Мужской'}, {id: 1, name: 'Женский'}],
      activeClass: false
    }
  },

  methods: {
    changeStatusOnFalse() {
      const body = document.querySelector('body')
      this.$store.state.status = false
      body.style.overflow = ""
    },
    // Проверка и добавление пользователя
    changeUserList() {
      const email = this.email
      const pass = this.pass
      const gender = this.gender.name
      const type_user = this.proffesion.name

      axios.post('/addUser', {
        email: email,
        password: pass,
        gender: gender,
        type_user: type_user
      }).then(response => {
        if (response.data.masage) {
          const body = document.querySelector('body')
          this.$store.state.status = false
          body.style.overflow = ""
          this.$router.push('/auth')
          alert('Пользователь с таким email уже существует')
        } else {
          const body = document.querySelector('body')
          this.$store.state.status = false
          body.style.overflow = ""
          this.$router.push('/auth')
        }
      })

          .catch(function (error) {
            console.log(error);
          });

    },
    // Обработка формы
    handler() {
      console.log(`${this.email}, ${this.pass}, ${this.proffesion.name}, ${this.gender.name}`)
<<<<<<< Updated upstream

      if (this.pass === '' || this.pass.length < 8 || this.email === '') {
        this.activeClass = true
        return false
      } else {
        this.activeClass = false
        this.changeUserList()
      }
    }
  }
}
</script> 
=======
    }
    //   if (this.pass === '' || this.pass.length < 8 || this.email === '') {
    //     this.activeClass = true
    //     return false
    //   }
    //   else {
    //     this.activeClass = false
    //     this.changeUserList()
    //   }
    // }

  }
  ,mounted() {
    const selectGender = document.querySelector('#gender');
    selectGender.selectedIndex = 0;

    const selectProffesion = document.querySelector('#proffesion');
    selectProffesion.selectedIndex = 0;


  }
}
</script>
>>>>>>> Stashed changes

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
      padding: .625rem;
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

.proffesion {
  align-self: start;
  font-size: 0.8rem;
  padding: 0;
}
</style>
