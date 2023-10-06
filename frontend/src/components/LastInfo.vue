<script setup>

</script>

<template>
  <div class="last">
    <div class="container">
      <div class="last__content">
        <img
          src="../assets/images/PIC_index/Books.png"
          alt="last"
          class="last__img"
        >
        <p class="last__title">Каждая книга - это путешествие в мир знаний. Наша библиотека предоставляет обширную
          коллекцию ресурсов, которые будут полезны как начинающим, так и опытным исследователям. Откройте для себя новые
          горизонты с нашими учебными материалами!"
          мира.</p>
      </div>
    </div>
  </div>
</template>



<style lang="scss" scoped>
.last {

  margin-top: 4.125rem;

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
    font-size: 1.4rem;
  }
}
</style>