import { createStore } from 'vuex';

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem('authUser') || '{}') || null,
    loggedUser: JSON.parse(localStorage.getItem('logged_user') || '{}') || null,
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
  },
  getters: {
    getUser: (state) => state.user,
    getUserRole: (state) => state.user ? state.user.role : localStorage.getItem('userRole'),
    getUserPermissions: (state) => state.user ? state.user.permissions : JSON.parse(localStorage.getItem('userPermissions') || '[]'),
    getLoggedUser: (state) => state.loggedUser,
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
    async fetchUserProfile({ commit }) {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          console.error('No access token found');
          return;
        }

        const response = await fetch(`${process.env.VUE_APP_API_URL}/profile`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.message === 'OK') {
          commit('setLoggedUser', data.data); // Save user profile in the store
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    },
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
