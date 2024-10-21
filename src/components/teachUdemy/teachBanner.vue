<template>
  <div>
    <!-- Hero Section -->
    
      <div class="hero-section position-relative">
        <!-- Image -->
        <img 
          src="@/assets/teaching-banner.jpg" 
          alt="Instructor" 
          class="img-fluid w-100 hero-image"
        >
      </div>
        <!-- Overlay Text Content -->
        <div class="hero-content text-dark">
          <h1 class="fw-bold mb-3">Come teach with us</h1>
          <p class="mb-4">Become an instructor and change lives — including your own</p>
          <button class="btn btn-dark w-100">Get started</button>
        </div>
      
    
    

    <!-- Reasons Section -->
    <div class="reasons-section py-5 mt-0">
      <div class="container text-center">
        <h2 class="fw-bold mb-5">So many reasons to start</h2>
        <div class="row justify-content-between">
          <!-- Reason 1 -->
          <div class="col-md-3 d-flex flex-column align-items-center mb-4">
            <img src="@/assets/value1-reward.jpg" alt="Teach your way" class="mb-4">
            <h5 class="fw-bold">Teach your way</h5>
            <p>Publish the course you want, in the way you want, and always have control of your own content.</p>
          </div>
          <!-- Reason 2 -->
          <div class="col-md-3 d-flex flex-column align-items-center mb-4">
            <img src="@/assets/value2-reward.jpg" alt="Inspire learners" class="mb-4">
            <h5 class="fw-bold">Inspire learners</h5>
            <p>Teach what you know and help learners explore their interests, gain new skills, and advance their careers.</p>
          </div>
          <!-- Reason 3 -->
          <div class="col-md-3 d-flex flex-column align-items-center mb-4">
            <img src="@/assets/value3-reward.jpg" alt="Get rewarded" class="mb-4">
            <h5 class="fw-bold">Get rewarded</h5>
            <p>Expand your professional network, build your expertise, and earn money on each paid enrollment.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid text-center text-white py-1 stats-section" style="background-color: #5C2CCB;">
      <!-- Left control button -->
      <button class="carousel-control-prev" onclick="scrollLeft()">
        &#10094; <!-- Left arrow -->
      </button>
    
      <div class="row g-4 mx-3 my-2 stat-carousel">
        <!-- Stat 1 -->
        <div class="col-12 col-md mb-4 d-flex flex-column align-items-center">
          <h2 class="fw-bold">73M</h2>
          <p>Students</p>
        </div>
        <!-- Stat 2 -->
        <div class="col-12 col-md mb-4 d-flex flex-column align-items-center">
          <h2 class="fw-bold">75+</h2>
          <p>Languages</p>
        </div>
        <!-- Stat 3 -->
        <div class="col-12 col-md mb-4 d-flex flex-column align-items-center">
          <h2 class="fw-bold">1B</h2>
          <p>Enrollments</p>
        </div>
        <!-- Stat 4 -->
        <div class="col-12 col-md mb-4 d-flex flex-column align-items-center">
          <h2 class="fw-bold">180+</h2>
          <p>Countries</p>
        </div>
        <!-- Stat 5 -->
        <div class="col-12 col-md mb-4 d-flex flex-column align-items-center">
          <h2 class="fw-bold">16,000+</h2>
          <p>Enterprise customers</p>
        </div>
      </div>
    
      <!-- Right control button -->
      <button class="carousel-control-next" onclick="scrollRight()">
        &#10095; <!-- Right arrow -->
      </button>
    </div>
    

    <!-- How to Begin Section -->
    <div class="container mt-5 ">
      <h2 class="text-center mb-4">How to Begin</h2>

      <!-- Navigation Tabs for Large Screens -->
      <ul class="nav nav-tabs justify-content-center d-none d-md-flex">
        <li class="nav-item">
          <a class="nav-link" :class="{ active: activeTab === 'plan' }" @click.prevent="setActiveTab('plan')" href="#">
            Plan Your Curriculum
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" :class="{ active: activeTab === 'record' }" @click.prevent="setActiveTab('record')" href="#">
            Record Your Video
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" :class="{ active: activeTab === 'launch' }" @click.prevent="setActiveTab('launch')" href="#">
            Launch Your Course
          </a>
        </li>
      </ul>

      <!-- Accordion for Mobile Screens -->
      <div class="accordion d-md-none" id="courseAccordion">
        <div class="accordion-item">
          <h2 class="accordion-header" id="planHeading">
            <button class="accordion-button" type="button" @click="toggleAccordion('plan')" :class="{ collapsed: activeTab !== 'plan' }">
              Plan Your Curriculum
            </button>
          </h2>
          <div class="accordion-collapse collapse" :class="{ show: activeTab === 'plan' }">
            <div class="accordion-body">
              <img src="@/assets/launch-your-course2.jpg" alt="Plan your curriculum" class="img-fluid mb-3" />
              <p>You start with your passion and knowledge. Then choose a promising topic with the help of our Marketplace Insights tool. The way that you teach — what you bring to it — is up to you.</p>
              <h5>How we help you</h5>
              <p>We offer plenty of resources on how to create your first course. And, our instructor dashboard and curriculum pages help keep you organized.</p>
            </div>
          </div>
        </div>

        <!-- Record Your Video -->
        <div class="accordion-item">
          <h2 class="accordion-header" id="recordHeading">
            <button class="accordion-button" type="button" @click="toggleAccordion('record')" :class="{ collapsed: activeTab !== 'record' }">
              Record Your Video
            </button>
          </h2>
          <div class="accordion-collapse collapse" :class="{ show: activeTab === 'record' }">
            <div class="accordion-body">
              <img src="@/assets/launch-your-course1.jpg" alt="Record your video" class="img-fluid mb-3" />
              <p>Use basic tools like a smartphone or a DSLR camera. Add a good microphone and you’re ready to start. If you don't like being on camera, just capture your screen.</p>
              <h5>How we help you</h5>
              <p>Our support team is available to help you throughout the process and provide feedback on test videos.</p>
            </div>
          </div>
        </div>

        <!-- Launch Your Course -->
        <div class="accordion-item">
          <h2 class="accordion-header" id="launchHeading">
            <button class="accordion-button" type="button" @click="toggleAccordion('launch')" :class="{ collapsed: activeTab !== 'launch' }">
              Launch Your Course
            </button>
          </h2>
          <div class="accordion-collapse collapse" :class="{ show: activeTab === 'launch' }">
            <div class="accordion-body">
              <img src="@/assets/launch-your-course3.jpg" alt="Launch your course" class="img-fluid mb-3" />
              <p>Gather your first ratings and reviews by promoting your course through social media and your professional networks.</p>
              <h5>How we help you</h5>
              <p>Our custom coupon tool lets you offer enrollment incentives while our global promotions drive traffic to courses.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab Content for Large Screens -->
      <div class="tab-content d-none d-md-block">
        <div v-if="activeTab === 'plan'" class="tab-pane fade show active">
          <div class="row mt-4 align-items-center">
            <div class="col-md-6">
              <img src="@/assets/launch-your-course2.jpg" alt="Plan your curriculum" class="img-fluid" />
            </div>
            <div class="col-md-6 d-flex flex-column justify-content-center">
              <p>You start with your passion and knowledge. Then choose a promising topic with the help of our Marketplace Insights tool.</p>
              <h5>How we help you</h5>
              <p>We offer resources on how to create your first course. Our instructor dashboard and curriculum pages help keep you organized.</p>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'record'" class="tab-pane fade show active">
          <div class="row mt-4 align-items-center">
            <div class="col-md-6">
              <img src="@/assets/launch-your-course1.jpg" alt="Record your video" class="img-fluid" />
            </div>
            <div class="col-md-6 d-flex flex-column justify-content-center">
              <p>Use basic tools like a smartphone or a DSLR camera. Add a good microphone and you're ready to start. If you don't like being on camera, just capture your screen.</p>
              <h5>How we help you</h5>
              <p>Our support team is available to help you throughout the process and provide feedback on test videos.</p>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'launch'" class="tab-pane fade show active">
          <div class="row mt-4 align-items-center">
            <div class="col-md-6">
              <img src="@/assets/launch-your-course3.jpg" alt="Launch your course" class="img-fluid" />
            </div>
            <div class="col-md-6 d-flex flex-column justify-content-center">
              <p>Gather your first ratings and reviews by promoting your course through social media and your professional networks.</p>
              <h5>How we help you</h5>
              <p>Our custom coupon tool lets you offer enrollment incentives while our global promotions drive traffic to courses.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Call to Action Section -->
    
