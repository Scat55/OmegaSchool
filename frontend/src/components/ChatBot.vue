<template>
  <div class="chat" v-if="chat">
    <div class="chat__content">
      <img
        src="../assets/images/robot_chat.png"
        alt=""
        class="chat__img"
        @click="ChangeIsVisible"
      />

      <form class="chat__form">
        <span class="chat__label">Чат с Умником</span>
        <div class="chat__form-content">
          <div class="chat__form-messages">
            <div class="chat__form-robot">
              <img src="../assets/images/robot_chat.png" alt="Robot" class="chat__form-img" />
              <p class="chat__form-message">{{ message }}</p>
            </div>

            <div class="chat__form-user">
              <p class="chat__form-message">{{ myMessage }}</p>
              <img src="../assets/images/robot_chat.png" alt="Robot" class="chat__form-img" />
            </div>
          </div>
        </div>
        <input
          type="text"
          class="chat__message"
          placeholder="Введите ваше сообщение"
          v-model="myMessage"
        />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chat: false,
      isVisible: false,
      message: 'Hello',
      myMessage: '',
    };
  },
  methods: {
    showChat() {
      setTimeout(() => {
        this.chat = true;
      });
    },
    ChangeIsVisible() {
      this.isVisible = !this.isVisible;
    },
  },
  mounted() {
    this.showChat();
  },
};
</script>

<style lang="scss" scoped>
.chat {
  position: relative;

  &__content {
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    bottom: 0rem;
    right: 0;
    width: 20rem;
  }
  &__form {
    display: flex;
    flex-direction: column;
    // flex: 0;
    height: 20rem;
    width: 18rem;
    background-color: #fff;

    &-content {
      flex: 1 0 auto;
    }
    &-messages {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    &-robot {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 1rem;
      background-color: rgb(198, 198, 198);
    }
    &-img {
      width: 3rem;
      margin-left: 0.5rem;
    }

    &-user {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    &-message {
      font-size: 0.7rem;
    }
  }
  &__img {
    width: 30%;
    cursor: pointer;
    // z-index: 100;
  }
  &__label {
    text-align: center;
    background-color: rgb(26, 193, 248);
    padding: 0.625rem 1.25rem;

    flex: 0;
  }
  &__message {
    flex: 0;
    // display: inline-block;
    align-content: space-around;
  }
}

.test {
  position: fixed;
  bottom: 20rem;
  right: 0;
}
</style>
