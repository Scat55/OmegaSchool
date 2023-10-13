<script setup>

import StatusTaskToCheckedStudent from "@/components/TaskToCheckeStudent/StatusTaskToCheckedStudent.vue";
</script>

<script>
export default {
  data(){
    return {
    }
  },
  computed: {
filteredTasks() {
  return this.$store.getters.filterCheckedTask(false)
}
  }
}
</script>

<template>
<div>
  <h1>TaskToCheckStudent</h1>
  <StatusTaskToCheckedStudent v-for="task in filteredTasks" :key="task.id" :task="task" />
</div>
</template>

<style scoped lang="scss">

</style>