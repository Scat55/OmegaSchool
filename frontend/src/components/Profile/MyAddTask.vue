<script setup>
import AddTaskChecked from "@/components/MyAddTask/AddTaskChecked.vue";
</script>

<template>
<div>
  <h1>MyAddTask</h1>
  <AddTaskChecked v-for="task in $store.state.Temp.addTask" :key="task.id" :task="task"/>
</div>
</template>

<style scoped lang="scss">

</style>