src/components/HelloWorld.vue
<template>
    <div class="hello-world">
      <h1>{{ msg }}</h1>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const msg = ref('Hello World!');
  </script>
  
  <style scoped>
  .hello-world {
    text-align: center;
    margin-top: 20px;
  }
  </style>
  