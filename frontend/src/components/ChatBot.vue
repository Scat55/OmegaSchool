<template>
  <div class="chat">
    <div class="chat__container">
      <img
        src="@/assets/images/robot_chat.png"
        alt="RobotChat"
        class="chat-img"
        @click="isShow = !isShow"
      />
      <transition name="fade">
        <div v-if="isShow" class="chat-content">
          <div class="messages" ref="messageContainer">
            <div
              class="message"
              v-for="message in messages"
              :key="message.id"
              :class="{
                'user-message': message.user === 'Пользователь',
                'bot-message': message.user === 'Умник',
              }"
            >
              <div class="user">{{ message.user }}</div>
              <div class="text">{{ message.text }}</div>
            </div>
          </div>
          <div class="input">
            <input
              v-model="userInput"
              @keyup.enter="sendMessage"
              placeholder="Введите сообщение..."
            />
            <button @click="sendMessage">Отправить</button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      messages: [],
      userInput: '',
      isShow: false,
    };
  },
  methods: {
    async sendMessage() {
      if (this.userInput.trim() !== '') {
        this.messages.push({ user: 'Пользователь', text: this.userInput });

        try {
          const response = await axios.post(
            'https://omega-lspu.ru/bot',
            {
              message: this.userInput,
            },
            {
              headers: {
                mode: 'cors',
                'Content-Type': 'application/json',
              },
            },
          );

          const botResponse = response.data.response;
          this.messages.push({ user: 'Умник', text: botResponse });
        } catch (error) {
          console.error('Error sending message:', error);
        }

        this.userInput = '';

        // После добавления нового сообщения опускаем скролл к последнему сообщению
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
    },
    scrollToBottom() {
      const container = this.$refs.messageContainer;
      container.scrollTop = container.scrollHeight;
    },
  },
};
</script>

<style scoped>
.chat {
  display: flex;
  max-width: 450px;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
}

.chat-img {
  border: none;
  width: 25%;
  cursor: pointer;
  align-self: end;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}
.chat__container {
  position: fixed;
  bottom: 0px;
  right: 50px;
  display: flex;
  flex-direction: column;
  width: 350px;
}
.messages {
  height: 200px;
  overflow-y: auto;
  padding: 10px;
  background: linear-gradient(to right, #1976d2, #2196f3);
  color: #fff;
  border-bottom: 2px solid #ccc;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  /* Стилизация скроллбара */
  scrollbar-width: thin;
  scrollbar-color: #1565c0 #fff;
}

.messages::-webkit-scrollbar {
  width: 12px;
}

.messages::-webkit-scrollbar-thumb {
  background-color: #1565c0;
  border-radius: 10px;
}

.messages::-webkit-scrollbar-track {
  background-color: #fff;
}

.message {
  margin-bottom: 10px;
  padding: 12px;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #000;
}

.user {
  font-size: 0.875rem;
  font-weight: bold;
}

.input {
  display: flex;
  padding: 12px;
  background-color: #fff;
  border-top: 2px solid #ccc;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}

input {
  flex: 1;
  padding: 10px;
  margin-right: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  transition: background-color 0.3s;
}

input:focus {
  background-color: #f0f0f0;
}

button {
  padding: 10px 20px;
  background-color: #1565c0;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0d47a1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.user-message {
  align-self: flex-end;
  background-color: #1565c0;
  font-size: 0.875rem;

  color: #fff;
}

.bot-message {
  align-self: flex-start;
  background-color: #fff;
  font-size: 0.875rem;
  color: #000;
}
</style>
