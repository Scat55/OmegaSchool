<script>
import axios from 'axios';
export default {
  props: {
    person: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      edit: false,
      // Переменая отвечает за редактирование, надо реализовать кнопку редактировать профиль. Инпуты в обычной состояние сделать не изменяемые и чтобы не выделялись. Но при нажатии на кнопку они сразу будут доступные.
      changeDate: {
        changeName: false,
        changeLastName: false,
        changePatronymic: false,
        changeBirthDay: false,
        changeClass: false,
        changePass: false,
      },
      token: ''
    }
  },
  methods: {
    //  TODO: сделать запрос на изменение данных
    changeInfoAboutUSer(){
      this.edit = false
       console.log('Изменить данные')
      this.token = JSON.parse(localStorage.getItem('local'))
      axios('/api/addition_data', {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${this.token.token}`,
          'Content-Type': 'application/json'
        },
        body: {
          first_name: this.person.name
        }
      })
    },
  },
  mounted() {
    console.log(this.person.item)
  }
}
</script>

<template>
  <div class="main">
    <div class="avatar">
      <img v-if="person.gender === 'Мужской' "
        src="../../assets/images/Avatar/boy.png"
        alt="Аватарка"
      >
      <img v-else
           src="../../assets/images/Avatar/girl (3).png"
           alt="Аватарка"
      >
    </div>
    <div class="date_person_fio">
      <div class="name"><label>Имя:</label>&nbsp;
        <!-- <div v-html="htmlContent"></div> -->
        <input
          type="text"
          :class="{ 'InputChangeNO': !edit, 'InputChange': edit }"
          :disabled="!edit"
          v-model="person.name"
        >
      </div>
      <div class="lastName">
        <label>Фамилия:</label>&nbsp;
        <input
          type="text"
          :class="{ 'InputChangeNO': !edit, 'InputChange': edit }"
          :disabled="!edit"
          v-model="person.lastname"
        >
      </div>
      <div class="patronymic">
        <label>Отчество:</label>&nbsp;
        <input
          type="text"
          :class="{ 'InputChangeNO': !edit, 'InputChange': edit }"
          :disabled="!edit"
          v-model="person.patronymic"
        >
      </div>
    </div>


    <div class="date_person_birthday_gender">
      <!--      <p>Дата рождения {{ person.birthday }}</p>-->
      <p>Пол: {{ person.gender }}</p>
    </div>

    <div class="date_person_class">
      <div v-if="person.student === true">
        <label>Класс</label>&nbsp;
        <input
          :class="{ 'InputChangeNO': !edit, 'InputChange': edit }"
          type="text"
          :disabled="!edit"
          :value="person.class"
        >
      </div>
      <div v-if="person.student === false">
        <label>Учитель по</label>&nbsp;
        <input
          :class="{ 'InputChangeNO': !edit, 'InputChange': edit }"
          type="text"
          :disabled="!edit"
          v-model="person.item"
        >
      </div>
    </div>

    <div class="date_person_email">
      <p>Почта {{ person.email }}</p>
    </div>

    <div class="change_profile">
      <div
        class="change_password"
        v-if="edit === false"
      >
        <button
          v-if="changeDate.changePass === false"
          @click="changeDate.changePass = true"
          class="editBtn"
        >Изменить пароль</button>
        <div v-if="changeDate.changePass === true">
          <label>Введите пароль</label><input type="password"><br>
          <label>Введите новый</label><input type="password"><br>
          <label>повторите новый пароль</label><input type="password"><br>
          <button class="editBtn">Подтвердить изменение</button>
          <button
            @click="changeDate.changePass = false"
            class="editBtn"
          >Отмена</button>
        </div>
      </div>
      <div
        class="edit_profile"
        v-if="changeDate.changePass === false"
      >
        <button
          @click="edit = true"
          v-if="edit === false"
          class="editBtn"
        >Изменить профиль</button>
        <button
          v-show="edit === true"
          @click="changeInfoAboutUSer()"
          class="editBtn"
        >Подтвердить изменения</button>
        <button
          v-show="edit === true"
          @click="edit = false"
          class="editBtn"
        >Отмена изменения</button>
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
@import '../../assets/styles/vars';
.flexDiv {
  display: flex;
}

.main {
  font-size: 2rem;
  width: 100%;
  height: 100%;
  //padding: 25px;
  //display: flex;
  //flex-direction: column;
  //flex-wrap: wrap;
}

.InputChangeNO {
  color: black;
  background: none;
  border: none;
  font-size: 2rem;
  font-family: Visitor, sans-serif;
  outline: none;
}

.InputChange {
  color: black;
  background: #fff;
  border: none;
  font-size: 2rem;
  width: 50%;
  font-family: Visitor, sans-serif;
  border-bottom: 1px solid black;
  outline: none;
  border-radius: 0.5rem;
  padding: 3px;
}

.avatar {
  display: inline-block;
  //align-self: flex-end;
  margin-bottom: 2rem;
  //width: 100%;

  &>img {
    border: 2px solid white;
    border-radius: 1rem;
    width: 30%;
  }
}

.change_profile {
  margin-top: 1rem;
  display: flex;
}

.editBtn {
  background: #fff;
  padding: 10px;
  margin: 5px;
  border-radius: 1.5rem;
  border: 1px solid $accentColor;
  cursor: pointer;
  transition: all .3s;

  &:hover{
    background-color: #c7fdff;
  }
}
.date_person_fio{
  justify-self: flex-end;
}
</style>