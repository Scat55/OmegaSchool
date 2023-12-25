<template>
  <div class="task">
    <div class="container">
      <div class="task__content">
        <div class="task__content-title">
          <h1>{{ taskTitle }}</h1>
          <p class="task__content-timer">
            {{ minutes }}:{{ seconds < 10 ? '0' : '' }}{{ seconds }}
          </p>
        </div>
        <!-- <div class="task__content-description">{{ taskDescription }}</div> -->
        <div v-html="taskDescription"></div>
        <div class="task__content-answer">
          <textarea class="textarea" v-model="answer"></textarea>
        </div>
        <div class="task__content-btn">
          <button class="btn" @click="nextTask">Далее</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
setTimeout(()=>{
  document.getElementById('myImage').addEventListener('click', function() {
  this.classList.toggle('enlarged');
});
},2000)
</script>

<script>
export default {
  props: {
    taskId: {
      type: String,
      required: true,
    },
    taskTitle: {
      type: String,
      required: true,
    },
    taskDescription: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      minutes: 1,
      seconds: 0,
      timerRunning: false,
      timer: null,
      answer: '',
    };
  },
  methods: {
    toggleTimer() {
      if (this.timerRunning) {
        this.stopTimer();
      } else {
        this.startOrResumeTimer();
      }
    },
    startTimer() {
      this.timerRunning = true;
      const updateTimer = () => {
        if (this.minutes === 0 && this.seconds === 0) {
          this.stopTimer();
        } else {
          if (this.seconds === 0) {
            this.minutes--;
            this.seconds = 59;
          } else {
            this.seconds--;
          }
          this.saveTimerState();
        }
      };
      this.timer = setInterval(updateTimer, 1000);
    },
    startOrResumeTimer() {
      if (!this.timerRunning) {
        this.timerRunning = true;
        this.timer = setInterval(() => {
          if (this.minutes === 0 && this.seconds === 0) {
            this.stopTimer();
          } else {
            if (this.seconds === 0) {
              this.minutes--;
              this.seconds = 59;
            } else {
              this.seconds--;
            }
            this.saveTimerState();
          }
        }, 1000);
      }
    },
    nextTask() {
      this.resetTimer(); // Сбрасываем таймер до 1 минуты
      // this.saveTimerState(); // Сохраняем состояние таймера (если нужно)
      this.saveResult();
      this.$emit('nextTask'); // Сигнализируем родителю о переходе к следующей задаче
      this.answer = '';
    },
    resetTimer() {
      this.minutes = 1;
      this.seconds = 0;
    },
    saveResult() {
      const time2 = JSON.parse(localStorage.getItem(`timerState-${this.taskId}`));
      const result = {
        answer: this.answer,
        time: `${time2.minutes}:${time2.seconds < 10 ? '0' : ''}${time2.seconds}`,
      };
      localStorage.removeItem(`timerState-${this.taskId}`);
      this.$emit('saveResult', result);
    },
    stopTimer() {
      this.timerRunning = false;
      clearInterval(this.timer);
      this.saveTimerState();
    },
    saveTimerState() {
      localStorage.setItem(
        `timerState-${this.taskId}`,
        JSON.stringify({
          minutes: this.minutes,
          seconds: this.seconds,
          timerRunning: this.timerRunning,
        }),
      );
    },
    loadTimerState() {
      const timerState = localStorage.getItem(`timerState-${this.taskId}`);
      if (timerState) {
        const parsedState = JSON.parse(timerState);
        this.minutes = parsedState.minutes;
        this.seconds = parsedState.seconds;
        this.timerRunning = parsedState.timerRunning;
        // Убедимся, что таймер не начинается с отсчета до запуска
        if (this.timerRunning && (this.minutes > 0 || this.seconds >= 0)) {
          this.startOrResumeTimer();
        }
      }
    },
  },
  watch: {
    taskId: 'loadTimerState',
  },
  mounted() {
    this.loadTimerState();
    if (!this.timerRunning) {
      this.startTimer();
    }
  },
  beforeDestroy() {
    this.stopTimer();
    this.saveTimerState(); // Добавим сохранение состояния перед уничтожением компонента
  },
};
</script>

<style lang="scss" scoped>
.task {
  &__content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #fff;
    padding: 0.9375rem;
    margin-top: 1rem;
    border-radius: 0.5rem;
    border: 1px solid #000;
    &-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &-btn {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
}
.btn {
  font-family: 'Visitor';
  margin-top: 1rem;
  padding: 0.625rem;
  background-color: rgb(5, 224, 5);
  color: #fff;
  text-align: center;
  border: none;
  outline: none;
  font-size: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
}
.textarea {
  font-family: 'Visitor';
  width: 100%;
  height: 100px;
  resize: none;
  outline: none;
  border-radius: 0.3rem;
  padding: 0.625rem;
  font-size: 1.3rem;
}
</style>
