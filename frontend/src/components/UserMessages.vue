<template>
  <div class="userMess">
    <div class="userMess__mess">
      <div class="userMess__mess-info">
        <div class="userMess__text">
          <p class="userMess__message">{{ newMessage }}</p>
          <img
            v-if="gender === 'Мужской'"
            src="../assets/images/Avatar/boy.png"
            class="userMess__img"
            alt="Аватарка"
          />
          <img
            v-if="gender === 'Женский'"
            src="../assets/images/Avatar/girl (3).png"
            class="userMess__img"
            alt="Аватарка"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    gender: {
      type: String,
      default() {
        return '';
      },
    },
    newMessage: {
      type: String,
      default() {
        return '';
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.userMess {
  &__img {
    width: 15%;
    border-radius: 4rem;
    margin-bottom: 1rem;
  }

  &__text {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  &__message {
    font-size: 0.7rem;
    margin-right: 1rem;
  }
}
</style>
