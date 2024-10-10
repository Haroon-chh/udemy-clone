<template>
    <div class="hero-section position-relative">
      <!-- Image -->
      <img 
        src="@/assets/teaching-banner.jpg" 
        alt="Instructor" 
        class="img-fluid w-100 hero-image"
      >
  
      <!-- Overlay Text Content -->
      <div class="hero-content text-dark">
        <h1 class="fw-bold mb-3">Come teach with us</h1>
        <p class="mb-4">Become an instructor and change lives — including your own</p>
        <button class="btn btn-dark w-100">Get started</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "TeachBanner",
  };
  </script>
  
  <style scoped>
  * {
    font-family: 'Suisse Works', serif;
  }
  
  .hero-section {
    height: 100vh; /* Full screen height */
    overflow: hidden;
    position: relative;
  }
  
  .hero-image {
    height: 100%;
    object-fit: cover;
  }
  
  .hero-content {
    position: absolute;
    top: 50%;
    left: 5%;
    transform: translateY(-50%);
    max-width: 600px;
    z-index: 10;
    color: #2D2F31;
  }
  
  /* Button styling */
  button {
    font-size: 1rem;
    border-radius: 0;
  }
  
  /* Responsive Styling */
  @media (max-width: 768px) {
    .hero-section {
      height: auto; /* Allow height to adapt */
    }
  
    .hero-image {
      height: auto; /* Adapt image size */
      object-fit: cover;
      content: url('@/assets/teaching-baner-responsive.jpg'); /* Change image on small screens */
    }
  
    .hero-content {
      position: relative;
      top: auto;
      left: 10px; /* Minimal left margin */
      transform: none;
      max-width: 100%;
      text-align: left; /* Align text to the left */
      padding: 20px;
      margin-top: 20px;
    }
  
    h1, p {
      white-space: nowrap; /* Prevent line breaks */
      overflow: hidden; /* Hide overflow text */
      text-overflow: ellipsis; /* Show ellipsis for overflow text */
    }
  
    button {
      width: 100%; /* Make button full width */
      margin: 0; /* Remove margin */
    }
  }
  
  /* Additional small screen adjustments */
  @media (max-width: 576px) {
    .hero-content {
      padding: 10px;
      left: 5px; /* Smaller left margin for very small screens */
    }
  
    h1 {
      font-size: 0.8rem; /* Adjust heading size */
    }
  
    p {
      font-size: 0.7rem; /* Adjust paragraph font size */
    }
  
    button {
      font-size: 0.7rem;
      padding: 0.5rem 1.2rem;
    }
  }
  </style>
  