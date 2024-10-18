<template>
  <div class="container">
    <h1 class="page-title">
      <i class="fas fa-list-alt"></i> Active Subscription
    </h1>

    <!-- Loading Spinner -->
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <p class="loading-text">Fetching subscriptions...</p>
    </div>

    <!-- Error Message -->
    <div v-else-if="error" class="error-modal">
      <div class="error-content">
        <p>{{ error }}</p>
        <button @click="fetchActiveSubscriptions" class="retry-btn">
          <i class="fas fa-redo-alt"></i> Retry
        </button>
      </div>
    </div>

    <!-- Active Subscriptions List -->
    <div v-else class="subscriptions-grid">
      <div
        v-for="subscription in activeSubscriptions"
        :key="subscription.id"
        class="subscription-card"
      >
        <div class="card-header">
          <!-- Student Icon and Name -->
          <div class="student-info">
            <i class="fas fa-user-graduate student-icon"></i>
            <p class="student-name">{{ subscription.name }}</p>
          </div>
          <!-- Status Badge with Icon -->
          <span :class="getStatusClass(subscription.status)" class="status-badge">
            <i :class="getStatusIcon(subscription.status)" class="status-icon"></i>
            {{ subscription.status }}
          </span>
        </div>
        <div class="card-body">
          <p><strong>ID:</strong> {{ subscription.id }}</p>
          <p><strong>Student ID:</strong> {{ subscription.student_id }}</p>
        </div>
      </div>
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

        // If the response contains a single object, convert it to an array
        const subscriptionsData = response.data.activeSubscriptions;
        activeSubscriptions.value = Array.isArray(subscriptionsData)
          ? subscriptionsData
          : [subscriptionsData];
      } catch (err) {
        // Handle any errors during the API request
        error.value = `Failed to fetch active subscriptions. ${err.message || ''}`;
        console.error(err);
      } finally {
        loading.value = false; // Stop loading after the request completes
      }
    };

    // Helper function to get status class
    const getStatusClass = (status) => {
      return status === 'active' ? 'status-badge active' : 'status-badge inactive';
    };

    // Helper function to get status icon
    const getStatusIcon = (status) => {
      return status === 'active' ? 'fas fa-check-circle' : 'fas fa-times-circle';
    };

    // Fetch active subscriptions when the component is mounted
    onMounted(fetchActiveSubscriptions);

    return {
      activeSubscriptions,
      loading,
      error,
      fetchActiveSubscriptions,
      getStatusClass,
      getStatusIcon,
    };
  },
};
</script>

<style scoped>
/* Container styling */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  background: linear-gradient(135deg, #f0f8ff, #dbeafe);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Title with Icon */
.page-title {
  font-size: 36px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 40px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  background: linear-gradient(45deg, #3498db, #8e44ad);
  /* -webkit-background-clip: text; */
  -webkit-text-fill-color: transparent;
}

.page-title i {
  margin-right: 10px;
}

/* Loading Spinner */
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 60vh;
}

.spinner {
  border: 6px solid rgba(0, 0, 0, 0.1);
  border-top: 6px solid #3498db;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
}

.loading-text {
  font-size: 18px;
  color: #555;
  margin-top: 15px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Error Modal Styling */
.error-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}

.error-content {
  background: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.retry-btn {
  background: linear-gradient(45deg, #8e44ad, #3498db);
  color: white;
  border: none;
  padding: 12px 24px;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 8px;
  font-weight: bold;
  transition: transform 0.2s;
}

.retry-btn i {
  margin-right: 8px;
}

.retry-btn:hover {
  transform: scale(1.05);
}

/* Grid Layout for Subscriptions */
.subscriptions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
  padding: 20px;
}

/* Card Styling */
.subscription-card {
  background: rgba(255, 255, 255, 0.7);
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  backdrop-filter: blur(10px);
}

.subscription-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.15);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.student-info {
  display: flex;
  align-items: center;
}

.student-icon {
  font-size: 20px;
  color: #3498db;
  margin-right: 10px;
}

.student-name {
  font-size: 20px;
  font-weight: 700;
  color: #34495e;
}

.status-badge {
  padding: 6px 12px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: bold;
  text-transform: capitalize;
  display: flex;
  align-items: center;
}

.status-icon {
  margin-right: 8px;
}

.status-badge.active {
  background-color: #2ecc71;
  color: white;
}

.status-badge.inactive {
  background-color: #e74c3c;
  color: white;
}

/* Card Body Styling */
.card-body p {
  font-size: 16px;
  margin: 5px 0;
  color: #34495e;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 28px;
  }

  .subscription-card {
    padding: 15px;
  }

  .student-name {
    font-size: 18px;
  }

  .status-badge {
    font-size: 12px;
  }
}
</style>
