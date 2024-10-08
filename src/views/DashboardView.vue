<!-- src/views/DashboardView.vue -->
<template>
    <div class="dashboard-view">
      <HelloWorld />
      <LearningGoals />
      <Testimonial />
      <CardsRow />
    </div>
  </template>
  
  <script setup>
  import HelloWorld from '../components/dashboard/HelloWorldComponent.vue';
  import LearningGoals from '@/components/dashboard/LearningGoals.vue';
  import Testimonial from '../components/dashboard/TestimonialComponent.vue';

  import CardsRow from '../components/dashboard/CardsRow.vue';
  </script>
  
  <style scoped>
  </style>