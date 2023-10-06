<template>
  <div id="app">
    <RegForm v-if="this.$store.state.status" />
    <header>
      <Header />
    </header>

    <main>
      <Robot />
      <Computer />
      <Positive />
      <BigFrom />
      <LastInfo />
    </main>

    <footer>
      <!-- {{ message }} -->
      <Footer />

    </footer>


  </div>
</template>

<script>
import Header from './components/Header'
import RegForm from './components/RegForm.vue'
import Robot from './components/Robot.vue'
import Computer from './components/Computer.vue'
import Positive from './components/Positive.vue'
// import FilterItems from './components/FilterItems.vue'
import BigFrom from './components/BigFrom'
import LastInfo from './components/LastInfo.vue'
// import Header from './components/Header'
// import Header from './components/Header'
import Footer from './components/Footer'
import { mapGetters } from 'vuex';
export default {
  components: {
    Header,
    RegForm,
    Robot,
    Computer,
    Positive,
    LastInfo,
    // FilterItems,
    // RegForm,
    BigFrom,
    Footer
  },
  data() {
    return {
      message: ''
    }
  },
  computed: {
    ...mapGetters(['STATUS'])
  },
  mounted() {
    fetch('/api')
      .then(response => response.json())
      .then(response => {
        this.message = response.message;
        console.log(response)
      })
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
