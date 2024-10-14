<template>
  
    <!-- Text portion and image in the same div -->
    <div class=" align-items-center mb-5 justify-content-between bg-light w-100">
      <!-- Carousel for Image and Text together -->
      <div class="image-section mx-auto  w-75">
        <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <!-- First Slide (Image and Text together) -->
            <div class="carousel-item active">
              <div class="d-flex align-items-center flex-column flex-md-row">
                <img :src="images[0]" class="d-block carousel-img mx-5" alt="First Image" />
                <div class="text-section mt-3 mt-md-0 text-center text-md-start">
                  <h5 class="fw-bold mb-2">Paulo Dichone</h5>
                  <p class="fw-normal mb-2">Developer (Android Specialty)</p>
                  <blockquote class="blockquote">
                    “Udemy has changed my life. It's allowed me to follow my passion and become a teacher.”
                  </blockquote>
                </div>
              </div>
            </div>
            <!-- Second Slide (Image and Text together) -->
            <div class="carousel-item">
              <div class="d-flex align-items-center flex-column flex-md-row">
                <img :src="images[1]" class="d-block carousel-img mx-5" alt="Second Image" />
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
                <img :src="images[2]" class="d-block carousel-img mx-5" alt="Third Image" />
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
  
</template>

<script>
export default {
  data() {
    return {
      images: [
        require('@/assets/frank.jpg'), // Update with your image paths
        require('@/assets/merry.jpg'),
        require('@/assets/paul.jpg'),
      ],
      currentSlide: 0,
    };
  },
  mounted() {
    const carousel = document.querySelector("#carouselExample");
    carousel.addEventListener("slid.bs.carousel", this.updateSlide);
  },
  beforeUnmount() {
    const carousel = document.querySelector("#carouselExample");
    carousel.removeEventListener("slid.bs.carousel", this.updateSlide);
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
  min-height: 300px;
}

.image-section {
  width: 100%;
}

.carousel-img {
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

/* Custom styling for carousel controls */
.custom-arrow {
  background-color: #000;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 45%;
  transform: translateY(-50%);
  z-index: 100;
}

.carousel-control-prev {
  left: 10px;
}

.carousel-control-next {
  right: 10px;
}

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

/* Responsive styles for all screen sizes */
@media (max-width: 768px) {
  .text-container {
    flex-direction: column;
    padding: 0;
    min-height: 100px;
  }


  .helo{
    color:#000;
  }

  .image-section {
    width: 100%;
    text-align: center;
  }

  .carousel-img {
    width: 100%;
    margin-top: 210px;
  }

  .text-section {
    width: 100%;
    padding: 10px;
    text-align: center;
  }

  .custom-arrow {
    width: 30px;
    height: 30px;
    top: 310px;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .text-container {
    min-height: 350px;
  }

  .image-section {
    width: 50%;
  }

  .carousel-img {
    width: 75%;
    max-width: 400px; /* Adjust this value as needed */
  }

  .text-section {
    width: 50%;
    padding-left: 20px;
  }
}

@media (min-width: 1025px) and (max-width: 1440px) {
  .image-section {
    width: 50%;
  }

  .carousel-img {
    width: 20%; /* Make the image slightly smaller for larger screens */
    max-width: 600px; /* Adjust this value as needed */
  }

  .text-section {
    width: 50%;
    padding-left: 20px;
  }

  .custom-arrow {
    width: 30px;
    height: 30px;
  }
}

@media (min-width: 1441px) {
  .image-section {
    width: 50%;
  }

  .carousel-img {
    width: 60%; /* Adjust for extra-large screens */
    max-width: 800px; /* Adjust this value as needed */
  }

  .text-section {
    width: 50%;
    padding-left: 20px;
  }

  .custom-arrow {
    width: 30px;
    height: 30px;
  }
}
</style>
