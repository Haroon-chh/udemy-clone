<template>
  <div>
    <h1>Active Subscriptions</h1>
    
    <!-- Loading message -->
    <div v-if="loading">Loading...</div>
    
    <!-- Error message -->
    <div v-else-if="error">{{ error }}</div>
    
    <!-- Active subscriptions list -->
    <div v-else>
      <ul>
        <li v-for="subscription in activeSubscriptions" :key="subscription.id">
          <p><strong>Subscription ID:</strong> {{ subscription.id }}</p>
          <p><strong>Student ID:</strong> {{ subscription.student_id }}</p>
          <p><strong>Status:</strong> {{ subscription.status }}</p>
          <p><strong>Created At:</strong> {{ subscription.created_at }}</p>
          <p><strong>Trial Start:</strong> {{ subscription.trial_start_at || 'N/A' }}</p>
          <p><strong>Trial End:</strong> {{ subscription.trial_end_at || 'N/A' }}</p>
          <p><strong>Deleted At:</strong> {{ subscription.deleted_at || 'N/A' }}</p>
          <hr />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import AuthApiServices from '@/services/AuthApiServices'; // Assuming this handles API requests

export default {
  name: 'ActiveSubscription',
  setup() {
    const activeSubscriptions = ref([]); // To store the active subscriptions data
    const loading = ref(true); // To track the loading state
    const error = ref(null); // To store any error message

    // Function to fetch active subscriptions from the API
    const fetchActiveSubscriptions = async () => {
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
        
        // Update activeSubscriptions with the data from the response
        activeSubscriptions.value = response.data.activeSubscriptions;
      } catch (err) {
        // Handle any errors during the API request
        error.value = `Failed to fetch active subscriptions. ${err.message || ''}`;
        console.error(err);
      } finally {
        loading.value = false; // Stop loading after the request completes
      }
    };

    // Fetch active subscriptions when the component is mounted
    onMounted(fetchActiveSubscriptions);

    return {
      activeSubscriptions,
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
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin-bottom: 10px;
}
p {
  margin: 5px 0;
}
hr {
  margin-top: 10px;
}
</style>
