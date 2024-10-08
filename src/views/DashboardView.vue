<!-- src/views/DashboardView.vue -->
<template>
  <div class="dashboard-view">
    <HelloWorld />
    <CarouselComponent/>
  </div>
</template>

<script setup>
import HelloWorld from '../components/dashboard/HelloWorldComponent.vue';
import CarouselComponent from '../components/dashboard/CarouselComponent.vue';
</script>

<style scoped>
.dashboard-view {
  padding: 20px;
}
</style>
