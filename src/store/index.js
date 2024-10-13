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
    getUserRole: (state) => (state.user ? state.user.role : null), // Get user role
    getUserPermissions: (state) => (state.user ? state.user.permissions : []), // Get user permissions
    getLoggedUser: (state) => state.loggedUser,
    isLoggedIn: (state) => state.loggedIn, // Use Vuex state for loggedIn status
    logoutMessage: (state) => state.logoutMessage,
    getDropdownState: (state) => (dropdown) => state.isOpen[dropdown], // Navbar related getter
    getLanguageModalState: (state) => state.isLanguageModalOpen,
  },
  mutations: {
    setUser(state, userData) {
      state.user = {
        role: userData.role, // Store the role
        permissions: userData.permissions, // Store the permissions
        // You can store other user-related data if needed
      };
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
      // Store user data and token in Vuex, and localStorage for persistence
      commit('setUser', userData.data); // Store the role and permissions
      commit('setLoggedIn', true);

      localStorage.setItem('authUser', JSON.stringify(userData.data));
      localStorage.setItem('access_token', userData.data.access_token);

      // Create and store the logged user information, including role and permissions
      const loggedUserData = {
        id: userData.data.id, // Ensure 'id' exists in userData
        role: userData.data.role, // Store the role
        permissions: userData.data.permissions, // Store the permissions
        name: userData.data.name, // Store the user's name if needed
        email: userData.data.email, // Store the email if needed
      };

      localStorage.setItem('logged_user', JSON.stringify(loggedUserData));
      commit('setLoggedUser', loggedUserData);
    },
    async logoutUser({ commit }) {
      console.log('Starting logout process...'); // Log the start of the process
      try {
          const response = await AuthApiServices.PostRequest('/logout'); // Call the logout endpoint
          console.log('Logout API response:', response); // Log the response
  
          if (response && response.message === 'Successfully logged out') {
              console.log('Logout successful, clearing local storage');
              localStorage.removeItem('access_token');
              localStorage.removeItem('authUser');
              localStorage.removeItem('logged_user');
              
              console.log('Local storage after clearing:', {
                  access_token: localStorage.getItem('access_token'),
                  authUser: localStorage.getItem('authUser'),
                  logged_user: localStorage.getItem('logged_user'),
              });
  
              commit('clearUser');
              commit('setLoggedIn', false);
              return { message: 'Logout successful' };
          } else {
              return { message: response.message || 'Logout failed' };
          }
      } catch (error) {
          console.error('Error logging out:', error);
          return { message: 'An error occurred while logging out' };
      }
  }
  
  ,
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
