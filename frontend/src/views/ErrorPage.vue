<template>
  <div class="error">
    <span>404</span>
    <p class="error__message">Ууупс... Страница не найдена</p>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="sass" scoped>
.error 
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  gap: 1rem
  height: 50vh
  span
    font-size: 2rem
  &__message
    font-size: 1rem
</style>