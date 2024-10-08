<!-- src/views/DashboardView.vue -->
<template>
  <div class="dashboard-view">
    <HelloWorldComponent />
    <CarouselComponent/>
  </div>
</template>

<script setup>

import HelloWorldComponent from '../components/dashboard/HelloWorldComponent.vue';
import CarouselComponent from '../components/dashboard/CarouselComponent.vue';
</script>

<style scoped>
.dashboard-view {
  padding: 20px;
}
</style>
