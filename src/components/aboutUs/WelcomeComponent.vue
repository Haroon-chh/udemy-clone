<template>
    <div class="container-fluid text-center py-5 banner-container">
      <div class="row align-items-center justify-content-center h-100">
        <div class="col-md-6 my-auto">
          <h1 class="fw-bolder mb-3 large-text">
            Welcome to where <br />
            possibilities begin
          </h1>
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
  /* Container and layout styling */
  .banner-container {
    height: auto; /* Flexible height */
    background-color: #f8f9fa;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 20px;
  }
  
  .large-text {
    font-size: 4rem; /* Default font size */
    font-family: 'Times New Roman', Times, serif;
    color: #333;
    text-align: center;
  }
  
  /* Responsive image */
  .large-image {
    border-radius: 70%;
    width: 100%;
    max-width: 600px; /* Set a max width */
  }
  
  /* Black banner at the bottom */
  .news-banner {
    width: 100%;
    background-color: #000;
    padding: 20px 0;
    position: relative;
  }
  
  /* Style for the news text */
  .news-link {
    color: #fff;
    text-decoration: none;
    font-weight: bold;
    font-size: 1rem;
  }
  
  /* Media queries for responsiveness */
  @media (max-width: 768px) {
    .large-text {
      font-size: 2rem; /* Adjust font size for tablets */
    }
  
    .large-image {
      max-width: 300px; /* Adjust image size for smaller screens */
    }
  
    .news-link {
      font-size: 0.9rem; /* Adjust text size */
    }
  }
  
  @media (max-width: 576px) {
    .large-text {
      font-size: 1.5rem; /* Smaller font for mobile */
    }
  
    .large-image {
      max-width: 250px; /* Smaller image for mobile */
    }
  
    .news-banner {
      padding: 8px 0; /* Adjust padding for smaller screens */
    }
  
    .news-link {
      font-size: 0.8rem; /* Adjust text size */
    }
  }
  </style>
  