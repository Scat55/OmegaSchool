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
    mounted() {
      setTimeout(function () {
        this.chat = true
      }.bind(this), 2000)

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