<template>
    <transition name="fade">
      <div v-if="show" class="error-popup">
        {{ message }}
      </div>
    </transition>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'ErrorPopup',
    props: {
      show: Boolean,
      message: String
    }
  })
  </script>
  
  <style scoped>
  .error-popup {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #ffffff;
    color: #721c24;
    border: 1px solid #f5c6cb;
    border-radius: 4px;
    padding: 10px 20px;
    z-index: 1000;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  </style>