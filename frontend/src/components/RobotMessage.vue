<template>
  <div class="robotMess">
    <div class="robotMess__mess">
      <div class="robotMesss__mess-info">
        <div class="robotMess__text">
          <!-- <img
            src="../assets/images/robot_chat.png"
            class="RobotMess__img"
            alt="Аватарка"
            v-if="message.length"
          /> -->
          <p class="robotMess__title">Умник</p>
          <p class="robotMess__message">{{ robMes.message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: {
    robMes: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.robotMess {
  &__img {
    width: 15%;
    border-radius: 4rem;
    margin-bottom: 1rem;
  }

  &__text {
    display: flex;
    align-items: start;
    flex-direction: column;
    justify-content: flex-start;
  }

  &__title {
    font-size: 0.6rem;
    margin-bottom: 5px;
    color: white;
  }

  &__message {
    font-size: 0.7rem;
    margin-right: 1rem;
  }
}
</style>
