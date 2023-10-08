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
            >Задачи на проверку ( от учеников )
            </div>
            <div
                class="tab"
                v-if="(person.student === false) && person.expert === true"
                @click="switchTab('TaskToCheckTeacher')"
            >Задачи на проверку ( от учителей )
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
          <AddTask v-show="isActiveComponents.AddTask === true"/>
          <TaskToCheckStudent v-show="isActiveComponents.TaskToCheckStudent === true"/>
          <TaskToCheckTeacher v-show="isActiveComponents.TaskToCheckTeacher === true"/>
          <MySolvedTask v-show="isActiveComponents.MySolvedTask === true"/>
          <MyAddTask v-show="isActiveComponents.MyAddTask === true"/>
          <AchivmentStudent v-show="isActiveComponents.AchivStud === true"/>
          <RatingTeacher v-show="isActiveComponents.RatingTeach === true"/>
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
        name: 'Sasha',
        lastname: 'Volkov',
        patronymic: 'Segeevich',
        birthday: '14.03.2002',
        gender: "Мужской",
        student: false, // переключатель вкладок
        class: '11',
        item: 'Математика',
        email: 'a1exa2@adsaw.ry',
        expert: false
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
    }
  }
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
}

.tab {
  margin-top: 10px;
  padding: 10px;
  width: 100%;
  height: 40px;
  border-radius: 1rem;
  background: aliceblue;
}

.right_div {
  background: $lightBlueColor;
  grid-column: 2 / span 3;
  grid-row: 1 / span 2;
  overflow-y: auto;
  padding: 25px;
}

.left_div,
.right_div {
  border: 2px solid $lightBlueColor;
  border-radius: 1rem;
}
</style>