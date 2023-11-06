<template>
  <div
    class="chat"
    v-if="chat"
  >
    <div class="chat__content test">

      <img
        src="../assets/images/robot_chat.png"
        alt=""
        class="chat__img"
      >

      <div class="chat__content-text ">
        <p class="chat__title">Умник</p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      chat: false,
      isVisible: false
    }
  },
  methods: {
    showChat() {
      setTimeout(() => {
        this.chat = true
      })
    },
  },
  mounted() {
    this.showChat()

  },
}
</script>

<style lang="scss" scoped>
.chat {
  position: relative;

  &__content {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 10rem;
  }

  &__img {
    width: 70%;
    cursor: pointer;
  }
}

.test {
  position: fixed;
  bottom: 6.25rem;
  right: 0;
}
</style>