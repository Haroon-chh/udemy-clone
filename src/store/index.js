import { createStore } from 'vuex';
import AuthApiServices from '@/services/AuthApiServices'; // Import your Auth API services
import AdminStore from './AdminStore';
import PageSettingsStore from './pageSettingsStore';
import StudentStore from './StudentStore';
import AddcartStore from './AddcartStore';
import CategoriesStore from './CategoriesStore';
import SiteSettingStore from './SiteSettingStore';
import PurchaseStore from './PurchaseStore';
import CommentStore from './CommentStore';
import dynamicPage from './dynamicPage'; // Adjust path as needed

import ArticleStore from './ArticleStore';

export default createStore({
  modules: {
    AdminStore,
    PageSettingsStore,
    StudentStore,
    AddcartStore,
    CategoriesStore,
    SiteSettingStore,
    PurchaseStore,
    CommentStore,
    dynamicPage,
    ArticleStore
  },
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
        console.log('Login API response:', response); // Debug response
    
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
    
          return { success: true, data: response.data, message: 'Login successful!' }; // Include `data`
        } else {
          return { success: false, message: response.message || 'Unexpected response format' };
        }
      } catch (error) {
        console.error('Error during login:', error);
    
        const apiMessage = error.response?.data?.message;
        const credentialsError = error.response?.data?.errors?.credentials?.[0];
    
        const errorMessage = credentialsError || apiMessage || 'An error occurred. Please try again.';
        return { success: false, message: errorMessage };
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
          localStorage.removeItem('cart');
          localStorage.removeItem('isSubscribed')
    
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

    //change password
    async changePassword(_, { current_password, new_password, new_password_confirmation }) {
      try {
        const response = await AuthApiServices.PostRequest('/change-password', {
          current_password,
          new_password,
          new_password_confirmation,
        });
  
        if (response.success) {
          // Handle successful response if needed, like updating user state or notifying
          return { success: true, message: response.message };
        } else {
          // Handle unsuccessful response
          return { success: false, message: response.message };
        }
      } catch (error) {
        console.error('Error changing password:', error);
        throw new Error('An error occurred while changing the password.');
      }
    },

    //register function
    async registerUser(_, userData) {
      try {
        const response = await AuthApiServices.PostRequest('/register', userData);
        console.log('Register API response:', response);
    
        // Check for successful registration
        if (response && response.message === 'You are successfully registered') {
          return { success: true, message: response.message }; // Use the success message from the response
        } else {
          // Handle unexpected response format
          return { success: false, message: 'Registration failed. Please try again.' };
        }
      } catch (error) {
        console.error('Error during registration:', error);
    
        if (error.response && error.response.data) {
          const apiMessage = error.response.data.message;
          const errors = error.response.data.errors;
    
          // Customize your error handling as needed
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
    async verify2FA(_, { otp }) {
      try {
        const response = await AuthApiServices.PostRequest('/verify-2fa', {
          one_time_password: otp
        });
    
        if (response.message === 'one_time_password verified successfully') {
          return { success: true };
        } else {
          return { success: false, message: response.message || 'Invalid 2FA code' };
        }
      } catch (error) {
        const message = error.response?.data?.errors?.one_time_password?.[0] || 'Invalid 2FA code';
        return { success: false, message };
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