<script>
export default {
  props: ['task'],
  data(){
    return {}

  }
}
</script>

<template>
  <div>
    <h1>{{task.id}}</h1>
    <h1>{{task.title}}</h1>
    <h1>{{task.statusCheck}}</h1>
  </div>
</template>

<style scoped lang="scss">

</style>