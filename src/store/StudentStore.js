// src/store/StudentStore.js
import AuthApiServices from '@/services/AuthApiServices';

const StudentStore = {
  namespaced: true,
  state: {
    activeSubscription: null, // To store the active subscription details
    subscriptionStatus: '',   // To store the status (e.g., success, error)
  },
  getters: {
    getActiveSubscription: (state) => state.activeSubscription,
    getSubscriptionStatus: (state) => state.subscriptionStatus,
  },
  mutations: {
    SET_ACTIVE_SUBSCRIPTION(state, subscription) {
      state.activeSubscription = subscription;
    },
    SET_SUBSCRIPTION_STATUS(state, status) {
      state.subscriptionStatus = status;
    },
  },
  actions: {
    // Action to subscribe
    async subscribe({ commit }) {
      try {
        // Post request to /subscribe endpoint
        const response = await AuthApiServices.PostRequest('/subscribe', {});
        const subscription = response.data.subscription;

        // Store subscription data and update state
        commit('SET_ACTIVE_SUBSCRIPTION', subscription);
        commit('SET_SUBSCRIPTION_STATUS', 'success');
      } catch (error) {
        commit('SET_SUBSCRIPTION_STATUS', 'error');
        console.error('Error subscribing:', error);
      }
    },

    // Action to check the active subscription
    async checkSubscription({ commit }) {
      try {
        const response = await AuthApiServices.GetRequest('/check-my-subscription');
        const subscription = response.data.subscription;

        if (subscription && subscription.status === 'active') {
          commit('SET_ACTIVE_SUBSCRIPTION', subscription);
        }
      } catch (error) {
        console.error('Error checking subscription:', error);
      }
    },
  },
};

export default StudentStore;
