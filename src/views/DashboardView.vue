<!-- src/views/DashboardView.vue -->
<template>
    <div class="dashboard-view">
      <HelloWorld />
      <LearningGoals />
      <Testimonial />
      <CardsRow />
      <SubscriptionCards />
    </div>
  </template>
  
  <script setup>
  import HelloWorld from '../components/dashboard/HelloWorldComponent.vue';
  import LearningGoals from '@/components/dashboard/LearningGoals.vue';
  import Testimonial from '../components/dashboard/TestimonialComponent.vue';

  import CardsRow from '../components/dashboard/CardsRow.vue';
  import SubscriptionCards from '../components/dashboard/SubscriptionCards.vue';
  </script>
  
  <style scoped>
  </style>