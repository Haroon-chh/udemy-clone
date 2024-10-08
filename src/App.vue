<template>
  <div id="app">
    <!-- Navbar Section -->
    <div class="navbar">
      <Navbar />
    </div>

    <!-- Main Content Section -->
    <div class="main-body">
      <router-view />
    </div>

    <!-- Footer Section (Sticky Footer) -->
    <div class="footer">
      <Footer />
    </div>
  </div>
</template>

<script setup>
import Navbar from '../src/components/NavbarComponent.vue'; // Import the Navbar Component
import Footer from '../src/components/Footer.vue';// Import the Footer Component
</script>

<style scoped>
.navbar {
  margin: 0%;
}

#app {
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-body {
  flex: 1;
}

.footer {
  text-align: center;
  position: sticky;
  width: 100%;
}
</style>
