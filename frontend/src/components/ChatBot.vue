<template>
  <div class="chat">
    <div class="messages">
      <div class="message" v-for="message in messages" :key="message.id">
        <div class="user">{{ message.user }}</div>
        <div class="text">{{ message.text }}</div>
      </div>
    </div>
    <div class="input">
      <input v-model="userInput" @keyup.enter="sendMessage" placeholder="Type a message..." />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    language: {
      type: String,
      default: 'ru',
    },
    randomResponses: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      messages: [],
      userInput: '',
    };
  },
  methods: {
    async sendMessage() {
      if (this.userInput.trim() !== '') {
        this.messages.push({ user: 'You', text: this.userInput });

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
          this.messages.push({ user: 'Bot', text: botResponse });
        } catch (error) {
          console.error('Error sending message:', error);
        }

        this.userInput = '';
      }
    },
  },
};
</script>

<style scoped>
.chat {
  max-width: 600px;
  margin: 20px auto;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
}

.messages {
  max-height: 300px;
  overflow-y: auto;
  padding: 10px;
  background: linear-gradient(to right, #1976d2, #2196f3);
  color: #fff;
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
  padding: 10px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #000;
}

.user {
  font-weight: bold;
}

.input {
  margin-top: 10px;
  display: flex;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.9);
}

input {
  flex: 1;
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: background-color 0.3s;
}

input:focus {
  background-color: #fff;
}

button {
  padding: 8px 15px;
  background-color: #1565c0;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0d47a1;
}
</style>
