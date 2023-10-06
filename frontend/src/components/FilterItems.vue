<template>
  <div>
    <p>Выберите предмет:</p>
    <Button v-for="(button, index) in buttons" :key="index" v-model:isActive="button.isActive" @click="setButtonActive(index)">
      {{ button.label }}
    </Button>
  </div>
</template>

<script setup>
import Button from "@/UI/Button.vue";
import {ref} from "vue";

const buttons = ref([
  { label: "Математика", isActive: false },
  { label: "Физика", isActive: false },
  { label: "Химия", isActive: false },
  { label: "Химия", isActive: false },
  { label: "Химия", isActive: false },
  { label: "Химия", isActive: false },
  { label: "Химия", isActive: false },
  { label: "Химия", isActive: false },
  { label: "Химия", isActive: false },

]);

const setButtonActive = (index) => {
  buttons.value.forEach((button, i) => {
    button.isActive = i === index;
  });
};
</script>

<style scoped>
p {
  margin-bottom: 5px;
}
</style>
