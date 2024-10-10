<!-- src/views/DashboardView.vue -->
<template>
  <div class="dashboard-view">
    <!-- Public components available to all users -->
    <CarouselComponent v-if="!isAdmin" />
    <LearningGoals v-if="!isAdmin" />
    <Testimonial v-if="!isAdmin" />
    <CardsRow v-if="!isAdmin" />
    <SubscriptionCards v-if="!isAdmin" />
    <TrendingNow v-if="!isAdmin" />
    <FullStory v-if="!isAdmin" />
    <News v-if="!isAdmin" />
    <TrustedCompanies v-if="!isAdmin" />

    <!-- Admin-specific components -->

   
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

// Public components
import LearningGoals from '@/components/dashboard/LearningGoals.vue';
import Testimonial from '../components/dashboard/TestimonialComponent.vue';
import FullStory from '@/components/dashboard/FullStory.vue';
import CardsRow from '../components/dashboard/CardsRow.vue';
import SubscriptionCards from '../components/dashboard/SubscriptionCards.vue';
import CarouselComponent from '../components/dashboard/CarouselComponent.vue';
import TrustedCompanies from '../components/dashboard/TrustedCompany.vue';
import News from '../components/dashboard/NewsComponent.vue';
import TrendingNow from '../components/dashboard/TrendingNow.vue';

// Admin-specific components


// Get the store and determine if the user is an admin
const store = useStore();
const userRole = computed(() => store.getters.getUserRole);
const isAdmin = computed(() => userRole.value === 'admin');
</script>

<style scoped>
/* Add any specific styles here */
</style>
