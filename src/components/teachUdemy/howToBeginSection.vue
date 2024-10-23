<template>
  <div class="container mt-5">
    <!-- Add Heading -->
    <h2 class="text-center mb-4">How to Begin</h2>

    <!-- Navigation Tabs for Large Screens -->
    <ul class="nav nav-tabs justify-content-center d-none d-md-flex">
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: activeTab === 'plan' }"
          @click.prevent="setActiveTab('plan')"
          href="#"
        >
          Plan Your Curriculum
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: activeTab === 'record' }"
          @click.prevent="setActiveTab('record')"
          href="#"
        >
          Record Your Video
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: activeTab === 'launch' }"
          @click.prevent="setActiveTab('launch')"
          href="#"
        >
          Launch Your Course
        </a>
      </li>
    </ul>

    <!-- Accordion for Mobile Screens -->
    <div class="accordion d-md-none" id="courseAccordion">
      <!-- Plan Your Curriculum Accordion Item -->
      <div class="accordion-item">
        <h2 class="accordion-header" id="planHeading">
          <button
            class="accordion-button"
            type="button"
            @click="toggleAccordion('plan')"
            :class="{ collapsed: activeTab !== 'plan' }"
          >
            Plan Your Curriculum
          </button>
        </h2>
        <div
          class="accordion-collapse collapse"
          :class="{ show: activeTab === 'plan' }"
        >
          <div class="accordion-body" v-if="activeTab === 'plan'">
            <img
              src="@/assets/launch-your-course2.jpg"
              alt="Plan your curriculum"
              class="img-fluid mb-3"
            />
            <p>
              You start with your passion and knowledge. Then choose a promising topic with the help of our Marketplace Insights tool. The way that you teach — what you bring to it — is up to you.
            </p>
            <h5>How we help you</h5>
            <p>We offer plenty of resources on how to create your first course. And, our instructor dashboard and curriculum pages help keep you organized.</p>
          </div>
        </div>
      </div>

      <!-- Record Your Video Accordion Item -->
      <div class="accordion-item">
        <h2 class="accordion-header" id="recordHeading">
          <button
            class="accordion-button"
            type="button"
            @click="toggleAccordion('record')"
            :class="{ collapsed: activeTab !== 'record' }"
          >
            Record Your Video
          </button>
        </h2>
        <div
          class="accordion-collapse collapse"
          :class="{ show: activeTab === 'record' }"
        >
          <div class="accordion-body" v-if="activeTab === 'record'">
            <img
              src="@/assets/launch-your-course1.jpg"
              alt="Record your video"
              class="img-fluid mb-3"
            />
            <p>
              Use basic tools like a smartphone or a DSLR camera. Add a good microphone and you’re ready to start. If you don't like being on camera, just capture your screen. Either way, we recommend two hours or more of video for a paid course.
            </p>
            <h5>How we help you</h5>
            <p>Our support team is available to help you throughout the process and provide feedback on test videos.</p>
          </div>
        </div>
      </div>

      <!-- Launch Your Course Accordion Item -->
      <div class="accordion-item">
        <h2 class="accordion-header" id="launchHeading">
          <button
            class="accordion-button"
            type="button"
            @click="toggleAccordion('launch')"
            :class="{ collapsed: activeTab !== 'launch' }"
          >
            Launch Your Course
          </button>
        </h2>
        <div
          class="accordion-collapse collapse"
          :class="{ show: activeTab === 'launch' }"
        >
          <div class="accordion-body" v-if="activeTab === 'launch'">
            <img
              src="@/assets/launch-your-course3.jpg"
              alt="Launch your course"
              class="img-fluid mb-3"
            />
            <p>
              Gather your first ratings and reviews by promoting your course through social media and your professional networks. Your course will be discoverable in our marketplace where you earn revenue from each paid enrollment.
            </p>
            <h5>How we help you</h5>
            <p>
              Our custom coupon tool lets you offer enrollment incentives while our global promotions drive traffic to courses. There’s even more opportunity for courses chosen for Udemy Business.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tab content for Large Screens -->
    <div class="tab-content d-none d-md-block">
      <div v-if="activeTab === 'plan'" class="tab-pane fade show active">
        <div class="row mt-4 align-items-center">
          <div class="col-md-6">
            <img src="@/assets/launch-your-course2.jpg" alt="Plan your curriculum" class="img-fluid" />
          </div>
          <div class="col-md-6 d-flex flex-column justify-content-center text-center text-md-start">
            <p>
              You start with your passion and knowledge. Then choose a promising topic with the help of our Marketplace Insights tool. The way that you teach — what you bring to it — is up to you.
            </p>
            <h5>How we help you</h5>
            <p>We offer plenty of resources on how to create your first course. And, our instructor dashboard and curriculum pages help keep you organized.</p>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'record'" class="tab-pane fade show active">
        <div class="row mt-4 align-items-center">
          <div class="col-md-6">
            <img src="@/assets/launch-your-course1.jpg" alt="Record your video" class="img-fluid" />
          </div>
          <div class="col-md-6 d-flex flex-column justify-content-center text-center text-md-start">
            <p>
              Use basic tools like a smartphone or a DSLR camera. Add a good microphone and you’re ready to start. If you don't like being on camera, just capture your screen. Either way, we recommend two hours or more of video for a paid course.
            </p>
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
          <div class="col-md-6 d-flex flex-column justify-content-center text-center text-md-start">
            <p>
              Gather your first ratings and reviews by promoting your course through social media and your professional networks. Your course will be discoverable in our marketplace where you earn revenue from each paid enrollment.
            </p>
            <h5>How we help you</h5>
            <p>
              Our custom coupon tool lets you offer enrollment incentives while our global promotions drive traffic to courses. There’s even more opportunity for courses chosen for Udemy Business.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'plan', // Default to the first tab
    };
  },
  methods: {
    toggleAccordion(tab) {
      // Ensure only the clicked accordion is opened
      this.activeTab = this.activeTab === tab ? '' : tab;
    },
    setActiveTab(tab) {
      // Switch between tabs on large screens
      this.activeTab = tab;
    },
  },
};
</script>

<style scoped>
/* Styling for both mobile and large screens */
.nav-tabs {
  border-bottom: 2px solid #ccc;
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 18px;
  font-weight: bold;
}

.nav-item {
  margin-right: 30px;
}

.nav-link {
  color: #555;
  border: none;
  padding: 10px 20px;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #000;
}

.tab-pane {
  display: none;
}

.tab-pane.show.active {
  display: block;
}

/* Accordion button without borders or background when active */
.accordion-button {
  font-family: 'Suisse Works', serif;
  font-size: 10px;
  font-weight: bold;
  color: #555;
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

.accordion-button:not(.collapsed) {
  color: #000;
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

/* Remove the default focus outline */
.accordion-button:focus {
  box-shadow: none !important;
}

/* Style the accordion body images */
.accordion-body img {
  border-radius: 10px;
}

.tab-content p {
  font-family: 'Arial', sans-serif;
  color: #333;
  line-height: 1.7;
}

h5 {
  font-size: 20px;
  color: #000;
}

.img-fluid {
  border-radius: 10px;
  margin-top: 20px;
}
</style>
