<!-- Регистрация команды -->
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
          <span class="comand__info-name">Почта</span>
          <input type="email" class="comand__input" v-model="email" />
        </div>
        <div class="comand__info">
          <span class="comand__info-name">Пароль</span>
          <input type="password" class="comand__input" v-model="pass" />
        </div>
        <div class="comand__info">
          <span class="comand__info-name">Школа</span>
          <select class="comand__input" v-model="school">
            <option v-for="item in listSchool" :key="item.schoolName" :value="item.schoolName">
              {{ item.schoolName }}
            </option>
          </select>
        </div>

        <button class="comand__form-btn" type="submit">Регистрация</button>
        <router-link to="/authCom" class="router">
          <p class="comand__add auth">Уже есть команда? Войти</p>
        </router-link>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      comandName: '',
      pass: '',
      token: '',
      email: '',
      userID: '',
      lenghtUsers: 0,
      userName: '',
      school: '',
      users: [],
      listSchool: [
        { schoolName: 'МБОУ «Гимназия №1» г. Липецка' },
        { schoolName: 'МБОУ СШ № 2 г. Липецка' },
        { schoolName: 'МБОУ «Лицей №3 им. К.А. Москаленко» г. Липецка' },
        { schoolName: 'МБОУ СОШ № 4 г. Липецка' },
        { schoolName: 'МБОУ СШ № 5 города Липецка' },
        { schoolName: 'МБОУ "Школа № 6" г. Липецка' },
        { schoolName: 'МБОУ СОШ № 7 г. Липецка' },
        { schoolName: 'МБОУ СШ № 8 г. Липецка' },
        { schoolName: 'МБОУ СШ № 9 им. М.В. Водопьянова г. Липецка' },
        { schoolName: 'МБОУ СШ № 10 г. Липецка' },
        { schoolName: 'МБОУ СОШ № 11 г. Липецка' },
        { schoolName: 'МБОУ гимназия № 12 города Липецка' },
        { schoolName: 'МБОУ СШ № 14 г. Липецка' },
        { schoolName: 'МАОУ СШ № 15 г. Липецка' },
        { schoolName: 'МБОУ № 16 г. Липецка' },
        { schoolName: 'МАОУ СОШ № 17 г. Липецка' },
        { schoolName: 'МАОУ СОШ № 18 г. Липецка' },
        { schoolName: 'МБОУ гимназия №19 г. Липецка' },
        { schoolName: 'МАОУ СОШ № 20 г. Липецка' },
        { schoolName: 'МБОУ СШ № 21 города Липецка' },
        { schoolName: 'МБОУ ООШ № 22 г. Липецка' },
        { schoolName: 'МАОУ СОШ № 23 г. Липецка' },
        { schoolName: 'МБОУ СОШ № 24 им. М.Б. Раковского г. Липецка' },
        { schoolName: 'МБОУ ОШ № 25 г. Липецка' },
        { schoolName: 'МАОУ школа информационных технологий № 26 г. Липецка' },
        { schoolName: 'МАОУ Инженерно-Технологическая Школа № 27 Города Липецка' },
        { schoolName: 'МБОУ СШ № 28 г. Липецка' },
        { schoolName: 'МАОУ СОШ № 29 г. Липецка' },
        { schoolName: 'МАОУ СШ № 30 г. Липецка' },
        { schoolName: 'МБОУ СШ № 31 г. Липецка' },
        { schoolName: 'МБОУ № 32 г. Липецка' },
        { schoolName: 'МБОУ СШ № 33 г. Липецка' },
        { schoolName: 'МАОУ СШ № 34 г. Липецка' },
        { schoolName: 'МБОУ СШ № 35 г. Липецка' },
        { schoolName: 'МБОУ СОШ № 36 г. Липецка' },
        { schoolName: 'МБОУ СШ № 37 г. Липецка' },
        { schoolName: 'МБОУ СШ № 38 г. Липецка' },
        { schoolName: 'МБОУ СОШ № 40 г. Липецка' },
        { schoolName: 'МБОУ СШ № 41 города Липецка' },
        { schoolName: 'МБОУ СШ № 42 г. Липецка' },
        { schoolName: 'МАОУ "Лицей 44" г. Липецка' },
        { schoolName: 'МБОУ СШ № 45 г. Липецка' },
        { schoolName: 'МБОУ СОШ № 46 г. Липецка' },
        { schoolName: 'МБОУ СОШ № 47 г. Липецка' },
        { schoolName: 'МАОУ СШ № 48 г. Липецка' },
        { schoolName: 'МБОУ СОШ № 49 г. Липецка' },
        { schoolName: 'МБОУ СОШ № 50 г. Липецка' },
        { schoolName: 'МАОУ СШ № 51 г. Липецка' },
        { schoolName: 'МБОУ СШ № 52 г. Липецка' },
        { schoolName: 'МБОУ СШ № 54 г. Липецка' },
        { schoolName: 'МАОУ СШ № 55 г. Липецка "Лингвист"' },
        { schoolName: 'МАОУ СШ № 59 "Перспектива" г. Липецка' },
        { schoolName: 'МАОУ СШ № 60 г. Липецка' },
        { schoolName: 'МБОУ СШ № 61' },
        { schoolName: 'МБОУ СШ № 62 г. Липецка' },
        { schoolName: 'МБОУ СШ № 63 г. Липецка' },
        { schoolName: 'МБОУ «Гимназия № 64» города Липецка' },
        { schoolName: 'МБОУ «СМШ № 65 «Спектр» г. Липецка' },
        { schoolName: 'МБОУ лицей № 66 г. Липецка' },
        { schoolName: 'МБОУ СШ № 68 города Липецка' },
        { schoolName: 'МАОУ гимназия № 69 г. Липецка' },
        { schoolName: 'МБОУ СШ № 70 г. Липецка' },
        { schoolName: 'МБОУ СШ № 72 г. Липецка' },
        { schoolName: 'МБОУ СОШ № 77 г. Липецка' },
        { schoolName: 'МБОУ СШ ОО ЗЗ № 2 г. Липецка' },
        { schoolName: 'МБОУ СШ ОО ЗЗ № 1 г. Липецка' },
        { schoolName: 'МБОУ ВСШ № 11 г. Липецка' },
      ],
    };
  },
  methods: {
    handler() {
      axios
        .post(
          `/commands/create`,
          {
            comandName: this.comandName,
            password: this.pass,
            school: this.school,
            email: this.email,
          },
          {
            header: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then((res) => {
          console.log(res.data);
          localStorage.setItem('comandID', res.data.comandId);
          this.userID = localStorage.getItem('comandID');

          this.$router.push(`/authCom`);
        });

      // console.log(this.comandName, this.pass, users);
      //
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
    font-family: 'Visitor';
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

.auth {
  color: $accentColor;
}
</style>
