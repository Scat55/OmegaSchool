<template>
  <div id="app">
    <RegForm v-if="this.$store.state.status" />
    <header>
      <Header />
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header'
import RegForm from './components/RegForm.vue'

export default {
  components: {
    Header,
    RegForm,

  },

}
</script>

<style lang="scss">
#app {
  font-family: Visitor;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

}
</style>
