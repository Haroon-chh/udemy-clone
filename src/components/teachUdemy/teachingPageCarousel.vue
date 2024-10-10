<template>
    <section class="hero-section">
      <div class="position-relative h-100 d-flex flex-column justify-content-center">
        <!-- Text portion and image in the same div -->
        <div class="text-container d-flex align-items-center justify-content-between bg-light p-5 w-100">
          <!-- Carousel for Image and Text together -->
          <div class="image-section mx-auto w-50">
            <div id="carouselExample" class="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
              <div class="carousel-inner">
                <!-- First Slide (Image and Text together) -->
                <div class="carousel-item active">
                  <div class="d-flex align-items-center flex-column flex-md-row">
                    <img :src="images[0]" class="d-block w-50 w-md-50 carousel-img" alt="First Image">
                    <div class="text-section mt-3 mt-md-0 text-center text-md-start">
                      <h5 class="fw-bold mb-2">Paulo Dichone</h5>
                      <p class="fw-normal mb-2">Developer (Android Specialty)</p>
                      <blockquote class="blockquote">
                        “Udemy has changed my life. It's allowed me to follow my passion and become a teacher. I love to see my students succeed.”
                      </blockquote>
                    </div>
                  </div>
                </div>
                <!-- Second Slide (Image and Text together) -->
                <div class="carousel-item">
                  <div class="d-flex align-items-center flex-column flex-md-row">
                    <img :src="images[1]" class="d-block w-50 w-md-50 carousel-img" alt="Second Image">
                    <div class="text-section mt-3 mt-md-0 text-center text-md-start">
                      <h5 class="fw-bold mb-2">John Doe</h5>
                      <p class="fw-normal mb-2">Software Engineering</p>
                      <blockquote class="blockquote">
                        “Teaching lets me share my passion for coding and problem-solving with people from all over the world.”
                      </blockquote>
                    </div>
                  </div>
                </div>
                <!-- Third Slide (Image and Text together) -->
                <div class="carousel-item">
                  <div class="d-flex align-items-center flex-column flex-md-row">
                    <img :src="images[2]" class="d-block w-50 w-md-50 carousel-img" alt="Third Image">
                    <div class="text-section mt-3 mt-md-0 text-center text-md-start">
                      <h5 class="fw-bold mb-2">Jane Smith</h5>
                      <p class="fw-normal mb-2">Web Development</p>
                      <blockquote class="blockquote">
                        “Seeing students grow their skills and confidence is the most rewarding part of my job.”
                      </blockquote>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Carousel Controls -->
              <button class="carousel-control-prev custom-arrow" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next custom-arrow" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    data() {
      return {
        images: [
          require('@/assets/frank.jpg'), // Update with your image paths
          require('@/assets/merry.jpg'),
          require('@/assets/paul.jpg')
        ],
        currentSlide: 0, // To track the current slide for changing captions
      };
    },
    mounted() {
      const carousel = document.querySelector("#carouselExample");
      carousel.addEventListener("slid.bs.carousel", this.updateSlide);
    },
    methods: {
      updateSlide(event) {
        this.currentSlide = event.to;
      },
    },
  };
  </script>
  
  <style scoped>
  .hero-section {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .text-container {
    display: flex;
    align-items: center;
    width: 100%;
    background-color: #cacdcf;
  }
  
  .image-section {
    width: 100%;
  }
  
  .carousel img {
    object-fit: cover;
    width: 100%;
    height: auto;
  }
  
  .text-section {
    width: 50%;
    padding-left: 20px;
  }
  
  .blockquote {
    font-style: italic;
    font-size: 1.1rem;
    color: #343a40;
  }
  
  .fw-bold {
    font-weight: 700 !important;
  }
  
  .fw-normal {
    font-weight: 400 !important;
  }
  
  .text-start {
    color: #343a40;
  }
  
  /* Custom styling for smaller carousel controls */
  .custom-arrow {
    background-color: #000;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 100;
  }
  
  .carousel-control-prev {
    left: 10px;
  }
  
  .carousel-control-next {
    right: -3rem;
  }
  
  /* Custom arrow icon styling */
  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    background-image: none;
    border: solid white;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 5px;
    width: 10px;
    height: 10px;
  }
  
  .carousel-control-prev-icon {
    transform: rotate(135deg);
  }
  
  .carousel-control-next-icon {
    transform: rotate(-45deg);
  }
  
  /* Responsive styles for mobile */
  @media (max-width: 768px) {
    .text-container {
      flex-direction: column;
      padding: 0;
    }
  
    .image-section {
      width: 100%;
      text-align: center;
    }
  
    .carousel-img {
      width: 90%;
      margin-left: 0;
      margin-right: 0;
    }
  
    .text-section {
      width: 100%;
      padding-left: 0;
      padding: 10px;
      text-align: center;
    }
  
    .custom-arrow {
      width: 30px;
      height: 30px;
    }
  
    .carousel-control-next {
      right: 10px;
    }
  
    .carousel-control-prev {
      left: 10px;
    }
  }
  
  /* Styles for large screens */
  @media (min-width: 769px) {
    .image-section {
      width: 50%;
    }
  
    .text-section {
      width: 50%;
      padding-left: 20px;
    }
  }
  </style>
  