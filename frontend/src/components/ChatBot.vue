<template>
  <div
    class="chat"
    v-if="chat"
  >
    <div class="chat__content">
      dsdjfjdhsdjh
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chat: false
    }
  },
  methods: {
    showChat() {



    },
    created() {
      setTimeout(() => {
        this.chat = true
        console.log("OK")
      }, 1000);
    },


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
  }
}
</style>