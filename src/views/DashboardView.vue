<!-- src/views/DashboardView.vue -->
<template>
    <div class="dashboard-view">
      <HelloWorld />
      <CardsRow />
    </div>
  </template>
  
  <script setup>
  import HelloWorld from '../components/dashboard/HelloWorldComponent.vue';
  import CardsRow from '../components/dashboard/CardsRow.vue';
  </script>
  
  <style scoped>
  .dashboard-view {
    padding: 20px;
  }
  </style>
  