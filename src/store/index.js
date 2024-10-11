// src/store/index.js
import { createStore } from 'vuex';
import AdminStore from './AdminStore';  // Import AdminStore module

export default createStore({
  modules: {
    admin: AdminStore,  // Register AdminStore module
  },
  state: {
    user: JSON.parse(localStorage.getItem('authUser')) || null,
    loggedUser: JSON.parse(localStorage.getItem('logged_user')) || null,
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
      localStorage.setItem('authUser', JSON.stringify(userData.data));
      localStorage.setItem('access_token', userData.data.access_token);
      localStorage.setItem('userRole', userData.data.role);
      localStorage.setItem('userPermissions', JSON.stringify(userData.data.permissions));
      commit('setUser', userData.data);

      const loggedUserData = {
        id: userData.data.id,
        name: userData.data.name,
        email: userData.data.email,
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
