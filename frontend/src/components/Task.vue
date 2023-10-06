<script>
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <div class="task">
    <div class="title">{{task.title}}</div>
    <div class="topic">Предмет: {{task.topic}}</div>
    <div class="complexity">{{task.complexity}}</div>
    <div class="bodyTask">Краткое описание: {{task.bodyTask}}</div>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/styles/styles.scss';

.task {
  border: 2px solid $lightBlueColor;
  border-radius: 1rem;
  margin-bottom: 15px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(3, 1fr);
  background: white;
  overflow: hidden;
}

.task:hover {
  border: 3px solid $lightBlueColor;
}

.title {
  padding-top: 15px;
  grid-column: 1 / span 4;
  grid-row: 1 / span 1;
  font-size: 20px;
  //border-radius: 1rem;
  border-bottom: 1px solid $lightBlueColor;
  background: $lightBlueColor;
}


.topic {
  grid-column: 1 / span 1;
  grid-row: 2 / span 1;
  text-align: left;
  margin-left: 25px;
}

.complexity {
  grid-column: 2 / span 1;
  grid-row: 2 / span 1;
  margin-right: 20px;
  text-align: right;
}

.bodyTask {
  grid-column: 1 / span 4;
  grid-row: 3 / span 1;
  text-align: left;
  margin: 0 20px 10px 20px;
}
</style>