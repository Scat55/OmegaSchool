<template>
  <div id="app">
    <RegForm v-if="this.$store.state.status" />
    <header>
      <Header
        v-if="
          !this.$store.state.isComandAuth &&
          this.$route.path != '/admin' &&
          this.$route.path != '/admin' &&
          this.$route.path != '/AdminRegForm'
        "
      />
      <HeaderCom v-if="this.$store.state.isComandAuth && this.$route.path != '/AdminRegForm'" />
    </header>
    <main>
      <router-view> </router-view>
    </main>

    <footer>
      <Footer v-if="this.$route.path != '/admin' && this.$route.path != '/AdminRegForm'" />
    </footer>
  </div>
</template>

<script>
import Header from './components/Header';
import HeaderCom from './components/HeaderCom.vue';
import RegForm from './components/RegForm.vue';
import Footer from '@/components/Footer.vue';
export default {
  components: {
    Footer,
    Header,
    RegForm,
    HeaderCom,
  },
};
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: Visitor, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

main {
  flex: 1;
}

footer {
  flex: 0;
}
</style>
