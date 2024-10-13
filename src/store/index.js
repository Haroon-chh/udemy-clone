import { createStore } from 'vuex';
import AuthApiServices from '@/services/AuthApiServices'; // Import your Auth API services

export default createStore({
  state: {
    user: null,
    loggedUser: null,
    loggedIn: false,
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
    logoutMessage: '',
  },
  getters: {
    getUser: (state) => state.user,
    getUserRole: (state) => (state.user ? state.user.role : null),
    getUserPermissions: (state) => (state.user ? state.user.permissions : []),
    getLoggedUser: (state) => state.loggedUser,
    isLoggedIn: (state) => state.loggedIn,
    logoutMessage: (state) => state.logoutMessage,
    getDropdownState: (state) => (dropdown) => state.isOpen[dropdown],
    getLanguageModalState: (state) => state.isLanguageModalOpen,
  },
  mutations: {
    setUser(state, userData) {
      state.user = {
        role: userData.role,
        permissions: userData.permissions,
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
      state.isOpen[dropdown] = true;
    },
    closeDropdown(state, dropdown) {
      state.isOpen[dropdown] = false;
    },
    openLanguageModal(state) {
      state.isLanguageModalOpen = true;
    },
    closeLanguageModal(state) {
      state.isLanguageModalOpen = false;
    },
  },
  actions: {
    async loginUser({ commit }, credentials) {
      try {
        const response = await AuthApiServices.PostRequest('/login', credentials);
        console.log('Login API response:', response);
    
        if (response && response.message === 'OK' && response.data) {
          commit('setUser', response.data);
          commit('setLoggedIn', true);
    
          const loggedUserData = {
            id: response.data.id,
            role: response.data.role,
            permissions: response.data.permissions,
            name: response.data.name,
            email: response.data.email,
          };
    
          localStorage.setItem('authUser', JSON.stringify(response.data));
          localStorage.setItem('access_token', response.data.access_token);
          localStorage.setItem('logged_user', JSON.stringify(loggedUserData));
          commit('setLoggedUser', loggedUserData);
    
          // Return the actual success message from the API response
          return { success: true, message: 'Login successful!' };
         } else {
          return { success: false, message: response.message || 'Unexpected response format' };
        }
      } catch (error) {
        console.error('Error during login:', error);
    
        // Handle error response structure
        if (error.response && error.response.data) {
          const apiMessage = error.response.data.message;
          const credentialsError = error.response.data.errors?.credentials?.[0];
    
          // Prioritize specific credential errors over the general message
          const errorMessage = credentialsError || apiMessage || 'An error occurred. Please try again.';
          return { success: false, message: errorMessage };
        }
    
        // Fallback error message for unexpected errors
        return { success: false, message: 'An error occurred. Please try again.' };
      }
    },
    
    
    async logoutUser({ commit }) {
      try {
        const response = await AuthApiServices.PostRequest('/logout');
        console.log('Logout API response:', response);

        if (response && response.message === 'Successfully logged out') {
          localStorage.removeItem('access_token');
          localStorage.removeItem('authUser');
          localStorage.removeItem('logged_user');

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
