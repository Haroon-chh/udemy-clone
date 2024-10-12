import { createStore } from 'vuex';
import AuthApiServices from '@/services/AuthApiServices'; // Import your Auth API services

export default createStore({
  state: {
    user: null,
    loggedUser: null,
    loggedIn: false, // Initialize loggedIn as false by default
    // Navbar related states
    isOpen: {
      categoriesDropdown: false,
      developmentDropdown: false,
      webDevDropdown: false,
      mobileDevDropdown: false,
      businessDropdown: false,
      teachDropdown: false,
      cartDropdown: false,
    },
    isLanguageModalOpen: false,
    logoutMessage: '', // State to hold logout response message
  },
  getters: {
    getUser: (state) => state.user,
    getUserRole: (state) => (state.user ? state.user.role : null),
    getUserPermissions: (state) => (state.user ? state.user.permissions : []),
    getLoggedUser: (state) => state.loggedUser,
    isLoggedIn: (state) => state.loggedIn, // Use Vuex state for loggedIn status
    logoutMessage: (state) => state.logoutMessage, 
    getDropdownState: (state) => (dropdown) => state.isOpen[dropdown], // Navbar related getter
    getLanguageModalState: (state) => state.isLanguageModalOpen,
  },
  mutations: {
    setUser(state, userData) {
      state.user = userData;
    },
    setLoggedUser(state, loggedUserData) {
      state.loggedUser = loggedUserData;
    },
    clearUser(state) {
      state.user = null;
      state.loggedUser = null;
    },
    setLoggedIn(state, status) {
      state.loggedIn = status;
    },
    setLogoutMessage(state, message) {
      state.logoutMessage = message;
    },
    openDropdown(state, dropdown) {
      state.isOpen[dropdown] = true; // Open specified dropdown
    },
    closeDropdown(state, dropdown) {
      state.isOpen[dropdown] = false; // Close specified dropdown
    },
    openLanguageModal(state) {
      state.isLanguageModalOpen = true;
    },
    closeLanguageModal(state) {
      state.isLanguageModalOpen = false;
    },
  },
  actions: {
    loginUser({ commit }, userData) {
      // Store user data and token in Vuex, and localStorage only for persistence
      commit('setUser', userData.data);
      commit('setLoggedIn', true);

      localStorage.setItem('authUser', JSON.stringify(userData.data));
      localStorage.setItem('access_token', userData.data.access_token);
      
      // Create and store the logged user information
      const loggedUserData = {
        id: userData.data.id, // Ensure 'id' exists in userData
        name: userData.data.name, // Ensure 'name' exists in userData
        email: userData.data.email // Ensure 'email' exists in userData
      };
      localStorage.setItem('logged_user', JSON.stringify(loggedUserData));
      commit('setLoggedUser', loggedUserData);
    },
    async logoutUser({ commit }) {
      try {
        const response = await AuthApiServices.PostRequest('/logout'); // Replace with the actual logout endpoint
  
        if (response && response.status === 200) {
          // Clear local storage and state
          localStorage.removeItem('access_token');
          localStorage.removeItem('authUser');
          localStorage.removeItem('logged_user');
  
          commit('clearUser');
          commit('setLoggedIn', false);
          return { message: 'Logout successful' };
          // Ensure to return an object with a message
        } else {
          // If the API response is not as expected, return an error message
          return { message: response.message || 'Logout failed' };
        }
      } catch (error) {
        // Handle API call errors and return a fallback message
        console.error('Error logging out:', error);
        return { message: 'An error occurred while logging out' }; // Ensure an object with a message is returned
      }
    },
    initializeStore({ commit }) {
      const token = localStorage.getItem('access_token');
      const authUser = localStorage.getItem('authUser');
      const loggedUser = JSON.parse(localStorage.getItem('logged_user'));

      if (token && authUser) {
        commit('setUser', JSON.parse(authUser));
        commit('setLoggedUser', loggedUser);
        commit('setLoggedIn', true);
      } else {
        commit('setLoggedIn', false);
      }
    },
    async fetchUserProfile({ commit }) {
      try {
        const response = await AuthApiServices.GetRequest('/profile');
        if (response.message === 'OK') {
          commit('setLoggedUser', response.data);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    },

    // Navbar related actions
    openDropdown({ commit }, dropdown) {
      commit('openDropdown', dropdown);
    },
    closeDropdown({ commit }, dropdown) {
      commit('closeDropdown', dropdown);
    },
    openLanguageModal({ commit }) {
      commit('openLanguageModal');
    },
    closeLanguageModal({ commit }) {
      commit('closeLanguageModal');
    },
  },
});
