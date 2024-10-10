<!-- src/views/DashboardView.vue -->
<template>
    <div class="signup-view">
      <teachBanner />
      <rewardSection />
      <achievementSection />
      <howtoBegin /> 
    </div>
  </template>
  
  <script setup>
  import rewardSection from '@/components/teachUdemy/rewardSection.vue';
  import teachBanner from '../components/teachUdemy/teachBanner.vue';
  import achievementSection from '../components/teachUdemy/achievementSection.vue';
  import howtoBegin from '../components/teachUdemy/howToBeginSection.vue';
  

 
  </script>
  
  <style scoped>
  </style>