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

              <div v-for="comand in infoComand.users">
                <p class="comandEmail">Имя: {{ comand.first_name }}</p>
              </div>
            </div>
          </div>
        </div>
        <img
          src="../assets/images/positive/grup.png"
          alt="GroupAvatar"
          class="comandPage__avatar"
        />
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
    };
  },

  mounted() {
    this.tokenComand = JSON.parse(localStorage.getItem('comand'));
    console.log(this.tokenComand);
    axios
      .get(`/commands/info/`, {
        headers: {
          Authorization: `Bearer ${this.tokenComand.token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        this.infoComand = res.data;
        console.log(res.data);
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
    width: 20%;
  }

  &__people {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}

.comandInfo {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  border: 1px solid #000;
  padding: 0.625rem;
  border-radius: 0.5rem;

  &__users {
    margin-bottom: 1rem;
  }
}
</style>
