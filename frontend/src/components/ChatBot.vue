<template>
  <div
    class="chat"
    v-if="chat"
  >
    <div class="chat__content">
      <img
        src="../assets/images/robot_chat.png"
        alt=""
        class="chat__img"
        @click="ChangeIsVisible"
      />

      <form
        class="chat__form"
        @submit.prevent
        v-if="isVisible"
      >
        <span class="chat__label">Чат с Умником</span>
        <div class="chat__form-content">
          <div class="chat__form-messages">

            <div class="chat__form-user">
              <UserMessagges
                :gender="gender"
                :newMessage="newMessage"
                v-if="newMessage.length"
              />
            </div>
            <div class="chat__form-robot">
              <RobotMessage :message="message" />
            </div>


          </div>
        </div>
        <div class="send">
          <input
            type="text"
            class="chat__input"
            placeholder="Введите ваше сообщение"
            v-model="myMessage"
          />
          <button
            @click="sendMessage"
            class="chat__push"
            :disabled="this.myMessage.length === 0"
          >
            Click
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import UserMessagges from './UserMessages';
import RobotMessage from './RobotMessage.vue';
import axios from 'axios';
export default {
  components: {
    UserMessagges,
    RobotMessage,
  },
  props: {
    gender: {
      type: String,
      default() {
        return '';
      },
    },
  },
  data() {
    return {
      chat: false,
      isVisible: false,
      message: '',
      myMessage: '',
      newMessage: '',
    };
  },
  methods: {
    showChat() {
      setTimeout(() => {
        this.chat = true;
      }, 100);
    },
    ChangeIsVisible() {
      this.isVisible = !this.isVisible;
    },
    sendMessage() {

      this.newMessage = this.myMessage;
      const userMessage = this.newMessage

      axios
        .post(
          'https://omega-lspu.ru/bot',
          {
            message: userMessage,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then((response) => {
          try {
            // this.message.push({ message: response.data });
            // console.log(this.message)
            this.message = response.data.response
            console.log(this.message)
          } catch {
            this.message = 'Оооп... Я сломался'
          }
        });


      // console.log(showRobot(this.newMessage));


      this.myMessage = '';
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
    overflow: auto;

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
    }

    &-img {
      width: 3rem;
      margin-left: 0.5rem;
    }
  }

  &__img {
    width: 30%;
    cursor: pointer;
  }

  &__label {
    text-align: center;
    background-color: rgb(26, 193, 248);
    padding: 0.625rem 1.25rem;

    flex: 0;
  }

  &__input {
    width: 80%;
    padding: 0.625rem;
    border-radius: 0.5rem;
    border: 1px solid #000;
    outline: none;
    margin-left: 0.3rem;
  }

  &__push {
    font-size: 0.5rem;
  }
}

.send {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  button {
    width: 50px;
    height: 20px;
    cursor: pointer;
    font-size: 0.8rem;
  }
}
</style>
