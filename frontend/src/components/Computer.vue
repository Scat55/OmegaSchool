<script setup>

</script>

<template>
  <div class="computer">
    <div class="container">

      <div class="computer__content">
        <img
          src="../assets/images/PIC_index/comp.png"
          alt="Computer"
          class="computer__img"
        >
        <p class="computer__title">Дистанционное обучение открывает перед вами новые горизонты. Благодаря нашим вебинарам
          и видеоурокам, вы можете учиться у лучших специалистов, не выходя из дома. Доступ к знаниям 24/7 в любой точке
          мира.<span class="computer__subtitle">Смотреть
            задания &#8594</span></p>

      </div>
    </div>
  </div>
</template>



<style lang="scss" scoped>
.computer {

  margin-top: 3.125rem;

  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3.75rem;
  }

  &__img {
    width: 20%;
    border-radius: 9rem;
  }

  &__title {
    line-height: 140%;
    font-size: 1.2rem;
  }

  &__subtitle {
    display: block;
    padding-top: 1rem;
    font-size: 1rem;
    cursor: pointer;
    transition: all .3s;

    &:hover {
      transform: translateX(.625rem);
    }
  }
}
</style>