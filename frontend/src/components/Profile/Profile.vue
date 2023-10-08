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
  }
}
</script>

<template>

  <div class="main">
    <div class="avatar">
      <img src="../../assets/images/Avatar/boy.png" alt="Аватарка">
    </div>
    <div class="date_person_fio">
      <div class="name"><label>Имя:</label>&nbsp;
        <input type="text" :class="{'InputChangeNO': !edit, 'InputChange' : edit}" v-bind:value="person.name" :disabled="!edit"></div>
      <div class="lastName">
        <label>Фамилия:</label>&nbsp;
        <input type="text" :class="{'InputChangeNO': !edit, 'InputChange' : edit}" v-bind:value="person.lastname" :disabled="!edit">
      </div>
      <div class="patronymic">
        <label>Отчество:</label>&nbsp;
        <input type="text" :class="{'InputChangeNO': !edit, 'InputChange' : edit}" v-bind:value="person.patronymic" :disabled="!edit">
      </div>
    </div>


    <div class="date_person_birthday_gender">
      <p>Дата рождения {{ person.birthday }}</p>
      <p>Пол: {{ person.gender }}</p>
    </div>

    <div class="date_person_class">
      <div v-if="person.student === true">
        <label>Класс</label>&nbsp;
        <input :class="{'InputChangeNO': !edit, 'InputChange' : edit}"
               type="text"
               :disabled="!edit"
               :value="person.class">
      </div>
      <div v-if="person.student === false">
        <label>Учитель по</label>&nbsp;
        <input :class="{'InputChangeNO': !edit, 'InputChange' : edit}"
               type="text"
               :disabled="!edit"
               :value="person.item">
      </div>
    </div>

    <div class="date_person_email">
      <p>Почта {{ person.email }}</p>
    </div>

    <div class="change_profile">
      <div class="change_password" v-if="edit === false">
        <button v-if="changeDate.changePass === false" @click="changeDate.changePass = true" class="editBtn">Изменить пароль</button>
        <div v-if="changeDate.changePass === true">
          <label>Введите пароль</label><input type="password"><br>
          <label>Введите новый</label><input type="password"><br>
          <label>повторите новый пароль</label><input type="password"><br>
          <button class="editBtn">Подтвердить изменение</button>
          <button @click="changeDate.changePass = false" class="editBtn">Отмена</button>
        </div>
      </div>
      <div class="edit_profile" v-if="changeDate.changePass === false">
        <button @click="edit = true" v-if="edit === false" class="editBtn">Изменить профиль</button>
        <button v-show="edit === true" @click="edit = false" class="editBtn">Подтвердить изменения</button>
        <button v-show="edit === true" @click="edit = false" class="editBtn">Отмена изменения</button>
      </div>
    </div>

  </div>

</template>

<style scoped lang="scss">


.main {
  font-size: 2rem;
  width: 100%;
  height: 100%;
  padding: 25px;
  display: flex;
  flex-direction: column;
}

.InputChangeNO {
  color: black;
  background: none;
  border: none;
  font-size: 2rem;
  font-family: Visitor,sans-serif;
}

.InputChange {
  color: black;
  background: none;
  border: none;
  font-size: 2rem;
  font-family: Visitor,sans-serif;
  border-bottom: 1px solid black;
}

.avatar img {
  height: 15rem;
  border: 2px solid white;
  border-radius: 1rem;
}

.change_profile {
  margin-top: 15rem;
}

.editBtn {
  background: white;
  padding: 10px;
  margin: 5px;
  border-radius: 1.5rem;
  border: 2px solid black;
  box-shadow: 2px 2px 4px black;
}
</style>