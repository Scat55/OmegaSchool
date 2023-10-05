<template>
  <div id="app">
    <header>
      <Header />
    </header>
    {{ message }}

  </div>
</template>

<script>
import Header from './components/Header'
export default {
  components: { Header },
  data() {
    return {
      message: ''
    }
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
