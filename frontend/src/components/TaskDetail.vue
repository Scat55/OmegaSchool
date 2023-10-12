<template>
  <div class="container">
    <div class="container__title">
      <h2>{{ task.title }}</h2>
    </div>
    <div class="container__infoTask">
      <div class="container__infoTask__id">
        <p>Номер задачи: {{ task.id }}</p>
      </div>
      <div class="container__infoTask__complexity">
        Уровень задания: {{ task.complexity }}
      </div>
      <div class="container__infoTask__topic">
        Предмет: {{ task.topic }}
      </div>
    </div>
    <div class="container__bodyTask">
      <span>Условие задания:</span> {{ task.bodyTask }}
    </div>
    <div class="container_answer">
<!--      <li v-for="item in 8">-->
<!--        <input type="checkbox" name="" id="" ><label>{{item}}</label>-->
<!--      </li>-->
    </div>
    <div class="container_button">

    </div>
  </div>
</template>

<script>
export default {
  // props: {
  //   task: {
  //     type: Object,
  //     required: true
  //   }
  // },
  computed: {
    task() {
      return this.$store.state.zadania.find(t => t.id == this.$route.params.id)
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  margin-top: 80px;
  background: white;
  padding: 10px;
  border-radius: 1rem;
  border: 2px solid #487fb8;

  &__title {
    text-align: center;
  }

  &__infoTask {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin: 10px 0;

    &__id {

    }

  }

  &__bodyTask {

    &>span{
      font-weight: bold;
    }

  }

}
</style>