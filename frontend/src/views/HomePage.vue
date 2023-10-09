<template>
  <div class="home">

    <main>
      <Robot />
      <Computer />
      <Positive />
      <BigFrom />
      <LastInfo />
    </main>




  </div>
</template>

<script>
import Header from '../components/Header'
import RegForm from '../components/RegForm.vue'
import Robot from '../components/Robot.vue'
import Computer from '../components/Computer.vue'
import Positive from '../components/Positive.vue'
// import FilterItems from './components/FilterItems.vue'
import BigFrom from '../components/BigFrom'
import LastInfo from '../components/LastInfo.vue'
// import Header from './components/Header'
// import Header from './components/Header'
import Footer from '../components/Footer'
import { mapGetters } from 'vuex';
import axios from 'axios'
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
      message: '',
      users: [],
      nik: 'Nikolya'
    }
  },

  mounted() {
    axios.get('/userlist').then((resp) => {
      console.log(JSON.parse(resp.data));
    });
  },
}
</script>