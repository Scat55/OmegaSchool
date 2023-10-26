<script>
export default {
  props: {
    imgSrc: {
      type: String,
      required: true
    },
    imgAlt: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    conditions: {
      type: String,
      required: true
    },
    stAtus: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <div class="achivment">
    <div class="achivka">
      <img :src="imgSrc" :alt="imgAlt"/>
      <div>
        <p>{{ title }}</p>
        <p>{{ conditions }}</p>
        <p>Статус: {{ stAtus }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.achivka {
  display: flex;
  align-items: center;

  &>div {
    display: flex;
    flex-direction: column;

    &>p {
      margin-left: 15px;
    }
  }

  &>img {
    width: 15%;

  }
}
</style>