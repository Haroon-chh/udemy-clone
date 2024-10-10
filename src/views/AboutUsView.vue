<!-- src/views/DashboardView.vue -->
<template>
    <div class="about-view">
      <WelcomeComponent />
      <SkillComponent />
      <CreatingImpact />
      <LearnMore />

      
    </div>
  </template>
  
  <script setup>
import WelcomeComponent from '@/components/aboutUs/WelcomeComponent.vue';
import SkillComponent from '@/components/aboutUs/SkillComponent.vue';
import CreatingImpact from '@/components/aboutUs/CreatingImpact.vue';
import LearnMore from '@/components/aboutUs/LearnMore.vue';
 
  </script>
  
  <style scoped>
  </style>