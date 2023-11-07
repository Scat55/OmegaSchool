<template>
  <div>
    <p>{{ info.task_test }}</p>
    <p>Уровень - {{ info.level }}</p>

  </div>
</template>

<script>
export default {
  props: ['info'],
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss"></style>
