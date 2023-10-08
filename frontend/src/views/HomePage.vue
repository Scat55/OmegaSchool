<template>
  <div class="home">

    <div @click="showKolya()">
      Click {{ message }}

    </div>
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

  methods: {
    // Тестовая проверка на присутсвие юзера в массиве
    // showKolya() {
    //   // const users = Object.values(this.users)
    //   // console.log(users)
    //   const newArr = this.users.map(el => {
    //     const test = Object.values(el)
    //     if (test.includes(this.nik)) {
    //       this.message = 'Yes'
    //     }
    //   })
    // }
  },

  mounted() {
    fetch('/userlist')
      .then(response => response.json())
      .then(response => {
        this.message = response.message;
        console.log(JSON.parse(response))
        this.users = JSON.parse(response)
      })
  },
}
</script>