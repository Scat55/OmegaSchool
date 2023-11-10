<script>
import axios from 'axios';
import Button from '@/UI/Button.vue';

export default {
  components: { Button },
  props: {
    person: {
      type: Object,
      required: true,
    },
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
      token: '',
      oldPass: '',
      newPass: '',
      repeatNewPass: '',
    };
  },
  methods: {
    changeInfoAboutUSer() {
      this.edit = false;
      this.token = JSON.parse(localStorage.getItem('local'));

      const first_name = this.person.name;
      const last_name = this.person.lastname;
      const patronymic = this.person.patronymic;
      const item = this.person.item;
      const classes = this.person.class;
      const birthdate = this.person.birthday;
      axios.post(
        '/api/addition_data',
        {
          first_name: first_name,
          last_name: last_name,
          patronymic: patronymic,
          classes: classes,
          item: item,
          birthdate: birthdate,
        },
        {
          headers: {
            Authorization: `Bearer ${this.token.token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(this.person.class);
    },
    changePass() {
      if (
        this.newPass.length >= 8 &&
        this.repeatNewPass.length >= 8 &&
        this.newPass === this.repeatNewPass
      ) {
        alert('Пароль успешно изменен');
        this.changeDate.changePass = false;
        console.log(this.repeatNewPass);
        this.newPass = this.repeatNewPass = '';
      }
      if (this.newPass.length < 8 && this.repeatNewPass.length < 8) {
        alert('Пароль не должен быть меньше 8 символов');
      }
      if (this.newPass !== this.repeatNewPass) {
        alert('Пароль несовпадают');
      }
    },
  },
};
</script>

<template>
  <div class="main">
    <div class="avatar">
      <div class="avatar__info">
        <img
          v-if="person.gender === 'Мужской'"
          src="../../assets/images/Avatar/boy.png"
          alt="Аватарка"
        />
        <img
          v-if="person.gender === 'Женский'"
          src="../../assets/images/Avatar/girl (3).png"
          alt="Аватарка"
        />
        <p v-if="person.gender === ''">Загрузка аватара...</p>
      </div>
      <div class="level" v-if="person.level !== null">
        <p class="level__text">Уровень</p>
        <span class="level__info"> - {{ person.level }}</span>
      </div>
    </div>

    <div class="date_person_fio">
      <div class="name">
        <label>Имя:</label>&nbsp;
        <!-- <div v-html="htmlContent"></div> -->
        <input
          type="text"
          :class="{ InputChangeNO: !edit, InputChange: edit }"
          :disabled="!edit"
          v-model="person.name"
        />
      </div>
      <div class="lastName">
        <label>Фамилия:</label>&nbsp;
        <input
          type="text"
          :class="{ InputChangeNO: !edit, InputChange: edit }"
          :disabled="!edit"
          v-model="person.lastname"
        />
      </div>
      <div class="patronymic">
        <label>Отчество:</label>&nbsp;
        <input
          type="text"
          :class="{ InputChangeNO: !edit, InputChange: edit }"
          :disabled="!edit"
          v-model="person.patronymic"
        />
      </div>
    </div>

    <div class="date_person_birthday_gender">
      <p>Пол: {{ person.gender }}</p>
      <div v-if="edit" class="input-container">
        <label>Дата рождения:</label>&nbsp;
        <input type="date" class="styled-input" v-model="person.birthday" />
      </div>
      <p v-if="!edit">Дата рождения: {{ person.birthday }}</p>
    </div>

    <div class="date_person_class">
      <div v-if="person.student === true">
        <label>Класс: </label>&nbsp;
        <input
          :class="{ InputChangeNO: !edit, InputChange: edit }"
          type="text"
          :disabled="!edit"
          v-model="person.class"
        />
      </div>
      <div v-if="person.student === false">
        <label>Учитель по</label>&nbsp;
        <input
          :class="{ InputChangeNO: !edit, InputChange: edit }"
          type="text"
          :disabled="!edit"
          v-model="person.item"
        />
      </div>
    </div>

    <div class="date_person_email">
      <p>Почта {{ person.email }}</p>
    </div>

    <div class="change_profile">
      <div class="change_password" v-if="edit === false">
        <button
          v-if="changeDate.changePass === false"
          @click="changeDate.changePass = true"
          class="editBtn"
        >
          Изменить пароль
        </button>
        <div v-if="changeDate.changePass === true" class="passwords">
          <label>Введите пароль</label><input type="password" class="passwords__pass" />
          <label>Введите новый</label
          ><input type="password" class="passwords__pass" v-model="newPass" />
          <label>повторите новый пароль</label
          ><input type="password" class="passwords__pass" v-model="repeatNewPass" />
          <button class="editBtn" @click="changePass()">Подтвердить изменение</button>
          <button @click="changeDate.changePass = false" class="editBtn">Отмена</button>
        </div>
      </div>
      <div class="edit_profile" v-if="changeDate.changePass === false">
        <button @click="edit = true" v-if="edit === false" class="editBtn">Изменить профиль</button>
        <button v-show="edit === true" @click="changeInfoAboutUSer()" class="editBtn">
          Подтвердить изменения
        </button>
        <button v-show="edit === true" @click="edit = false" class="editBtn">
          Отмена изменения
        </button>
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
  line-height: 140%;
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
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  //width: 100%;
}
.avatar__info {
  width: 60%;
  & > img {
    border: 2px solid white;
    border-radius: 1rem;
    width: 30%;
  }
}
.input-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.styled-input {
  padding: 8px 12px;
  border: 1px solid #c7fdff;
  border-radius: 4px;
  font-size: 1.1rem;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;

  &:focus {
    outline: none;
    border-color: $accentColor;
    box-shadow: 0 0 5px rgba(199, 253, 255, 0.5);
  }

  &:hover {
    border-color: darken($accentColor, 10%);
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
  transition: all 0.3s;

  &:hover {
    background-color: #c7fdff;
  }
}

.date_person_fio {
  justify-self: flex-end;
}

.passwords {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__pass {
    width: 13rem;
    padding: 0.5rem;
    border: none;
    outline: none;
    border-radius: 1rem;
    font-size: 1.1rem;
  }
}
button {
  font-family: Visitor;
}
.level {
  font-size: 0.8rem;
  &__text {
    display: inline-block;
  }
}
</style>
