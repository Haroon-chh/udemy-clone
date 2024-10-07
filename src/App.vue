<template>
  <div id="app">
    <Navbar /> <!-- Navbar Component Added Here -->
    <router-view />
  </div>
</template>

<script setup>
import Navbar from '../src/components/NavbarComponent.vue'; // Import the Navbar Component
</script>

<style scoped>
#app {
  font-family: Arial, sans-serif;
}

.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000; /* Ensures the navbar stays on top */
}
</style>
