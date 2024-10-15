import AuthApiServices from '@/services/AuthApiServices';

const PageSettingsStore = {
  namespaced: true,
  state: {
    pages: [], // Store the pages data here
  },
  mutations: {
    SET_PAGES(state, pages) {
      console.log('Committing pages:', pages); // Log to verify data
      state.pages = pages;
    },
  },
  actions: {
    async getPages({ commit }) {
      try {
        const response = await AuthApiServices.GetRequest('/get-all-pages');
        console.log('API Response:', response); // Log entire response for debugging

        if (response.data && Array.isArray(response.data)) {
          commit('SET_PAGES', response.data); // Commit directly if it's already an array
        } else if (response.data && response.data.data) {
          commit('SET_PAGES', response.data.data); // Commit nested data
        } else {
          console.error('Unexpected response format:', response);
        }
      } catch (error) {
        console.error('Error fetching pages:', error);
      }
    },
  },
  getters: {
    getPageTitles: (state) => state.pages.map(page => page.title),
  },
};

export default PageSettingsStore;
