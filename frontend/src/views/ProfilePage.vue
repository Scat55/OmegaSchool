<template>
  <div>
    <div class="container">
      <div class="window">
        <div class="seeMenu" @click="ShowMenu = !ShowMenu" v-show="ShowMenu === false">Открыть меню</div>
        <div class="left_div" v-show="ShowMenu === true">
          <div class="tabs">
            <div
              class="tab"
              @click="switchTab('Profile')"
            >Профиль
            </div>
            <div
              class="tab"
              v-if="person.student === false"
              @click="switchTab('TaskToCheckStudent')"
            >Задачи на проверку ( от ученика )
            </div>
            <div
              class="tab"
              v-if="person.expert === true"
              @click="switchTab('TaskToCheckTeacher')"
            >Задачи на проверку ( от учителя )
            </div>
            <div
              class="tab"
              v-if="person.student === false"
              @click="switchTab('MyAddTask')"
            >Мои добавленные задачи
            </div>
            <div
              class="tab"
              v-if="person.student === false"
              @click="switchTab('AddTask')"
            >Добавить задачу
            </div>
            <div
              class="tab"
              v-if="person.student === true"
              @click="switchTab('AchivStud')"
            >Достижения
            </div>
            <div
              class="tab"
              v-if="person.student === false"
              @click="switchTab('RatingTeach')"
            >Рейтинг
            </div>
            <div
              class="tab"
              v-if="person.student === true"
              @click="switchTab('MySolvedTask')"
            >Мои решенные задачи
            </div>
            <div class="closeMenu" @click="ShowMenu = !ShowMenu">Закрыть меню</div>
          </div>
        </div>
        <div class="right_div">
          <Profile
            v-show="isActiveComponents.Profile === true"
            :person="person"
          />
          <AddTask v-show="isActiveComponents.AddTask === true" />
          <TaskToCheckStudent v-show="isActiveComponents.TaskToCheckStudent === true" />
          <TaskToCheckTeacher v-if="isActiveComponents.TaskToCheckTeacher === true" />
          <MySolvedTask v-show="isActiveComponents.MySolvedTask === true" />
          <MyAddTask v-show="isActiveComponents.MyAddTask === true" />
          <AchivmentStudent :grades="person.grades" :achievements="person.achievements" v-show="isActiveComponents.AchivStud === true" />
          <RatingTeacher v-show="isActiveComponents.RatingTeach === true" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Profile from "@/components/Profile/Profile.vue";
import AchivmentStudent from "@/components/Profile/AchivmentStudent.vue";
import RatingTeacher from "@/components/Profile/RatingTeacher.vue";
import MyAddTask from "@/components/Profile/MyAddTask.vue";
import MySolvedTask from "@/components/Profile/MySolvedTask.vue";
import TaskToCheckStudent from "@/components/Profile/TaskToCheckStudent.vue";
import TaskToCheckTeacher from "@/components/Profile/TaskToCheckTeacher.vue";
import AddTask from "@/components/Profile/AddTask.vue";
import store from '../store/index';
import { format} from "date-fns";

import axios from 'axios'
export default {
  components: {
    AddTask,
    TaskToCheckTeacher,
    TaskToCheckStudent,
    MySolvedTask,
    MyAddTask,
    Profile,
    AchivmentStudent,
    RatingTeacher,
  },
  data() {
    return {
      person: {
        // avatar: '',
        name: '',
        lastname: '',
        patronymic: '',
        birthday: '',
        gender: "",
        student: null, // переключатель вкладок
        class: '11',
        item: '',
        email: '',
        expert: null,
        grades: '',
        achievements: ''
      },
      isActiveComponents: {
        Profile: true,
        TaskToCheckStudent: false,
        TaskToCheckTeacher: false,
        AchivStud: false,
        RatingTeach: false,
        MyAddTask: false,
        MySolvedTask: false,
        AddTask: false,
      },
      ShowMenu: false
      // id: this.$router.currentRoute.params['id'],
      // token: localStorage.getItem('token'),
    }
  },
  methods: {
    switchTab(nameTab) {
      for (const key in this.isActiveComponents) {
        this.isActiveComponents[key] = key === nameTab;
      }
    },

  },
  mounted() {
    let local = localStorage.getItem('local')
    local = JSON.parse(local)

    axios(`/api/user_inf/${local.userID}`, {
      method: 'GET',
      headers: {'Authorization': `Bearer ${local.token}`},
    }).then(response => {
      this.email = response.data.user.email
      this.person.email = response.data.user.email
      this.person.name = response.data.user.first_name
      this.person.lastname = response.data.user.last_name
      this.person.patronymic = response.data.user.patronymic
      this.person.gender = response.data.user.gender
      this.person.item = response.data.user.item
      this.person.expert = response.data.user.expert === 'Да'
      this.person.birthday = format(new Date(response.data.user.birthdate), "dd.MM.yyyy")
      // if (response.data.user.expert === "true") {
      //   // this.person.expert = true
      // }
      this.person.student = response.data.user.type_user === 'Ученик';
      this.person.grades = response.data.grades;
      this.person.achievements = response.data.achievements;
    })
  },
}
</script>

<style scoped lang="scss">
@import '../assets/styles/vars.scss';

.container {
  margin-top: 80px;
}

.window {
  column-gap: 10px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.seeMenu {
  background: $lightBlueColor;
  padding: 10px;
  margin-bottom: 15px;
  text-align: center;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 50px #888888;
  }
}

.closeMenu {
  margin-top: 15px;
  padding: 10px;
  font-size: 0.7rem;
  background: $accentColor;
  color: #d5d5d5;
  border-radius: 1rem;
  letter-spacing: 0.2rem;
  cursor: pointer;
}

.left_div {
  background: $lightBlueColor;
  margin-bottom: 15px;

  &:hover {
    box-shadow: 0 0 50px #888888;
  }
}

.tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
}

.tab {
  margin-top: 10px;
  padding: 10px;
  width: 100%;
  height: 40px;
  font-size: 0.8rem;
  border-radius: 1rem;
  background: aliceblue;
  cursor: pointer;
  transition: all .3s;

  &:hover{
    background-color: #c7fdff;
  }
}

.right_div {
  background: $lightBlueColor;
  overflow-y: auto;
  padding: 25px;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: 5px 5px 5px -5px rgba(34, 60, 80, 0.2) inset;
    background-color: #f9f9fd;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: linear-gradient(180deg, #00c6fb, #005bea);
  }
}

.left_div,
.right_div,
.seeMenu {
  border: 2px solid $lightBlueColor;
  border-radius: 1rem;
}
</style>