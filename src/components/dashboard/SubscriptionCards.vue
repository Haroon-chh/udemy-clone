<template>
  <div class="outer-box" style="border: 2px; padding: 20px; border-radius: 15px; width: 100%;">
    <!-- Text above the cards -->
    <div class="text-container" style="margin-bottom: 40px; text-align: left; font-size: x-large;">
      <h2>Accelerate growth — for you or your organization</h2>
      <p>Reach goals faster with one of our plans or programs. Try one free today or contact sales to learn more.</p>
    </div>

    <!-- The card components container -->
    <div class="cards-container d-flex justify-content-around gap-3 flex-wrap">
      <!-- First Card -->
      <div class="card1 card shadow-sm" :class="{ 'collapsed-card': isMobileView && collapsedCards.includes('personalPlan') }" style="width: 450px; border-radius: 10px; border: 1px solid #ddd;">
        <div class="card-header d-flex justify-content-between align-items-center" style="border-top: 4px solid #3e24ea;">
          <h5 class="card-title">Personal Plan</h5>
          <!-- Toggle button only for mobile view -->
          <button class="btn btn-link p-0 d-md-none" @click="toggleCard('personalPlan')">
            <i :class="collapsedCards.includes('personalPlan') ? 'bi bi-chevron-up' : 'bi bi-chevron-down'"></i>
          </button>
        </div>
        <!-- Card Subheader Section -->
        <div class="card-subheader">
          <p class="card-text text-muted" style="margin-left: 22px;">For you</p>
          <p class="card-text" style="margin-left: 22px; font-weight: 100;">
            <i class="bi bi-person-fill"></i> Individual
          </p>
        </div>
        <!-- Show/hide card content based on mobile view -->
        <div v-if="!isMobileView || !collapsedCards.includes('personalPlan')" class="card-body">
          <p class="card-text"><strong>Starting at $11.00 per month</strong><br /><small class="text-muted">Billed monthly or annually. Cancel anytime.</small></p>
          <button class="btn btn-dark w-100 my-3">Try it free →</button>
          <ul class="list-unstyled">
            <li><i class="bi bi-check-circle-fill text-success" style="margin-right: 7px;"></i> Access to 12,000+ top courses</li>
            <li><i class="bi bi-check-circle-fill text-success" style="margin-right: 7px;"></i> Certification prep</li>
            <li><i class="bi bi-check-circle-fill text-success" style="margin-right: 7px;"></i> Goal-focused recommendations</li>
            <li><i class="bi bi-check-circle-fill text-success" style="margin-right: 7px;"></i> AI-powered coding exercises</li>
          </ul>
        </div>
      </div>

      <!-- Second Card -->
      <div class="card1 card shadow-sm" :class="{ 'collapsed-card': isMobileView && collapsedCards.includes('teamPlan') }" style="width: 450px; border-radius: 10px; border: 1px solid #ddd;">
        <div class="card-header d-flex justify-content-between align-items-center" style="border-top: 4px solid #3e24ea;">
          <h5 class="card-title">Team Plan</h5>
          <button class="btn btn-link p-0 d-md-none" @click="toggleCard('teamPlan')">
            <i :class="collapsedCards.includes('teamPlan') ? 'bi bi-chevron-up' : 'bi bi-chevron-down'"></i>
          </button>
        </div>
        <!-- Card Subheader Section -->
        <div class="card-subheader">
          <p class="card-text text-muted" style="margin-left: 22px;">For your team</p>
          <p class="card-text" style="margin-left: 22px; font-weight: 100;">
            <i class="bi bi-people-fill"></i> 5 to 20 people
          </p>
        </div>
        <div v-if="!isMobileView || !collapsedCards.includes('teamPlan')" class="card-body">
          <p class="card-text"><strong>$360.00 a year per user</strong><br /><small class="text-muted">Billed annually. Cancel anytime.</small></p>
          <button class="btn btn-dark w-100 my-3">Try it free →</button>
          <ul class="list-unstyled">
            <li><i class="bi bi-check-circle-fill text-success" style="margin-right: 7px;"></i> Access to 12,000+ top courses</li>
            <li><i class="bi bi-check-circle-fill text-success" style="margin-right: 7px;"></i> Certification prep</li>
            <li><i class="bi bi-check-circle-fill text-success" style="margin-right: 7px;"></i> Goal-focused recommendations</li>
            <li><i class="bi bi-check-circle-fill text-success" style="margin-right: 7px;"></i> AI-powered coding exercises</li>
            <li><i class="bi bi-check-circle-fill text-success" style="margin-right: 7px;"></i> Analytics and adoption reports</li>
          </ul>
        </div>
      </div>

      <!-- Third Card -->
      <div class="card1 card shadow-sm" :class="{ 'collapsed-card': isMobileView && collapsedCards.includes('enterprisePlan') }" style="width: 450px; border-radius: 10px; border: 1px solid #ddd;">
        <div class="card-header d-flex justify-content-between align-items-center" style="border-top: 4px solid #3e24ea;">
          <h5 class="card-title">Enterprise Plan</h5>
          <button class="btn btn-link p-0 d-md-none" @click="toggleCard('enterprisePlan')">
            <i :class="collapsedCards.includes('enterprisePlan') ? 'bi bi-chevron-up' : 'bi bi-chevron-down'"></i>
          </button>
        </div>
        <!-- Card Subheader Section -->
        <div class="card-subheader">
          <p class="card-text text-muted" style="margin-left: 22px;">For your whole organization</p>
          <p class="card-text" style="margin-left: 22px; font-weight: 100;">
            <i class="bi bi-people-fill"></i> More than 20 people
          </p>
        </div>
        <div v-if="!isMobileView || !collapsedCards.includes('enterprisePlan')" class="card-body">
          <p class="card-text"><strong>Contact Sales For Pricing</strong><br /><br /></p>
          <button class="btn btn-dark w-100 my-3">Request demo →</button>
          <ul class="list-unstyled">
            <li><i class="bi bi-check-circle-fill text-success" style="margin-right: 7px;"></i> Access to 27,000+ top courses</li>
            <li><i class="bi bi-check-circle-fill text-success" style="margin-right: 7px;"></i> Certification prep</li>
            <li><i class="bi bi-check-circle-fill text-success" style="margin-right: 7px;"></i> Goal-focused recommendations</li>
            <li><i class="bi bi-check-circle-fill text-success" style="margin-right: 7px;"></i> AI-powered coding exercises</li>
            <li><i class="bi bi-check-circle-fill text-success" style="margin-right: 7px;"></i> Advanced analytics and insights</li>
            <li><i class="bi bi-check-circle-fill text-success" style="margin-right: 7px;"></i> Dedicated customer success team</li>
            <li><i class="bi bi-check-circle-fill text-success" style="margin-right: 7px;"></i> International course collection featuring 15 languages</li>
            <li><i class="bi bi-check-circle-fill text-success" style="margin-right: 7px;"></i> Customizable content</li>
            <li><i class="bi bi-check-circle-fill text-success" style="margin-right: 7px;"></i> Hands-on tech training with add-on</li>
            <li><i class="bi bi-check-circle-fill text-success" style="margin-right: 7px;"></i> Strategic implementation services with add-on</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const isMobileView = ref(false);
const collapsedCards = ref(['teamPlan', 'enterprisePlan']); // Cards collapsed by default

const checkScreenSize = () => {
  isMobileView.value = window.innerWidth < 768;
};

const toggleCard = (cardId) => {
  if (collapsedCards.value.includes(cardId)) {
    collapsedCards.value = collapsedCards.value.filter((id) => id !== cardId);
  } else {
    collapsedCards.value.push(cardId);
  }
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize);
});
</script>



  <style scoped>

  /* Responsive Styles */

  @media (max-width: 768px) {

    .cards-container {

      flex-direction: column;

      align-items: center;

    }

 

    .card1 {

      width: 100% !important;

      margin-bottom: 20px;

    }

 

    /* Adjust the height of collapsed cards */

    .collapsed-card .card-body {

      display: none; /* Hide the body of the card when collapsed */

    }

 

    .collapsed-card {

      height: 120px; /* Adjust this height based on your content */

    }

  }

  </style>

 