<div >
  <!-- Text portion and image in the same div -->
  <div class="align-items-center mb-5 justify-content-between bg-light w-100 mt-3">
    <!-- Carousel for Image and Text together -->
    <div class="image-section mx-auto w-75">
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
                  “Teaching lets me share my passion for coding and problem-solving people over the world.”
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
                  “Seeing students grow their skills and confidence is the most most rewarding part of my job.”
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
      <div class="container  d-flex flex-column align-items-center justify-content-center " >
        <!-- For larger screens (laptops, desktops) -->
        <div class="row w-100 d-none d-lg-flex align-items-center">
          <!-- Left Image -->
          <div class="col-lg-4 p-0 d-flex justify-content-start">
            <img
              src="@/assets/support-1LS.jpg"
              id="left-img"
              alt="Left image"
              class="img-fluid larger-image"
            />
          </div>
    
          <!-- Center Text Container -->
          <div class="col-lg-4 text-center px-4">
            <h2 class="header-lg">You won’t have to do it alone</h2>
            <p class="paragraph-lg">
              Our <strong>Instructor Support Team</strong> is here to answer your questions and review your test video,
              while our <strong>Teaching Center</strong> gives you plenty of resources to help you through the process.
              Plus, get the support of experienced instructors in our online community.
            </p>
            <a href="#" class="link-lg">Need more details before you start? Learn more.</a>
          </div>
    
          <!-- Right Image -->
          <div class="col-lg-4 p-0 d-flex justify-content-end">
            <img
              src="@/assets/support-2LS.jpg"
              alt="Right image"
              id="right-img"
              class="img-fluid larger-image"
            />
          </div>
        </div>
    
        <!-- For mobile and small screens -->
        <div class="d-lg-none">
          <div class="row">
            <!-- Image on Top -->
            <div class="col-12 " id="right-img-mobile">
              <img
                src="@/assets/support-1SS.jpg"
                alt="Mobile image"
                class="img-fluid mobile-image"
              />
            </div>
    
            <!-- Text Below Image -->
            <div class="col-12 text-center mt-3 text">
              <h1 class="header-sm">You won’t have to do it alone</h1>
              <p class="paragraph-sm">
                Our <strong>Instructor Support Team</strong> is here to answer your questions and review your test video,
                while our <strong>Teaching Center</strong> gives you plenty of resources to help you through the process.
                Plus, get the support of experienced instructors in our online community.
              </p>
              <a href="#" class="mb-5 fs-10 link-sm">Need more details before you start? Learn more.</a>
            </div>
          </div>
        </div>
      </div>
      <div class="container-overall" style="background-color: #F7F9FA;">
        <div class="container-fluid d-flex p-5 align-items-center justify-content-center">
          <div class="text-center">
            <h1 class="font-weight-bold">Become an instructor today</h1>
            <p>
              Join one of the world’s largest online learning<br />
              marketplaces.
            </p>
            <button class="btn btn-primary no-border-radius">Get Started</button>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  setup() {
    // Reactive state variables
    const activeTab = ref('plan');
    const images = [
      require('@/assets/frank.jpg'), // Update with your image paths
      require('@/assets/merry.jpg'),
      require('@/assets/paul.jpg'),
    ];
    const currentSlide = ref(0);

    // Function to set the active tab
    const setActiveTab = (tab) => {
      activeTab.value = tab;
    };

    // Function to toggle the accordion
    const toggleAccordion = (tab) => {
      if (activeTab.value === tab) {
        activeTab.value = null;
      } else {
        activeTab.value = tab;
      }
    };

    // Function to update the current slide
    const updateSlide = (event) => {
      currentSlide.value = event.to;
    };

    // Lifecycle hooks
    onMounted(() => {
      const carousel = document.querySelector("#carouselExample");
      carousel.addEventListener("slid.bs.carousel", updateSlide);
    });

    onBeforeUnmount(() => {
      const carousel = document.querySelector("#carouselExample");
      carousel.removeEventListener("slid.bs.carousel", updateSlide);
    });

    // Return state and methods to the template
    return {
      activeTab,
      images,
      currentSlide,
      setActiveTab,
      toggleAccordion,
    };
  },
};
</script>

