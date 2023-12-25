<template>
  <div class="admin">
    <div class="admin__header">
      <div class="container">
        <div class="admin__header-tabs">
          <button
            class="admin__header-tab"
            :class="{ 'admin__header-tab--active': table }"
            @click="showTable"
          >
            Результаты тестов
          </button>
          <button
            class="admin__header-tab"
            :class="{ 'admin__header-tab--active': checkTask }"
            @click="showTasks"
          >
            Задания
          </button>
        </div>
      </div>
    </div>
    <div class="admin__content">
      <div class="container">
        <div class="admin__content-table" v-if="table">
          <div class="admin__content-items">
            <div v-for="(team, index) in paginatedTeams" :key="index" class="admin__content-item">
              <div class="admin__content-item-header">
                <h1>Школа: {{ team.school_name }}</h1>
              </div>
              <Table
                :teamName="team.team_name"
                :tasks="team.task_names"
                :question="team.task_names"
                :correctAnswers="team.true_answer"
                :time="team.time"
                :userAnswers="team.answer_comand"
              />
            </div>
          </div>
          <div class="admin__pagination">
            <button class="admin__pagination-btn" @click="prevPage" :disabled="currentPage == 1">
              ‹ Назад
            </button>
            <span class="admin__pagination-info">{{ currentPage }} / {{ pageCount }}</span>
            <button
              class="admin__pagination-btn"
              @click="nextPage"
              :disabled="currentPage === pageCount"
            >
              Вперед ›
            </button>
          </div>
        </div>
        <div class="admin__content-tasks" v-if="checkTask">Задания</div>
      </div>
    </div>
  </div>
</template>

<script>
import Table from '@/components/Table.vue';
import axios from 'axios';

export default {
  components: { Table },
  data() {
    return {
      table: true,
      checkTask: false,
      teamsPerPage: 3,
      currentPage: 1,
      teams: [],
    };
  },
  computed: {
    paginatedTeams() {
      const startIndex = (this.currentPage - 1) * this.teamsPerPage;
      const endIndex = startIndex + this.teamsPerPage;
      return this.teams.slice(startIndex, endIndex);
    },
    pageCount() {
      return Math.ceil(this.teams.length / this.teamsPerPage);
    },
  },
  methods: {
    // formatTime(times) {
    //   return times.map((time) => {
    //     const [minutes, seconds] = time.split(':');
    //     return `${parseInt(minutes, 10)} мин ${parseInt(seconds, 10)} сек`;
    //   });
    // },
    async fetchData() {
      try {
        const response = await axios.get('/commands/getResult/');
        this.teams = response.data;
      } catch (error) {
        console.error('Ошибка при получении данных с сервера:', error);
      }
    },
    showTable() {
      this.table = true;
      this.checkTask = false;
    },
    showTasks() {
      this.checkTask = true;
      this.table = false;
    },
    handlePageClick(page) {
      this.currentPage = page;
    },
    prevPage() {
      if (this.currentPage !== 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.pageCount) {
        this.currentPage++;
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
<style lang="scss" scoped>
.admin {
  &__header {
    background-color: #065dfe;
    height: 50px;
    display: flex;
    align-items: center;
    &-tabs {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    &-tab {
      font-family: 'Visitor';
      padding: 0.625rem;
      background-color: #168dfc;
      border: none;
      outline: none;
      color: #fff;
      cursor: pointer;
      border-radius: 0.5rem;
      transition: background-color 0.3s;
      &--active {
        background-color: #fff;
        color: #065dfe;
      }
      &:hover {
        background-color: #0e74ff;
      }
    }
  }
  &__content {
    &-table,
    &-tasks {
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      margin-top: 20px;
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    &-items {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
    }
  }
  &__content-item {
    width: calc(33.33% - 20px);
    margin-bottom: 20px;

    &-header {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 6.25rem;
      text-align: center;
    }
  }
  &__pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    .admin__pagination-btn {
      margin: 0 5px;
      padding: 5px 10px;
      cursor: pointer;
      background-color: #065dfe;
      color: #fff;
      border: none;
      border-radius: 4px;
      &:hover {
        background-color: #0e74ff;
      }
      &:disabled {
        background-color: #ddd;
        color: #777;
        cursor: not-allowed;
      }
    }
    .admin__pagination-info {
      margin: 0 10px;
      font-size: 14px;
    }
  }
}
</style>
