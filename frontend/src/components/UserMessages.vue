<template>
  <div class="userMess">
    <div>
      <div class="userMess__mess">
        <div class="userMess__mess-info">
          <div class="userMess__text">
            <p class="userMess__title">Пользователь</p>

            <p class="userMess__message">{{ mes.message }}</p>

            <!-- <img
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
              /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default() {
        return '';
      },
    },
    mes: {
      type: Object,
      default() {
        return [];
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
    flex-direction: column;
    align-items: end;
    justify-content: flex-end;
  }

  &__title {
    font-size: 0.6rem;
    margin-bottom: 5px;
    color: white;
  }

  &__message {
    font-size: 0.7rem;
    // margin-right: 1rem;
  }
}
</style>
