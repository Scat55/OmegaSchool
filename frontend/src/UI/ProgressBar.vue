<template>
    <div class="progress-container">
      <div class="progress-bar" :style="progressBarStyle"></div>
      <div :class="[this.score >= 50 ? 'progress-text_white' : '', 'progress-text']">{{ progressText }}</div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      score: {
        type: Number,
        required: true
      }
    },
    computed: {
      progressBarStyle() {
        const width = this.score > 100 ? 100 : this.score;
        return {
          width: width + '%',
          backgroundColor: 'blue',
          height: '20px',
          transition: 'width 0.5s ease',
        };
      },
      progressText() {
        return this.score > 100 ? '100%' : this.score + '%';
      }
    }
  };
  </script>
  
  <style>
  .progress-container {
    width: 100%;
    background-color: #eee;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
  }
  
  .progress-bar {
    border-radius: 4px;
  }
  
  .progress-text {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20px;
    font-weight: bold;
  }

  .progress-text_white {
    color: white;
  }
  </style>
  