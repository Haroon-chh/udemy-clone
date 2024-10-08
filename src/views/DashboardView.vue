<!-- src/views/DashboardView.vue -->
<template>
    <div class="dashboard-view">
      <HelloWorld />
      <LearningGoals />
      <Testimonial />
    </div>
  </template>
  
  <script setup>
  import HelloWorld from '../components/dashboard/HelloWorldComponent.vue';
  import LearningGoals from '@/components/dashboard/LearningGoals.vue';
  import Testimonial from '../components/dashboard/TestimonialComponent.vue';

  </script>
  
  <style scoped>
  </style>