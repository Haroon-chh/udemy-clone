import { createStore } from 'vuex';

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem('authUser')) || null,
    loggedUser: JSON.parse(localStorage.getItem('logged_user')) || null,
  },
  getters: {
    getUser: (state) => state.user,
    getUserRole: (state) => state.user ? state.user.role : localStorage.getItem('userRole'),
    getUserPermissions: (state) => state.user ? state.user.permissions : JSON.parse(localStorage.getItem('userPermissions') || '[]'),
    getLoggedUser: (state) => state.loggedUser,
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
  },
  actions: {
    loginUser({ commit }, userData) {
      localStorage.setItem('authUser', JSON.stringify(userData.data));
      localStorage.setItem('access_token', userData.data.access_token);
      localStorage.setItem('userRole', userData.data.role);
      localStorage.setItem('userPermissions', JSON.stringify(userData.data.permissions));
      commit('setUser', userData.data);
      
      // Also set the loggedUser
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
  },
});
