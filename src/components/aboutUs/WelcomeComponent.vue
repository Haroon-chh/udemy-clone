<template>
    <div class="container-fluid text-center py-5 banner-container">
      <div class="row align-items-center justify-content-center h-100">
        <div class="col-md-6 my-auto">
          <h1 class="fw-bolder mb-3 large-text">Welcome to where <br>possibilities begin</h1>
        </div>
        <div class="col-md-4 my-auto">
          <img :src="imageUrl" alt="Hero Image" class="img-fluid rounded-circle large-image" />
        </div>
      </div>
      <!-- Black background behind the news text moved to the bottom -->
      <div class="news-banner">
        <a href="#" class="news-link">Check out our latest company news!</a>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        imageUrl: 'https://about.udemy.com/wp-content/uploads/2024/02/about-homepage-hero-jan-2024.png',
      };
    },
  };
  </script>
  
  <style scoped>
  /* Increase the overall height of the component */
  .banner-container {
    height: 550px; /* Slightly increased height */
    background-color: #f8f9fa;
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* Ensures the banner is at the bottom */
  }
  
  /* Increase text size to match the larger component */
  .large-text {
    font-size: 3.4rem; /* Increased font size */
    font-family: 'Times New Roman', Times, serif;
    color: #333;
  }
  
  /* Larger image */
  .large-image {
    border-radius: 70%;
    width: 120%;
    max-width: 500px; /* Increased image size */
  }
  
  /* Black banner at the bottom */
  .news-banner {
    width: 100%;
    background-color: #000;
    padding: 15px 0;
    position: relative;
  }
  
  /* Style for the news text */
  .news-link {
    color: #fff;
    text-decoration: none;
    font-weight: bold;
    font-size: 1.2rem;
  }
  </style>
  