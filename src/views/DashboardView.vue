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
    <CardContainer v-if="isAdmin" @card-click="handleCardClick" />
    <!-- Router view for child routes like AddArticle -->
    <router-view v-if="isAdmin" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'; // Import useRouter for programmatic navigation

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
import CardContainer from '@/components/dashboard/Admin/CardContainer.vue';

// Get the store and determine if the user is an admin
const store = useStore();
const userRole = computed(() => store.getters.getUserRole);
const isAdmin = computed(() => userRole.value === 'admin');

// Use router for navigation
const router = useRouter();

// Handle card click events
const handleCardClick = (card) => {
  if (card.title === 'Quill Editor') {
    // Navigate to the "add-article" route under the dashboard
    router.push({ name: 'add-article' });
  }
};
</script>

<style scoped>
/* Add any specific styles here */
</style>
