<template>
  <div>
    <div class="container">
      <div class="window">
        <div class="left_div">
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
            >Задачи на проверку ( ученик )
            </div>
            <div
              class="tab"
              v-if="person.expert === true"
              @click="switchTab('TaskToCheckTeacher')"
            >Задачи на проверку ( учитель )
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
          </div>
        </div>
        <div class="right_div">
          <Profile
            v-show="isActiveComponents.Profile === true"
            :person="person"
          />
          <AddTask v-show="isActiveComponents.AddTask === true" />
          <TaskToCheckStudent v-show="isActiveComponents.TaskToCheckStudent === true" />
          <TaskToCheckTeacher v-show="isActiveComponents.TaskToCheckTeacher === true" />
          <MySolvedTask v-show="isActiveComponents.MySolvedTask === true" />
          <MyAddTask v-show="isActiveComponents.MyAddTask === true" />
          <AchivmentStudent v-show="isActiveComponents.AchivStud === true" />
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
    RatingTeacher
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
        item: 'Математика',
        email: '',
        expert: null,
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
      id: this.$router.currentRoute.params['id'],
      token: localStorage.getItem('token'),
    }
  },
  methods: {
    switchTab(nameTab) {
      for (const key in this.isActiveComponents) {
        if (key !== nameTab) {
          this.isActiveComponents[key] = false;
        } else {
          this.isActiveComponents[key] = true;
        }
      }
    },
    // getInfoAboutUser(){
    //   axios.get(`/getUserIdForInf/${this.id}`).then(response => {
    //     // this.email = response.data.user.email
    //     this.person.email = response.data.user.email
    //     this.person.name = response.data.user.first_name
    //     this.person.lastname = response.data.user.last_name
    //     this.person.patronymic = response.data.user.patronymic
    //     this.person.gender = response.data.user.gender
    //     if (response.data.user.type_user === 'Ученик'){
    //       this.person.student = true
    //     } else {
    //       this.person.student = false
    //     }
    //   })
    //   console.log(this.person)
    // },

    getTokenFromLocal(){
      const token = localStorage.getItem('token');

      if (token){
        store.state.isAuth = true
      }
    }

  },
  mounted() {
    // this.getInfoAboutUser()
    axios(`/api/user_inf/${this.id}`, {
      method: 'GET',
      headers: {'Authorization': `Bearer ${this.token}`},
    }).then(response => {
      console.log(response.data)
      this.email = response.data.user.email
      this.person.email = response.data.user.email
      this.person.name = response.data.user.first_name
      this.person.lastname = response.data.user.last_name
      this.person.patronymic = response.data.user.patronymic
      this.person.gender = response.data.user.gender
      if (response.data.user.expert === "true") {
        this.person.expert = true
      }
      if (response.data.user.type_user === 'Ученик'){
        this.person.student = true
      } else {
        this.person.student = false
      }
    })
    console.log(this.person)

    this.getTokenFromLocal()
  },
}
</script>

<style scoped lang="scss">
@import '../assets/styles/vars.scss';

.container {
  margin-top: 80px;
  height: 80vh;
  justify-content: center;
}

.window {
  column-gap: 10px;
  margin: 0 auto;

  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr 1fr;
}


.left_div {
  background: $lightBlueColor;
  grid-column: 1 / span 1;
  grid-row: 1 / span 1;
  height: 350px;
  padding: 10px 3px 0 3px;
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
  grid-column: 2 / span 3;
  grid-row: 1 / span 2;
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
.right_div {
  border: 2px solid $lightBlueColor;
  border-radius: 1rem;
}
</style>