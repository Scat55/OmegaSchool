<template>
  <div class="reg">
    <div class="container">

      <form
        action="#"
        class="reg__form"
        @submit.prevent="handler()"
      >
        <p class="reg__form-title">Вход</p>
        <div class="reg__info">
          <span class="reg__info-name ">Почта</span>
          <input
            type="email"
            class="reg__input name"
            v-model="email"
          >
        </div>
        <div class="reg__info">
          <span class="reg__info-name">Пароль</span>
          <input
            type="password"
            class="reg__input"
            v-model="pass"
          >
        </div>

        <button
          class="reg__form-btn"
          type="submit"
        >Войти</button>

      </form>


    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      email: '',
      pass: '',
    }
  },
  computed: {
    ...mapGetters(['USERS'])
  },
  methods: {
    ...mapActions(['GET_USERS_FROM_API']),
    // Проверка на наличие пользователя и вход
    chekUsers() {
      const email = this.email;
      const password = this.pass;

      axios.post('/checkUser', {
        email: email,
        password: password
      })
        .then(response => {
          if (response.data.message === 'Пользователь не найден') {
            alert(response.data.message)
            this.email = this.pass = ''
          } else {
            axios.get(`/getUserIdForMail/${this.email}`).then(response => {
              console.log(response.data.user_id)
              this.$router.push(`/profile/${response.data.user_id}`)
              this.$store.state.isAuth = !this.$store.state.isAuth
            })
          }


          // console.log(response.data.message)
        })
    },
    // Обработка формы
    handler() {
      // console.log(`${this.email}, ${this.pass}`)
      this.chekUsers()
    }
  },
  mounted() {

    this.GET_USERS_FROM_API()

  },
}

</script>

<style lang="scss" scoped>
@import '../assets/styles/vars.scss';

.reg {
  display: flex;
  align-items: center;
  justify-content: center;
  // height: 100vh;
  background-color: #C7FDFF;

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


}

.name {
  font-family: Visitor;
}
</style>