<!-- src/views/DashboardView.vue -->
<template>
    <div class="dashboard-view">
      <HelloWorld />
      <LearningGoals />
      <FullStory />
    </div>
  </template>
  
  <script setup>
  import HelloWorld from '../components/dashboard/HelloWorldComponent.vue';
  import LearningGoals from '@/components/dashboard/LearningGoals.vue';
  import FullStory from '@/components/dashboard/FullStory.vue';

  </script>
  
  <style scoped>
  </style>