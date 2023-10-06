<template>
  <button
    :class="{ active: isActive }"
    @click="toggleActive"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    isActive: Boolean,
  },
  methods: {
    toggleActive() {
      this.$emit("update:isActive", !this.isActive);
    },
  },
};
</script>

<style scoped lang="scss">
@import '../assets/styles/styles.scss';

button {
  font-size: 0.96rem;
  margin: 5px;
  padding: 5px;
  border: 1px solid #018bd3;
  background: none;
  border-radius: 1rem;
  font-family: Visitor;
}

button.active {
  background-color: #018bd3;
  color: white;
}</style>
