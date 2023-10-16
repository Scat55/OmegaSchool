<script>
export default {
  props: ['task']
}
</script>

<template>
  <div class="task_task">
    <router-link :to="'/task/' + task.id" class="task_title">{{ task.title }}
    </router-link>
    <div class="task_status">
      <div class="task_status_name">Статус: {{task.status === false ? 'Не решено' : 'Решено'}}</div>
    </div>
    <div class="task_body">
      <div class="task_topic">Предмет: {{task.topic}}</div>
      <div class="task_class">Класс: {{task.class}}</div>
      <div class="task_complexity">Уровень задания: {{task.complexity}}</div>
    </div>
<!--    <div class="bodyTask">{{task.bodyTask}}</div> Аннотация-->
  </div>
</template>

<style scoped lang="scss">
@import '../assets/styles/vars.scss';


.task_task {
  border: 2px solid $lightBlueColor;
  border-radius: 1rem;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  background: white;
  overflow: hidden;
}

.task_body {
  margin: 10px ;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 5px 0;
}

.task_status {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  //margin: 10px 0 0 0 ;
  border-bottom: 2px solid $lightBlueColor;
}

.task_task:hover {
  border: 3px solid #151280;
}

.task_title {

  color: white;
  text-decoration: none;
  padding: 10px 5px;
  font-size: 20px;
  background: $lightBlueColor;
}


.task_topic {
  text-align: left;
}

.task_complexity {

  text-align: right;
}
</style>