<style scoped>
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
.hero-section {
  position: relative;
  overflow: hidden; /* Prevents content overflow */
}
@media (max-width: 768px) {
 
  .hero-image {
    height: auto; /* Allows natural height */
    width: 100%;
    content: url('@/assets/teaching-baner-responsive.jpg');  /* Responsive image */
    
  }
  .hero-content {
      padding: 20px;
      margin-top: 130px;
      text-align: left;
  }

  h1 {
      font-size: 2rem; /* Using rem for responsiveness */
  }

  p {
      font-size: 1rem; /* Adjust font sizes for readability */
  }
}

.reasons-section {
  display: flex;
  justify-content: space-between;
  text-align: center;
  padding: 20px;
}

.reason {
  flex: 1;
  margin: 10px;
}

.reason img {
  width: 100px;
  height: auto;
}

.reason h3 {
  font-size: 1.5rem;
}

.reason p {
  font-size: 1rem;
}

/* Responsive for smaller screens */
@media (max-width: 768px) {
  .reasons-section {
      flex-direction: column;
      align-items: center;
  }

  .reason {
      margin: 20px 0;
  }

  .reason img {
      width: 80px;
  }

  .reason h3 {
      font-size: 1.2rem;
  }

  .reason p {
      font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .reason img {
      width: 60px;
  }

  .reason h3 {
      font-size: 1rem;
  }

  .reason p {
      font-size: 0.8rem;
  }
}


.accordion-button {
  font-weight: bold;
}

.accordion-body h5 {
  font-weight: bold;
}

.tab-content p {
  font-size: 1.1rem;
}
.custom-arrow {
  background-color: #333; /* Dark gray background for circular button */
  border-radius: 50%; /* Make it circular */
  width: 40px; /* Button size */
  height: 40px; /* Button size */
  display: flex;
  align-items: center;
  justify-content: center;
  border: none; /* Remove any border */
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2); /* Add slight shadow for a 3D effect */
  top: 100px
  
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  background-image: none; /* Remove the default icon */
  display: inline-block;
  width: 12px;
  height: 12px;
  border-right: 2px solid white; /* White arrow */
  border-bottom: 2px solid white; /* White arrow */
  transform: rotate(-45deg); /* Rotate to form an arrow */
}

