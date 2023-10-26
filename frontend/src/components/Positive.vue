<template>
  <div class="positive">
    <div class="container">
      <h2 class="positive__title">Почему именно <span>мы?</span></h2>

      <div class="positive__content">
        <div class="positive__content-item" v-for="plus in positive">
          <div class="positive__content-text">
            <p class="positive__item-title" @click="show()">{{ plus.title }}</p>
            <p class="positive__item-title">{{ plus.subtitle }}</p>
          </div>

          <img
            :src="require('../assets/images/positive/' + plus.img)"
            alt="InfoImg"
            class="positive__item-img"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      positive: [
        {
          title: 'Не стандартные',
          subtitle: 'задачи',
          img: 'comp.png',
        },
        {
          title: 'Задания проверенные экспертами',
          img: 'grup.png',
        },
        {
          title: 'Система достижений',
          img: 'awards.png',
        },
        {
          title: 'Инновационные',
          subtitle: 'материалы',
          img: 'materials.png',
        },
      ],
    };
  },

  methods: {
    show() {
      console.log(this.positive);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/vars.scss';

.positive {
  &__title {
    margin-top: 8.125rem;
    font-size: 2rem;
    margin-bottom: 2rem;

    span {
      color: #00dfcc;
    }
  }

  &__content {
    display: flex;
    align-items: start;
    justify-content: space-between;
    gap: 2rem;

    @media (min-width: 300px) and (max-width: 1200px) {
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
    }

    &-text {
      display: flex;
      flex-direction: column;
      gap: 9rem;
      align-items: center;
    }

    &-item {
      position: relative;
      text-align: center;
      width: 18.75rem;
      margin-bottom: 3.125rem;
      height: 18.75rem;
      border-radius: 1rem;
      transition: all 0.3s;

      &:hover {
        transform: scale(1.1);
      }
    }
  }

  &__item {
    &-title {
      display: flex;
      margin: 0.5rem;
      color: $whiteColor;
      font-size: 1.3rem;
      font-weight: bold;
      letter-spacing: 0.2rem;
    }

    &-img {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -10;
      width: 100%;
      border-radius: 1rem;
      transition: all 0.3s;
    }
  }
}
</style>
