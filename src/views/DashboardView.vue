<!-- src/views/DashboardView.vue -->
<template>
    <div class="dashboard-view">
      <HelloWorld />
      <CarouselComponent />
      <LearningGoals />
      <Testimonial />
      <CardsRow />
      <SubscriptionCards />
      <FullStory />
    </div>
  </template>
  
  <script setup>
  import HelloWorld from '../components/dashboard/HelloWorldComponent.vue';
  import LearningGoals from '@/components/dashboard/LearningGoals.vue';
  import Testimonial from '../components/dashboard/TestimonialComponent.vue';
  import FullStory from '@/components/dashboard/FullStory.vue';

  import CardsRow from '../components/dashboard/CardsRow.vue';
  import SubscriptionCards from '../components/dashboard/SubscriptionCards.vue';
  import CarouselComponent from '../components/dashboard/CarouselComponent.vue';
  </script>
  
  <style scoped>
  </style>