<template>
  <div class="comandPage">
    <div class="container">
      <div class="comandPage__info">
        <div class="comandPage__people">
          <p>Название команды</p>
          <div>Участники</div>
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
import axios from 'axios'
export default {
  data() {
    return {
      id: this.$route.params.id,
      infoComand: '',
      tokenComand: ''
    }
  },

  mounted() {
    this.tokenComand = localStorage.getItem('comadToken')

    axios.get(`/commands/info`, {
      headers: {
        Authorization: `Bearer ${this.tokenComand}`,
        'Content-Type': 'app;ication/json'
      }
    })
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
</style>
