import { createStore } from 'vuex';
import AuthApiServices from '@/services/AuthApiServices'; // Import your Auth API services

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem('authUser') || '{}') || null,
    loggedUser: JSON.parse(localStorage.getItem('logged_user') || '{}') || null,
    loggedIn: !!localStorage.getItem('access_token'), // Initialize loggedIn state based on token
    // Navbar related states
    isOpen: {
      categoriesDropdown: false,
      developmentDropdown: false,
      webDevDropdown: false,
      mobileDevDropdown: false,
      businessDropdown: false,
      teachDropdown: false,
      cartDropdown: false
    },
    isLanguageModalOpen: false,
  },
  getters: {
    getUser: (state) => state.user,
    getUserRole: (state) => state.user ? state.user.role : localStorage.getItem('userRole'),
    getUserPermissions: (state) => state.user ? state.user.permissions : JSON.parse(localStorage.getItem('userPermissions') || '[]'),
    getLoggedUser: (state) => state.loggedUser,
    isLoggedIn: (state) => state.loggedIn, // New getter for loggedIn state
    // Navbar related getters
    getDropdownState: (state) => (dropdown) => state.isOpen[dropdown],
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
    setLoggedIn(state, status) { // New mutation to set loggedIn status
      state.loggedIn = status;
    },
    // Navbar related mutations
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
    loginUser({ commit }, userData) {
      // Store the user data and token in localStorage
      localStorage.setItem('authUser', JSON.stringify(userData.data)); 
      localStorage.setItem('access_token', userData.data.access_token); 
      localStorage.setItem('userRole', userData.data.role); 
      localStorage.setItem('userPermissions', JSON.stringify(userData.data.permissions)); 

      // Commit the user data to the state
      commit('setUser', userData.data);
      
      // Set loggedIn state to true
      commit('setLoggedIn', true);

      // Create and store the logged user information
      const loggedUserData = {
        id: userData.data.id, // Ensure 'id' exists in userData
        name: userData.data.name, // Ensure 'name' exists in userData
        email: userData.data.email // Ensure 'email' exists in userData
      };
      localStorage.setItem('logged_user', JSON.stringify(loggedUserData));
      commit('setLoggedUser', loggedUserData);
    },
    logoutUser({ commit }) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userPermissions');
      localStorage.removeItem('authUser');
      localStorage.removeItem('logged_user');
      commit('clearUser');
      commit('setLoggedIn', false); // Set loggedIn state to false
    },
    setLoggedUserData({ commit }, loggedUserData) {
      localStorage.setItem('logged_user', JSON.stringify(loggedUserData));
      commit('setLoggedUser', loggedUserData);
    },
    initializeStore({ commit }) {
      const authUser = JSON.parse(localStorage.getItem('authUser'));
      if (authUser) {
        commit('setUser', authUser);
      }
      const loggedUser = JSON.parse(localStorage.getItem('logged_user'));
      if (loggedUser) {
        commit('setLoggedUser', loggedUser);
      }
      const token = localStorage.getItem('access_token');
      commit('setLoggedIn', !!token); // Initialize loggedIn based on token
    },
    // Fetch user profile
    async fetchUserProfile({ commit }) {
      try {
        const response = await AuthApiServices.GetRequest('/profile');

        if (response.message === 'OK') {
          commit('setLoggedUser', response.data); // Save user profile in the store
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