.carousel-control-prev-icon {
  transform: rotate(135deg); /* Flip the arrow for "previous" */
}

.carousel-control-next-icon {
  transform: rotate(-45deg); /* Standard arrow for "next" */
}

.custom-arrow:hover {
  background-color: #555; /* Slightly lighter gray on hover */
  cursor: pointer;
}
@media (max-width: 768px) {
  .carousel-img {
    width: 60%; /* Larger image on small screens */
    height: auto;
    margin-top: 3rem;
  }
  p{
    font-size: small;
  }
}
@media (min-width: 1024px) and (max-width: 1440px) {
  .carousel-img {
    width: 20%; /* Larger image on small screens */
    height: auto;
    
  }
 
}
@media (max-width: 768px) {
  .stats-section .row {
    flex-direction: row;
    flex-wrap: wrap; /* Allow items to wrap to the next line if needed */
    justify-content: center; /* Center the content */
    text-align: center;
  }

  .stats-section h2 {
    font-size: 1.2rem; /* Adjust font size for smaller screens */
  }

  .stats-section p {
    font-size: 0.8rem;
  }

  .stats-section .col-md {
    flex: 0 0 45%; /* Set the width of each stat block to take about half of the screen */
    margin-bottom: 1rem; /* Add spacing between items */
  }

  /* Specific rule for the 16,000+ Enterprise customers */
  .stats-section .col-12.col-md:nth-child(5) {
    margin-top: 20px;
    flex: 0 0 100%; /* Make the last item full width on mobile */
  }
}
</style>
