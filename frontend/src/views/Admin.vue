<template>
  <div class="admin">
    <div class="admin__header">
      <div class="container">
        <div class="admin__header-tabs">
          <button class="admin__header-tab" @click="showTable">Проверка заданий</button>
          <button class="admin__header-tab" @click="showTasks">Добавить задание</button>
        </div>
      </div>
    </div>
    <div class="admin__content">
      <div class="container">
        <div class="admin__content-table" v-if="table">
          <Table />
        </div>
        <div class="admin__content-tasks" v-if="checkTask">Задания</div>
      </div>
    </div>
  </div>
</template>

<script>
import Table from '@/components/Table.vue';
export default {
  components: { Table },
  data() {
    return {
      table: true,
      checkTask: false,
    };
  },
  methods: {
    showTable() {
      this.table = true;
      this.checkTask = false;
    },
    showTasks() {
      this.checkTask = true;
      this.table = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.admin {
  &__header {
    display: flex;
    align-items: center;
    background-color: #065dfe;
    height: 50px;
    &-tabs {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    &-tab {
      font-family: 'Visitor';
      justify-items: start;
      padding: 0.625rem;
      background-color: #168dfc;
      border: none;
      outline: none;
      color: #fff;
      cursor: pointer;
      border-radius: 0.5rem;
    }
  }
}
.container {
  margin: 0;
}
</style>
