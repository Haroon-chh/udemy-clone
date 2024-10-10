<!-- src/views/DashboardView.vue -->
<template>
    <div class="signup-view">
      <teachBanner />
      <rewardSection />
      <achievementSection />
      <howtoBegin /> 
      <teachingCarousel />
    </div>
  </template>
  
  <script setup>
  import rewardSection from '@/components/teachUdemy/rewardSection.vue';
  import teachBanner from '../components/teachUdemy/teachBanner.vue';
  import achievementSection from '../components/teachUdemy/achievementSection.vue';
  import howtoBegin from '../components/teachUdemy/howToBeginSection.vue';
  import teachingCarousel from '../components/teachUdemy/teachingPageCarousel.vue';

  

 
  </script>
  
  <style scoped>
  </style>