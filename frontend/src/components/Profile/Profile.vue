<script setup>

</script>

<script>
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
      }
    }
  },
}
</script>

<template>

  <div class="main">
    <div class="date_person_fio">
      <div class="name"><p>Имя:</p>
        <input type="text" class="InputChangeNO" v-bind:value="person.name" :disabled="!edit"></div>
      <div class="lastName">
        <p>Фамилия:</p>
        <input type="text" class="InputChangeNO" v-bind:value="person.lastname" :disabled="!edit">
      </div>
      <div class="patronymic">
        <p>Отчество:</p>
        <input type="text" class="InputChangeNO" v-bind:value="person.patronymic" :disabled="!edit">
      </div>
    </div>

    <div class="date_person_birthday_gender">
      <p>Дата рождения {{ person.birthday }}</p>
      <p>Пол: {{person.gender}}</p>
    </div>

    <div class="date_person_class">
      <div v-if="person.student === true"><label>Класс</label>&nbsp;<input class="InputChangeNO" type="text" :disabled="!edit" :value="person.class"></div>
      <label v-if="person.student === false">Учитель по</label>&nbsp;<input class="InputChangeNO" type="text" :disabled="!edit" :value="person.item">
    </div>

    <div class="date_person_email">
      <p>Почта {{ person.email }}</p>
    </div>

    <div class="change_profile">
      <div class="change_password" v-if="edit === false">
        <button v-if="changeDate.changePass === false" @click="changeDate.changePass = true">Изменить пароль</button>
        <div v-if="changeDate.changePass === true">
          <label>Введите пароль</label><input type="password"><br>
          <label>Введите новый</label><input type="password"><br>
          <label>повторите новый пароль</label><input type="password"><br>
          <button>Подтвердить изменение</button>
          <button @click="changeDate.changePass = false">Отмена</button>
        </div>
      </div>
      <div class="edit_profile" v-if="changeDate.changePass === false">
        <button @click="edit = true" v-if="edit === false">Изменить профиль</button>
        <button v-show="edit === true" @click="edit = false">Подтвердить изменения</button>
        <button v-show="edit === true" @click="edit = false">Отмена изменения</button>
      </div>
    </div>

  </div>

</template>

<style scoped lang="scss">
//@import '../../assets/styles/styles';

.main {
  font-size: 25px;
  padding: 25px;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(5, 1fr);
  overflow-y: auto;
  overflow-x: hidden;
}

.InputChangeNO {
  color: black;
  background: none;
  border: none;
  //font-family: Visitor;
  font-size: 25px;
}

.date_person_fio {
  grid-row: 1 / span 1;
  grid-column: 1 / span 1;
}

.date_person_fio div {
  margin-bottom: 15px;
}

.date_person_birthday {
  grid-row: 2 / span 1;
  grid-column: 1 / span 1;
}

.date_person_class {
  grid-row: 3 / span 1;
  grid-column: 1 / span 1;
}

.date_person_email {
  grid-row: 4 / span 1;
  grid-column: 1 / span 1;
}

.change_profile {
  grid-row: 5 / span 1;
  grid-column: 1 / span 1;
}
</style>