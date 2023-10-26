<template>
  <div>
    <div class="container">

      <div class="window">

        <!--    Тут верхняя шапка    -->
            <p>Задания</p>
            <p>Слева вы сможете выбрать фильтры для заданий. <br> По каким предметам, сложность и тд.</p>
          <!-- Фильтр -->
          <div>
<!--            <div class="button_trueFilteredSee filter" v-show="filterSee === false" @click="filterSee = !filterSee">-->
<!--              <div>Показать фильтры <span v-show="hasActiveFilters">( Есть примененные )</span></div>-->
<!--            </div>-->
            <div class="filter" >
              <div>
                <div class="filter__search-bar">
                  <p>Поиск задачи: </p>
                  <input v-model="searchQuery" placeholder="Поиск по названию задачи...">
                </div>

               <div class = "filter__flex">
                 <div class="filter__complexity_filter">
                   <p>Уровень:</p>
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
                     <option value="Биология">Биология</option>
                     <option value="География">География</option>
                     <option value="Информатика">Информатика</option>
                     <option value="Математика">Математика</option>
                     <option value="Технология">Технология</option>
                     <option value="Физика">Физика</option>
                     <option value="Химия">Химия</option>
                   </select>
                 </div>
                 <div class="filter__class_filter">
                   <p>Класс:</p>
                   <select v-model="selectedClass" class="topic-section">
                     <option value="">Не указан</option>
                     <option value="9">8 класс</option>
                     <option value="10">9 класс</option>
                     <option value="11">10 класс</option>
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

                </div>
                <div class="filter__btn">
<!--                  <button class="filter__btn__hide" @click="filterSee = !filterSee">Скрыть фильтр</button>-->
                  <button class="filter__btn__reset" @click="resetFilter">Сбросить</button>
                </div>
              </div>
            </div>
          </div>
        <!--    конец шапки    -->
        <!-- Конец фильтра -->
        <!--    Где выводятся задачи    -->
        <div class="div3">
          <TaskList
              v-for="task in paginatedTasks"
              :key="task.id"
              :task="task"
          />

        </div>
        <!--    Конец этого окна    --> <div v-if="filteredTasks.length === 0" class="no-tasks-message">
        Нет задач, соответствующих выбранным фильтрам.
      </div>
        <div v-if="filteredTasks.length > 0" class="pagination-controls">
          <button @click="goToPrevPage" :disabled="currentPage === 1">←</button>
          <span>Страница {{ currentPage }} из {{ totalPages }}</span>
          <button @click="goToNextPage" :disabled="currentPage === totalPages">→</button>
        </div>
      </div>

    </div>
  </div>
</template>


<script>
import TaskList from "@/components/TaskList.vue";

export default {
  computed: {
    hasActiveFilters() {
      return this.selectedTopic ||
          this.selectedLVL ||
          this.selectedClass ||
          (this.selectedStatus !== '') ||
          this.searchQuery;
    },

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
    },

    updateLocalStorage() {
      const filters = {
        selectedTopic: this.selectedTopic,
        selectedLVL: this.selectedLVL,
        selectedClass: this.selectedClass,
        selectedStatus: this.selectedStatus,
        searchQuery: this.searchQuery,
      };
      localStorage.setItem("filters", JSON.stringify(filters));
    },

    getFiltersFromLocalStorage() {
      const filters = JSON.parse(localStorage.getItem("filters"));
      if (filters) {
        this.selectedTopic = filters.selectedTopic || '';
        this.selectedLVL = filters.selectedLVL || '';
        this.selectedClass = filters.selectedClass || '';
        this.selectedStatus = filters.selectedStatus || '';
        this.searchQuery = filters.searchQuery || '';
      }
    },

    resetFilter() {
      this.selectedClass = '';
      this.selectedLVL = '';
      this.selectedTopic = '';
      this.selectedStatus = '';
      this.searchQuery = '';
      localStorage.removeItem("filters");
    },

    resetPage() {
      this.currentPage = 1;
    }
  },

  watch: {
    selectedTopic() {
      this.updateLocalStorage();
      this.resetPage();
    },
    selectedLVL() {
      this.updateLocalStorage();
      this.resetPage();
    },
    selectedClass() {
      this.updateLocalStorage();
      this.resetPage();
    },
    selectedStatus() {
      this.updateLocalStorage();
      this.resetPage();
    },
    searchQuery() {
      this.updateLocalStorage();
      this.resetPage();
    }
  },

  created() {
    this.getFiltersFromLocalStorage();
  }

}
</script>

<style scoped lang="scss">
@import '../assets/styles/vars.scss';

.button_trueFilteredSee {
  height: 100%;
  width: 100%;
  cursor: pointer;
}

.button_trueFilteredSee:hover {
  background: #0077B1;
  border: 2px solid #0077B1;
  color: white;
}

.pagination-controls {
  display: flex;
  align-items: center;
  justify-content: center;

  & > span {
    margin: 0 5px;
  }

  & > button {
    cursor: pointer;
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

@media (max-width: 1285px) {
  .window {
    padding: 0 7px;
  }
}


.window {
  margin-top: 80px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.div1,
.div3 {
  border: 2px solid $lightBlueColor;
  padding: 10px;
  border-radius: 1rem;
  width: 100%;
}

.div1{
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.filter{
  border: 2px solid $lightBlueColor;
  padding: 10px;
  border-radius: 1rem;
  width: 100%;
}

.div3{
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 100rem;

  @media(min-width: 250px) and (max-width: 1285px) {
    gap: 2rem;
    //flex-wrap: nowrap;
    width: 100%;
  }
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


    & > input {
      width: 80%;
      padding: 0.7rem;
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
      cursor: pointer;
    }

    &__reset {
      background: $lightBlueColor;
      transition: all .3s;

      &:hover{
        transform: scale(1.1);
      }
    }
  }

}

.topic-section {
  font-family: Visitor, serif;
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
.filter__flex{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin: 1rem;

  @media(min-width: 250px) and (max-width: 806px) {
    flex-direction: column;
    flex-wrap: wrap;
  }
  @media(min-width: 806px) and (max-width: 1285px) {
    flex-wrap: wrap;
  }
}

</style>