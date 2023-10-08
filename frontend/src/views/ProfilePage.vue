<template>
  <div>
    <div class="container">
      <div class="window">
        <div class="left_div">
          <div class="tabs">
            <div
              class="tab"
              @click="switchTab('profile')"
            >Профиль
            </div>
            <div class="tab">Мои добавленные задачи</div>
            <div
              class="tab"
              v-if="person.student === true"
              @click="switchTab('achivStud')"
            >Достижения
            </div>
            <div
              class="tab"
              v-if="person.student === false"
              @click="switchTab('ratingTeach')"
            >Рейтинг
            </div>
            <div class="tab">Мои решенные задачи</div>
            <div class="tab">Задачи на проверку</div>
          </div>
        </div>
        <div class="right_div">
          <Profile
            v-show="isActiveComponents.profile === true"
            :person="person"
          />
          <AchivmentStudent v-show="isActiveComponents.achivStud === true" />
          <RatingTeacher v-show="isActiveComponents.ratingTeach === true" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Profile from "@/components/Profile/Profile.vue";
import AchivmentStudent from "@/components/Profile/AchivmentStudent.vue";
import RatingTeacher from "@/components/Profile/RatingTeacher.vue";
export default {
  components: {
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
        student: true,
        class: '11',
        item: 'Математика',
        email: 'a1exa2@adsaw.ry',
        expert: false
      },
      isActiveComponents: {
        profile: true,
        achivStud: false,
        ratingTeach: false,
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
  //width: 100%;
  //padding: 10px;
  justify-content: center;
}

.window {
  column-gap: 10px;
  margin: 0 auto;
  //width: 79.375rem;
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
  //display: grid;
  padding: 10px 3px 0 3px;
  //grid-template-columns: 1fr;
  //grid-template-rows: repeat(6, 1fr);
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
}

.left_div,
.right_div {
  border: 2px solid $lightBlueColor;
  border-radius: 1rem;
}
</style>