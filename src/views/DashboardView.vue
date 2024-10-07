<!-- src/views/DashboardView.vue -->
<template>
    <div class="dashboard-view">
      <HelloWorld />
      <LearningGoals />
    </div>
  </template>
  
  <script setup>
  import HelloWorld from '../components/dashboard/HelloWorldComponent.vue';
  import LearningGoals from '@/components/dashboard/LearningGoals.vue';

  </script>
  
  <style scoped>
  </style>