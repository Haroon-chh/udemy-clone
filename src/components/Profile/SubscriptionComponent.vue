<template>
  <div class="container my-5">
    <!-- Header -->
    <div class="text-center mb-5">
      <h1 class="fw-bold display-4">Manage Your Subscription</h1>
      <p class="lead text-muted">Select a plan or check your current subscription status below.</p>
    </div>

    <!-- Active subscription details -->
    <div v-if="activeSubscription" class="subscription-details mb-5">
      <h4 class="fw-bold">Your Active Subscription</h4>

      <div class="card shadow-sm border-0 rounded-4 p-4 mb-4">
        <div class="row">
          <div class="col-md-6">
            <p><strong>Subscription ID:</strong> {{ activeSubscription.id }}</p>
            <p><strong>Status:</strong> <span :class="statusClass">{{ activeSubscription.status }}</span></p>
            <p><strong>Student ID:</strong> {{ activeSubscription.student_id }}</p>
          </div>
          <div class="col-md-6">
            <p><strong>Created At:</strong> {{ formatDate(activeSubscription.created_at) }}</p>
            <p><strong>Updated At:</strong> {{ formatDate(activeSubscription.updated_at) }}</p>
          </div>
        </div>
      </div>

      <!-- Trial info (if applicable) -->
      <div v-if="activeSubscription.trial_start_at && activeSubscription.trial_end_at" class="alert alert-info">
        <p><strong>Trial Period:</strong> {{ formatDate(activeSubscription.trial_start_at) }} to {{ formatDate(activeSubscription.trial_end_at) }}</p>
      </div>

      <!-- Additional trial message -->
      <div v-else class="alert alert-info">
        <p>{{ trialMessage }}</p>
      </div>
    </div>

    <!-- No active subscription message -->
    <div v-else class="no-subscription mb-5 text-center">
      <h5 class="fw-bold">No Active Subscription</h5>
      <p class="text-muted">You don't have an active subscription at the moment. Choose a plan to subscribe.</p>
    </div>

    <!-- Subscription Plan Card -->
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card subscription-card shadow-lg border-0 rounded-4">
          <div class="row g-0">
            <!-- Subscription details -->
            <div class="col-lg-6 p-4">
              <h4 class="fw-bold">Personal Plan</h4>
              <p class="text-muted mb-3">
                Unlock all courses for a fixed price. This plan gives you access to:
              </p>
              <ul class="list-unstyled mb-4">
                <li class="mb-2">
                  <i class="bi bi-check-circle-fill text-success me-2"></i> Access to 12,000+ courses
                </li>
                <li class="mb-2">
                  <i class="bi bi-check-circle-fill text-success me-2"></i> Courses in tech, business, and more
                </li>
                <li class="mb-2">
                  <i class="bi bi-check-circle-fill text-success me-2"></i> Practice tests, exercises, and Q&A
                </li>
              </ul>

              <!-- Show "You are already subscribed" message or Subscribe Button -->
              <button v-if="!isSubscribed" class="btn btn-primary btn-lg" @click="subscribeToPlan" :disabled="subscriptionStatus === 'success'">
                Subscribe for $11/month
              </button>
              <p v-if="isSubscribed" class="text-success fw-bold mt-3">You are already subscribed!</p>

              <p class="text-muted mt-3">7-day free trial, cancel anytime.</p>
            </div>

            <!-- Plan image -->
            <div class="col-lg-6 d-none d-lg-block">
              <img :src="subscriptionImage" alt="Subscription plan image" class="img-fluid h-100 rounded-end">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- API Response Section -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import subscriptionImage from '@/assets/subscription-image.png';

const store = useStore();

// Local state for API responses
const apiResponse = ref(null);
const apiCheckResponse = ref(null);
const isSubscribed = ref(false);  // Track if the user is already subscribed

// Fetch active subscription from the state
const activeSubscription = computed(() => store.getters['StudentStore/getActiveSubscription']);
const subscriptionStatus = computed(() => store.getters['StudentStore/getSubscriptionStatus']);

// Format date utility
const formatDate = (date) => new Date(date).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

// Define the class based on status for styling purposes
const statusClass = computed(() => {
  if (activeSubscription.value && activeSubscription.value.status === 'active') {
    return 'badge bg-success';
  }
  return 'badge bg-secondary';
});

// Define the trial message based on API response
const trialMessage = computed(() => {
  return store.state.StudentStore.activeSubscription.status === 'active'
    ? 'Your trial period is still active. You can continue to enjoy the benefits until the trial ends.'
    : 'You do not have any active trials.';
});

// Subscribe to the plan
const subscribeToPlan = async () => {
  await store.dispatch('StudentStore/subscribe');
  apiResponse.value = store.state.StudentStore.activeSubscription;
  
  // Set localStorage flag after successful subscription
  localStorage.setItem('isSubscribed', true);
  isSubscribed.value = true;
};

// Check if the user is already subscribed (on page load)
const checkSubscriptionStatus = () => {
  const subscriptionFlag = localStorage.getItem('isSubscribed');
  isSubscribed.value = !!subscriptionFlag;  // Convert to boolean
};

// Check active subscription on component mount
onMounted(() => {
  store.dispatch('StudentStore/checkSubscription').then(() => {
    apiCheckResponse.value = store.state.StudentStore.activeSubscription;
  });

  // Check local storage for subscription status
  checkSubscriptionStatus();
});
</script>

<style scoped>
/* Styling for the component */
.subscription-details {
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 10px;
  padding: 20px;
}

.card.subscription-card {
  background-color: #fff;
  border: 1px solid #e0e0e0;
}

.no-subscription {
  padding: 20px;
}

.alert {
  border-radius: 10px;
}

.badge.bg-success {
  background-color: #28a745;
}

.badge.bg-secondary {
  background-color: #6c757d;
}

pre {
  overflow: auto;
  max-height: 300px;
  white-space: pre-wrap;
  word-wrap: break-word;
}

button.btn:disabled {
  background-color: #6c757d;
}
</style>
