<template>
  <div id="carouselExampleControls" class="carousel slide mt-0" data-bs-ride="carousel" data-bs-interval="3000">
    <div class="carousel-inner">
      <div class="carousel-item" :class="{ active: index === 0 }" v-for="(image, index) in images" :key="index">
        <img :src="getImageUrl(index)" class="d-block w-100 carousel-image" alt="slide image">

        <!-- First Image's Card (Fixed) -->
        <div class="card custom-card d-flex flex-column" v-if="index === 0">
          <div class="card-body">
            <h2 class="card-title">Learning that gets you</h2>
            <p class="card-text">Skills for your present (and your future). Get started with us.</p>
          </div>
        </div>

        <!-- Second Image's Card (Matches Attached Image) -->
        <div class="card custom-card d-flex flex-column" v-else>
          <div class="card-body">
            <h2 class="card-title">Skills that drive you forward</h2>
            <p class="card-text">Technology and the world of work change fast — with us, you’re faster. Get the skills to achieve goals and stay competitive.</p>
            <div class="button-group d-flex justify-content-start flex-column flex-md-row">
              <button class="btn btn-dark custom-btn">Plan for individuals</button>
              <button class="btn btn-outline-dark custom-btn btn2">Plan for organizations</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Custom Carousel Controls (Smaller, Centered) -->
    <button class="carousel-control-prev custom-arrow" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next custom-arrow" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'CarouselComponent',
  data() {
    return {
      largeScreenImages: [
        'dashboard-carousel-img1.jpg', 
        'dashboard-carousel-img2.jpg'
      ],
      smallScreenImages: [
        'dashboard-carousel-img-SmallScreen1.jpg', 
        'dashboard-carousel-img-SmallScreen2.jpg'
      ],
      isSmallScreen: false,
    };
  },
  computed: {
    images() {
      // Return the correct set of images based on screen size
      return this.isSmallScreen ? this.smallScreenImages : this.largeScreenImages;
    }
  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize);
  },
  beforeUnmount() { // Replacing beforeDestroy with beforeUnmount
    window.removeEventListener('resize', this.checkScreenSize);
  },
  methods: {
    getImageUrl(index) {
      // Return the appropriate image URL based on the screen size
      const image = this.images[index];
      return require(`@/assets/${image}`);
    },
    checkScreenSize() {
      // Update the flag for small screens
      this.isSmallScreen = window.innerWidth <= 768; // Small screens are 768px and below
    }
  }
};
</script>

<style scoped>
.carousel {
  margin: 50px auto;
  max-width: 100%; 
}

.custom-card {
  position: absolute;
  top: 50%;
  left: 5rem;
  transform: translateY(-50%);
  width: 32rem;
  background-color: #FFFFFF;
  z-index: 10;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Responsive for smaller screens */
@media (max-width: 768px) {
  .custom-card {
    position: relative;
    top: auto;
    left: auto;
    transform: none;
    width: 100%;
    margin-top: 10px;
  }

  .button-group {
    flex-direction: column;
    margin-left: 5%;
    margin-right: 3%;
  }

  .carousel-image {
    height: auto;
  }

  /* Hide carousel control buttons on small screens */
  .carousel-control-prev,
  .carousel-control-next {
    display: none;
    visibility: hidden;
  }
}

.card-text {
  margin-top: 1.5rem;
}

.custom-card h2 {
  font-size: 24px;
  font-weight: bold;
}

.custom-card p {
  font-size: 16px;
  color: #333;
}

/* Styling for buttons */
.custom-btn {
  padding: 10px;
  border-radius: 0px;
  width: auto;
  margin: 1rem 1rem 0 0;
}

.button-group {
  margin-top: 10px;
  gap: 10px;
}

.btn-dark {
  background-color: #000;
  border-color: #000;
}

.btn-outline-dark {
  color: #000;
  border-color: #000;
}

.btn-outline-dark:hover {
  background-color: #c0bdbd;
  color: #0c0c0c;
}

/* Custom arrow button styles */
.custom-arrow {
  background-color: #000; /* Dark black background */
  border-radius: 50%;     /* Circular shape */
  width: 35px;            /* Smaller size */
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;               /* Vertically centered */
  transform: translateY(-50%);
  z-index: 100;
}

.carousel-control-prev {
  left: 10px;             /* Position to the left */
}

.carousel-control-next {
  right: 10px;            /* Position to the right */
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  background-image: none;  /* Remove default arrow icon */
  border: solid white;
  border-width: 0 2px 2px 0; /* Create custom arrow shape */
  display: inline-block;
  padding: 5px;
  width: 10px;
  height: 10px;
}

.carousel-control-prev-icon {
  transform: rotate(135deg); /* Left arrow */
}

.carousel-control-next-icon {
  transform: rotate(-45deg); /* Right arrow */
}
</style>