<template>
    <div class="d-flex">
      <!-- Side Panel -->
      <div class="side-panel p-3">
        <div class="btn-group-vertical w-100">
          <button
            v-for="(category, index) in categories"
            :key="index"
            class="btn category-btn my-2 w-100"
          >
            {{ category }}
          </button>
        </div>
      </div>
  
      <!-- Main Content Area -->
      <div class="content flex-grow-1 p-3">
        <h4>Main Content Area</h4>
        <p>You can place your main content here.</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'SidePanelComponent',
    setup() {
      // Define categories as a ref to make it reactive
      const categories = ref([
        'NavBar',
        'About Us',
        'Contact Us',
        'Teach On Udemy',
        'Footer',
      ]);
  
      // Return reactive state to the template
      return { categories };
    },
  };
  </script>
  
  <style scoped>
  .side-panel {
    width: 300px; /* Increased width of the side panel */
    height: 100vh; /* Full height */
    background-color: #5a2ee3; /* Side panel background color */
  }
  
  /* Professional styling for category buttons */
  .category-btn {
    background-color: #5a2ee3; /* Same background color as side panel */
    color: white; /* White text */
    border: 2px solid white; /* White border */
    padding: 10px 20px; /* Add padding for a larger button size */
    border-radius: 8px; /* Rounded corners */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Slight shadow for depth */
    transition: all 0.3s ease; /* Smooth transition for hover effects */
    font-size: 16px; /* Slightly larger font size */
    font-weight: 500; /* Medium font weight */
  }
  
  .category-btn:hover {
    background-color: #483dbb; /* Darker shade on hover */
    color: white; /* Keep text white on hover */
    border-color: #ddd; /* Lighten the border on hover */
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2); /* Enhance shadow on hover */
    transform: translateY(-2px); /* Lift button on hover */
  }
  
  .content {
    background-color: #f8f9fa; /* Light background for contrast */
  }
  </style>
``  