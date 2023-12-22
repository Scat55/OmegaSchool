<template>
  <div class="comandPage">
    <div class="container">
      <div class="comandPage__info">
        <div class="comandPage__people">
          <p v-if="!this.infoComand.comandName">Название не найдено</p>
          <p v-else>{{ infoComand.comandName }}</p>
          <div>
            <p v-if="!infoComand.users">Участники не найдены</p>
            <div class="comandInfo" v-else>
              <h2 class="comandInfo__users">Участники:</h2>

              <div class="comandContent" v-for="comand in infoComand.users">
                <p class="comandEmail">
                  Имя: <span v-if="!change">{{ comand.first_name }}</span>
                  <input type="text" class="changeInfo" v-if="change" v-model="comand.first_name" />
                </p>
                <p class="comandEmail">
                  Фамилия: <span v-if="!change">{{ comand.last_name }}</span>
                  <input type="text" class="changeInfo" v-if="change" v-model="comand.last_name" />
                </p>
              </div>
            </div>
          </div>
          <button class="comandInfo__btn" @click="changeInfo" v-if="!change">
            Изменить участников
          </button>
          <button class="comandInfo__btn" @click="updateUsers" v-else>Подтвердить</button>
        </div>
        <img
          src="../assets/images/positive/grup.png"
          alt="GroupAvatar"
          class="comandPage__avatar"
        />
      </div>
      <div class="btn-content">
        <button class="btn" @click="goToTasks">Начать испытание</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      id: this.$route.params.id,
      infoComand: '',
      tokenComand: '',
      change: false,
      name: '',
      lastName: '',
      users: [],
    };
  },
  methods: {
    goToTasks() {
      this.$router.push('/comandTask');
    },
    changeInfo() {
      this.change = true;
    },
    updateUsers() {
      this.tokenComand = JSON.parse(localStorage.getItem('comand'));

      axios.put(`/commands/changer`, this.users, {
        headers: {
          Authorization: `Bearer ${this.tokenComand.token}`,
          'Content-Type': 'application/json',
        },
      });
    },
  },

  mounted() {
    this.tokenComand = JSON.parse(localStorage.getItem('comand'));
    axios
      .get(`/commands/info/`, {
        headers: {
          Authorization: `Bearer ${this.tokenComand.token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        this.infoComand = res.data;
        console.log(res.data.users);
        this.users = res.data.users;
      });
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/vars.scss';

.comandPage {
  // display: flex;
  // align-items: center;
  // height: 100%;
  &__info {
    display: flex;
    justify-content: space-between;
    background-color: $accentColor;
    color: #fff;
    margin-top: 3rem;
    padding: 1.25rem;
    border-radius: 0.5rem;
  }

  &__avatar {
    border: 2px solid white;
    border-radius: 1rem;
    width: 10rem;
    height: 10rem;
  }

  &__people {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}
.comandContent {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid #000;
  padding: 0.625rem;
  border-radius: 0.5rem;
}
.comandInfo {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;

  &__users {
    margin-bottom: 1rem;
  }
  &__btn {
    font-family: 'Visitor';
    margin-top: 1rem;
    padding: 0.625rem;
    background-color: #5d6dfe;
    color: #fff;
    text-align: center;
    border: none;
    outline: none;
    font-size: 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
  }
}
.changeInfo {
  font-family: 'Visitor';
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  outline: none;
}
.btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn {
  font-family: 'Visitor';
  margin-top: 1rem;
  padding: 0.625rem;
  background-color: $accentColor;
  color: #fff;
  text-align: center;
  border: none;
  outline: none;
  font-size: 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
}
</style>
