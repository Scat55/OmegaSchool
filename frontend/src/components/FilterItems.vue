<template>
  <div>
    <p>Выберите предмет:</p>
    <Button v-for="(button, index) in buttons" :key="index" @click="setButtonActive(index)">
      {{ button.label }}
    </Button>
  </div>
</template>

<script>
import Button from "@/UI/Button.vue";

export default {
  components: {Button},
  data() {
    return {
      buttons: [
        { label: "Математика", isActive: false },
        { label: "Физика", isActive: false },
        { label: "Химия", isActive: false },
        { label: "Химия", isActive: false },
        { label: "Химия", isActive: false },
        { label: "Химия", isActive: false },
        { label: "Химия", isActive: false },
        { label: "Химия", isActive: false },
        { label: "Химия", isActive: false },
      ],
    };
  },
  methods: {
    setButtonActive(index) {
      this.buttons.forEach((button, i) => {
        button.isActive = i === index;
      });
    },
  },
};
</script>

<style scoped>
p {
  margin-bottom: 5px;
}
</style>
