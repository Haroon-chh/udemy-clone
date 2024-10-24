import AuthApiServices from '@/services/AuthApiServices';

const state = {
  article: null,
};

const mutations = {
  SET_ARTICLE(state, article) {
    state.article = article;
  },
};

const actions = {
  async fetchArticleDetails({ commit }, slug) {
    try {
      const response = await AuthApiServices.GetRequest(`/articles/${slug}`);
      
      // Log the raw response to see its structure
      console.log("Raw article API response:", response);
      
      // Check if response contains the article data
      if (response && response.data) {
        commit('SET_ARTICLE', response.data); // Update state with article data
        return response.data; // Return article data for further usage
      } else {
        throw new Error('Invalid article data structure');
      }
    } catch (error) {
      console.error('Error fetching article details:', error);
      throw error; // Re-throw the error to handle it in the component
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
