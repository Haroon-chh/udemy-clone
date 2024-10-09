<template>
    <transition name="fade">
      <div v-if="show" class="success-popup">
        {{ message }}
      </div>
    </transition>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'SuccessPopup',
    props: {
      show: Boolean,
      message: String
    }
  })
  </script>
  
  <style scoped>
  .success-popup {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
    border-radius: 4px;
    padding: 10px 20px;
    z-index: 10000;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  </style>