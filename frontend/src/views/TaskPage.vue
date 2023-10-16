<template>
  <div>
    <div class="container">

      <div class="window">

<!--    Тут верхняя шапка    -->
        <div class="div1">
          <div>Задания</div>
          <div>Слева вы сможете выбрать фильтры для заданий. <br> По каким предметам, сложность и тд.</div>
        </div>
<!--    конец шапки    -->
<!-- Фильтр -->
        <div class="button_trueFilteredSee filter" v-show="filterSee === false" @click="filterSee = !filterSee">
          <div>Показать фильтры</div>
        </div>
        <div class="filter" v-show='filterSee === true'>
          <div >
            <div class="filter__search-bar">
              <p>Поиск задачи: </p>
              <input v-model="searchQuery" placeholder="Поиск по названию задачи...">
            </div>

            <div class="filter__complexity_filter">
              <p>Уровень уровень заданий:</p>
              <select v-model="selectedLVL" class="topic-section">
                <option value="">Все уровни</option>
                <option value="1">1 LVL</option>
                <option value="2">2 LVL</option>
                <option value="3">3 LVL</option>
              </select>
            </div>
            <div class="filter__topic-filter">
              <p>Предмет:</p>
              <select v-model="selectedTopic" class="topic-section">
                <option value="">Все предметы</option>
                <option value="Математика">Математика</option>
                <option value="Физика">Физика</option>
                <option value="Химия">Химия</option>
              </select>
            </div>
            <div class="filter__class_filter">
              <p>Класс:</p>
              <select v-model="selectedClass" class="topic-section">
                <option value="">Не указан</option>
                <option value="9">9 класс</option>
                <option value="10">10 класс</option>
                <option value="11">11 класс</option>
              </select>
            </div>
            <div class="filter__status_filter">
              <p>Статус:</p>
              <select v-model="selectedStatus" class="topic-section">
                <option value="">Не выбран</option>
                <option :value="false">Не решено</option>
                <option :value="true">Решено</option>
              </select>
            </div>
            <div class="filter__btn">
              <button class="filter__btn__hide" @click="filterSee = !filterSee">Скрыть фильтр</button>
              <button class="filter__btn__reset" @click="resetFilter">Сбросить</button>
            </div>
          </div>
        </div>
<!-- Конец фильтра -->
<!--    Где выводятся задачи    -->
        <div class="div3">
          <TaskList
              v-for="task in paginatedTasks"
              :key="task.id"
              :task="task"
          />
          <div class="pagination-controls">
            <button @click="goToPrevPage" :disabled="currentPage === 1">←</button>
            <span>Страница {{ currentPage }} из {{ totalPages }}</span>
            <button @click="goToNextPage" :disabled="currentPage === totalPages">→</button>
          </div>

        </div>
<!--    Конец этого окна    -->
      </div>

    </div>
  </div>
</template>


<script>
import TaskList from "@/components/TaskList.vue";
import axios from "axios";

export default {
  computed: {
    zadania() {
      return this.$store.state.Temp.zadania;
    },
    filteredTasks() {
      let filtered = this.zadania;

      if (this.selectedTopic) {
        filtered = filtered.filter((task) => task.topic === this.selectedTopic);
      }

      if (this.selectedLVL) {
        filtered = filtered.filter((task) => task.complexity === this.selectedLVL);
      }
      if (this.selectedClass) {
        filtered = filtered.filter((task) => task.class === this.selectedClass);
      }

      if (this.selectedStatus !== '') {
        filtered = filtered.filter((task) => task.status === this.selectedStatus);
      }

      if (this.searchQuery) {
        filtered = filtered.filter((task) =>
            task.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      return filtered;


    },

    paginatedTasks() {
      const start = (this.currentPage - 1) * this.tasksPerPage;
      const end = start + this.tasksPerPage;
      return this.filteredTasks.slice(start, end);
    },

    totalPages() {
      return Math.ceil(this.filteredTasks.length / this.tasksPerPage);
    }
  },
  components: {
    TaskList,
  },
  data() {
    return {
      selectedTopic: '',
      selectedLVL: '',
      selectedClass: '',
      selectedStatus: '',
      searchQuery: '',
      currentPage: 1,
      tasksPerPage: 10,
      filterSee: false,
    }
  },

  methods: {
    resetFilter() {
      this.selectedClass = ''
      this.selectedLVL = ''
      this.selectedTopic = ''
      this.selectedStatus = ''
      this.searchQuery = ''
    },

    goToNextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },

    goToPrevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },

    goToPage(page) {
      this.currentPage = page;
    }
  },
}
</script>

<style scoped lang="scss">
@import '../assets/styles/vars.scss';

.button_trueFilteredSee {
  height: 100%;
  width: 100%;
}

.button_trueFilteredSee:hover {
  background: #0077B1;
  border: 1px solid #0077B1;
  color: white;
}

.pagination-controls {
  display: flex;
  align-items: center;
  justify-content: center;

  &>span {
    margin: 0 5px;
  }

  &>button {
width: 25px;
    text-align: center;
    color: white;
    background: $lightBlueColor;
    border: none;
  }
}

.complexity p {
  margin: 15px 0 5px 0;
}

.window {
  margin-top: 80px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.div1,
.filter,
.div3 {
  border: 2px solid $lightBlueColor;
  padding: 10px;
  border-radius: 1rem;
  width: 100%;
}

.div1 {
  text-align: center;
  background: white;
}

.filter {
  margin-top: 10px;
  text-align: center;
  background: white;

  &__search-bar {


    &>input {
      width: 80%;
      padding: 7px;
      outline: none;
      border: 1px solid $lightBlueColor;
      border-radius: 1rem;
      margin: 5px 0;
    }
  }


  &__btn {


    &__hide, &__reset {
      margin: 10px 5px;
      padding: 8px;
      border-radius: 1rem;
      border: none;
      color: white;
    }

    &__hide {
background: $lightBlueColor;
    }

    &__reset {
background: red;
    }
  }

}

.topic-section {
  font-family: Visitor,serif;
  margin: 5px 0;
  padding: 10px;
  width: 200px;
  border-radius: 1rem;
  font-size: .8rem;
  outline: none;
}

.div3 {
  padding: 15px 0 10px 0;
  text-align: center;
  border: none;
}


</style>