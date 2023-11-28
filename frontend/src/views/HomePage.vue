<template>
  <div class="home">
    <main>
      <Robot />
      <Computer />
      <Positive />
      <BigFrom />
      <LastInfo />
      <PopupMenu />
    </main>
  </div>
</template>

<script>
import Header from '../components/Header';
import RegForm from '../components/RegForm.vue';
import Robot from '../components/Robot.vue';
import Computer from '../components/Computer.vue';
import Positive from '../components/Positive.vue';
import BigFrom from '../components/BigFrom';
import LastInfo from '../components/LastInfo.vue';
// import Header from './components/Header'
// import Header from './components/Header'
import PopupMenu from '@/components/PopupMenu.vue';
import Footer from '../components/Footer';
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';
export default {
  components: {
    PopupMenu,
    Header,
    RegForm,
    Robot,
    Computer,
    Positive,
    LastInfo,
    // FilterItems,
    // RegForm,
    BigFrom,
    Footer,
  },
  data() {
    return {};
  },
  component: {
    ...mapGetters(['USERS']),
  },
  methods: {
    ...mapActions(['GET_USERS_FROM_API']),
  },
  mounted() {
    // this.GET_USERS_FROM_API()
  },
};
</script>

<style>
.home {
  user-select: none;
}
</style>
