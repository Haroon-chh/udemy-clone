<!-- src/views/DashboardView.vue -->
<template>
    <div class="dashboard-view">
      <HelloWorld />
      <SubscriptionCards />
    </div>
  </template>
  
  <script setup>
  import HelloWorld from '../components/dashboard/HelloWorldComponent.vue';
  import SubscriptionCards from '../components/dashboard/SubscriptionCards.vue';
  </script>
  
  <style scoped>
  .dashboard-view {
    padding: 20px;
  }
  </style>
  