<template>
  <div id="app">
    <RegForm v-if="this.$store.state.status" />
    <header>
      <Header />
    </header>
    <router-view></router-view>
    <footer>
      <Footer />
    </footer>
  </div>
</template>

<script>
import Header from './components/Header'
import RegForm from './components/RegForm.vue'
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Footer,
    Header,
    RegForm,

  },

}
</script>

<style lang="scss">
#app {
  font-family: Visitor, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

}
</style>
