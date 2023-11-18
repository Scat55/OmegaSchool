<script>
export default {
  props: ['task'],
};
</script>

<template>
  <div class="task_task">
    <router-link
      :to="'/task/' + task.id"
      class="rout"
    >
    <p class="task_title">{{ task.title }}</p>
    
    <div class="task_body">
      <p class="task_status_name">Статус: {{ task.status }}</p>
      <p class="task_topic">Предмет: {{ task.topic }}</p>
      <p class="task_class">Класс: {{ task.class }}</p>
      <p class="task_complexity">Уровень: {{ task.complexity }}</p>
    </div>
  </router-link>
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
  transition: all 0.3s;
  width: 20rem;
}

.task_body {
  //margin: 10px;
  display: flex;
  //justify-content: space-between;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
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
  box-shadow: 0 0 10px 2px #2a7afc;
  cursor: pointer;
}

.rout {
  text-decoration: none;
  color: inherit;
}

.task_title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  //margin-bottom: 1rem;
  color: white;
  text-decoration: none;
  padding: 10px 10px;
  font-size: 20px;
  background: $lightBlueColor;
}

.task_topic {
  //text-align: left;
}

.task_complexity {
  //text-align: right;
}</style>
