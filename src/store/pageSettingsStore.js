import AuthApiServices from '@/services/AuthApiServices';

const PageSettingsStore = {
  namespaced: true,
  state: {
    pages: [],
    currentPage: {},
  },
  mutations: {
    SET_PAGES(state, pages) {
      console.log('Committing pages:', pages);
      state.pages = pages;
    },
    SET_CURRENT_PAGE(state, pageData) {
      console.log('Committing current page:', pageData);
      state.currentPage = pageData;
    },
  },
  actions: {
    async getPages({ commit }) {
      try {
        const response = await AuthApiServices.GetRequest('/get-all-pages');
        console.log('API Response (all pages):', response);

        if (response.data && Array.isArray(response.data)) {
          commit('SET_PAGES', response.data);
        } else if (response.data && response.data.data) {
          commit('SET_PAGES', response.data.data);
        } else {
          console.error('Unexpected response format:', response);
        }
      } catch (error) {
        console.error('Error fetching pages:', error);
      }
    },

    async getPageBySlug({ commit }, slug) {
      try {
        console.log(`Fetching page by slug: ${slug}`);
        const response = await AuthApiServices.GetRequest(`/get-page-by-slug/${slug}`);
        console.log('API Response (single page):', response);

        if (response.data) {
          commit('SET_CURRENT_PAGE', response.data);
          return response.data;
        } else {
          console.error('Page not found or unexpected format:', response);
          return null;
        }
      } catch (error) {
        console.error('Error fetching page:', error);
        return null;
      }
    },

    async updatePageContent({ state }, body) {
      try {
        const pageId = state.currentPage.id;
        const response = await AuthApiServices.PostRequest(`/update-page/${pageId}`, { body });

        console.log('Page updated successfully:', response);
        return { success: true, message: response.message || 'Page updated successfully!' };
      } catch (error) {
        console.error('Error updating page:', error);
        return { success: false, message: 'Failed to update page. Please try again.' };
      }
    },
  },
  getters: {
    getPageTitles: (state) => state.pages.map((page) => page.title),
    getCurrentPageBody: (state) => (state.currentPage ? state.currentPage.body : ''),
  },
};

export default PageSettingsStore;
