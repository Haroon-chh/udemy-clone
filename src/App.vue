<template>
  <div id="app">
    <div class="navbar">  
        <Navbar />
    </div>
    <div class="main-body">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Navbar from '../src/components/NavbarComponent.vue'; // Import the Navbar Component
</script>

<style scoped>
.navbar{
  margin-bottom: 2%;
}
#app {
  font-family: Arial, sans-serif;
}


</style>
