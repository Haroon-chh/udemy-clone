import { createStore } from 'vuex';
import AuthApiServices from '@/services/AuthApiServices'; // Import your Auth API services
import AdminStore from './AdminStore';
import speakeasy from 'speakeasy'; // For 2FA secret generation
import PageSettingsStore from './pageSettingsStore';
import StudentStore from './StudentStore';
import AddcartStore from './AddcartStore';

export default createStore({
  modules: {
    AdminStore,
     PageSettingsStore,
      StudentStore,
    AddcartStore
  },
  state: {
    user: null,
    loggedUser: null,
    loggedIn: false,
    isTwoFactorEnabled: false, // State to track 2FA status
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
    isTwoFactorEnabled: (state) => state.isTwoFactorEnabled, // Getter for 2FA status
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
    setTwoFactorEnabled(state, status) {
      state.isTwoFactorEnabled = status; // Mutation for enabling/disabling 2FA
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

          return { success: true, message: 'logout success' };
        } else {
          return { success: false, message: response.message || 'Unexpected response format' };
        }
      } catch (error) {
        console.error('Error logging out:', error);

        const errorMessage =
          error.response?.data?.message || 'An error occurred while logging out.';
        return { success: false, message: errorMessage };
      }
    },

    // Enable Two-Factor Authentication
    async enableTwoFactorAuth({ commit, state }) {
      try {
        const secret = speakeasy.generateSecret({
          name: 'UdemyCloneApp',
          length: 20,
        });
        console.log('Generated 2FA Secret:', secret.base32); // Log secret for testing

        // Simulate sending the secret to the backend (you can replace this with an actual API call)
        await AuthApiServices.PostRequest('/2fa/enable', { userId: state.loggedUser.id, secret: secret.base32 });

        commit('setTwoFactorEnabled', true); // Update the 2FA state
        return { success: true, message: '2FA enabled. Scan the QR code in the console.' };
      } catch (error) {
        console.error('Error enabling 2FA:', error);
        return { success: false, message: 'Failed to enable 2FA. Please try again.' };
      }
    },

    // Disable Two-Factor Authentication
    async disableTwoFactorAuth({ commit, state }) {
      try {
        // Simulate disabling 2FA (you can replace this with an actual API call)
        await AuthApiServices.PostRequest('/2fa/disable', { userId: state.loggedUser.id });

        commit('setTwoFactorEnabled', false); // Update the 2FA state
        return { success: true, message: '2FA disabled.' };
      } catch (error) {
        console.error('Error disabling 2FA:', error);
        return { success: false, message: 'Failed to disable 2FA. Please try again.' };
      }
    },

    // Change password
    async changePassword(_, { current_password, new_password, new_password_confirmation }) {
      try {
        const response = await AuthApiServices.PostRequest('/change-password', {
          current_password,
          new_password,
          new_password_confirmation,
        });

        if (response.success) {
          return { success: true, message: response.message };
        } else {
          return { success: false, message: response.message };
        }
      } catch (error) {
        console.error('Error changing password:', error);
        throw new Error('An error occurred while changing the password.');
      }
    },

    // Register function
    async registerUser(_, userData) {
      try {
        const response = await AuthApiServices.PostRequest('/register', userData);
        console.log('Register API response:', response);

        if (response && response.message === 'You are successfully registered') {
          return { success: true, message: response.message };
        } else {
          return { success: false, message: 'Registration failed. Please try again.' };
        }
      } catch (error) {
        console.error('Error during registration:', error);

        if (error.response && error.response.data) {
          const apiMessage = error.response.data.message;
          const errors = error.response.data.errors;

          const errorMessage = errors ? Object.values(errors).flat().join(' ') : apiMessage || 'An unexpected error occurred.';
          return { success: false, message: errorMessage };
        }

        return { success: false, message: 'An unexpected error occurred. Please try again later.' };
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
