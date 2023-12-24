<template>
  <div class="admin">
    <div class="page-container">
      <md-app md-waterfall md-mode="fixed-last">
        <md-app-toolbar class="md-large md-dense md-primary">
          <div class="md-toolbar-row toolbar">
            <md-tabs class="md-primary tabs">
              <md-tab id="tab-home" md-label="Главная" @click="showHome"></md-tab>
              <md-tab id="tab-pages" md-label="Добавить задачу" @click="showTasks"></md-tab>
              <md-tab id="tab-posts" md-label="Проверка" @click="showCheck"></md-tab>
              <!-- <md-tab id="tab-favorites" md-label="Favorites"></md-tab> -->
            </md-tabs>
          </div>
        </md-app-toolbar>

        <!-- Боковое меню -->
        <!-- <md-app-drawer :md-active.sync="menuVisible">
          <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>

          <md-list>
            <md-list-item>
              <md-icon>move_to_inbox</md-icon>
              <span class="md-list-item-text">Inbox</span>
            </md-list-item>

            <md-list-item>
              <md-icon>send</md-icon>
              <span class="md-list-item-text">Sent Mail</span>
            </md-list-item>

            <md-list-item>
              <md-icon>delete</md-icon>
              <span class="md-list-item-text">Trash</span>
            </md-list-item>

            <md-list-item>
              <md-icon>error</md-icon>
              <span class="md-list-item-text">Spam</span>
            </md-list-item>
          </md-list>
        </md-app-drawer> -->

        <md-app-content>
          <div v-if="home">
            <p>Главная</p>
          </div>
          <div v-if="tasks">
            <p>Задачи</p>
          </div>
          <div v-if="checkTask">
            <p>Таблица</p>
          </div>
        </md-app-content>
      </md-app>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LastRowFixed',
  data: () => ({
    menuVisible: false,
    home: true,
    tasks: false,
    checkTask: false,
  }),
  methods: {
    showHome() {
      this.home = true;
      this.tasks = this.checkTask = false;
    },
    showTasks() {
      this.tasks = true;
      this.home = this.checkTask = false;
    },
    showCheck() {
      this.checkTask = true;
      this.home = this.tasks = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.admin {
  font-family: sans-serif;
  background-color: #fff;
  height: 100%;
}

.md-app .md-content.md-theme-default {
  border: none;
}

// Demo purposes only
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
.md-toolbar.md-theme-default.md-primary {
  background-color: rgb(0, 55, 255);
  min-height: 0;
}
.md-toolbar .md-tabs {
  padding: 0;
  background-color: rgb(0, 55, 255);
}
</style>
