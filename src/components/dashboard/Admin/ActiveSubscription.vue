<template>
  <div>
    <h1>Active Subscription</h1>
    
    <!-- Loading message -->
    <div v-if="loading">Loading...</div>
    
    <!-- Error message -->
    <div v-else-if="error">{{ error }}</div>
    
    <!-- Active subscription details -->
    <div v-else>
      <p><strong>Subscription ID:</strong> {{ activeSubscription.id }}</p>
      <p><strong>Student ID:</strong> {{ activeSubscription.student_id }}</p>
      <p><strong>Name:</strong> {{ activeSubscription.name }}</p>
      <p><strong>Status:</strong> {{ activeSubscription.status }}</p>
      <p><strong>Trial Start:</strong> {{ activeSubscription.trial_start_at || 'N/A' }}</p>
      <p><strong>Trial End:</strong> {{ activeSubscription.trial_end_at || 'N/A' }}</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import AuthApiServices from '@/services/AuthApiServices'; // Assuming this handles API requests

export default {
  name: 'ActiveSubscription',
  setup() {
    const activeSubscription = ref(null); // To store the active subscription data
    const loading = ref(true); // To track the loading state
    const error = ref(null); // To store any error message

    // Function to fetch active subscription from the API
    const fetchActiveSubscription = async () => {
      const token = localStorage.getItem('access_token'); // Retrieve the admin token from localStorage

      // Check if token is missing
      if (!token) {
        error.value = 'Authorization token is missing!';
        loading.value = false;
        return;
      }

      try {
        // Make the GET request to the API
        const response = await AuthApiServices.GetRequest('/active-subscriptions');
        
        // Update activeSubscription with the data from the response
        activeSubscription.value = response.data.activeSubscriptions;
      } catch (err) {
        // Handle any errors during the API request
        error.value = `Failed to fetch active subscription. ${err.message || ''}`;
        console.error(err);
      } finally {
        loading.value = false; // Stop loading after the request completes
      }
    };

    // Fetch active subscription when the component is mounted
    onMounted(fetchActiveSubscription);

    return {
      activeSubscription,
      loading,
      error,
    };
  },
};
</script>

<style scoped>
h1 {
  font-size: 24px;
  margin-bottom: 20px;
}
p {
  margin: 5px 0;
}
</style>
