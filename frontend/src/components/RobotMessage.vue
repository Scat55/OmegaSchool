<template>
  <div class="robotMess">
    <div class="RobotMess__mess">
      <div class="RobotMess__mess-info">
        <div class="RobotMess__text">
          <img
            src="../assets/images/robot_chat.png"
            class="RobotMess__img"
            alt="Аватарка"
          />
          <p class="RobotMess__message">{{ message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: {
    message: {
      type: String,
      default() {
        return '';
      },
    },
  },
  mounted() { },
};
</script>

<style lang="scss" scoped>
.RobotMess {
  &__img {
    width: 15%;
    border-radius: 4rem;
    margin-bottom: 1rem;
  }

  &__text {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  &__message {
    font-size: 0.7rem;
    margin-right: 1rem;
  }
}
</style>
