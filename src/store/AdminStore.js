// src/store/AdminStore.js
import AuthApiServices from '@/services/AuthApiServices';
import { toRaw } from 'vue'; // Import toRaw to convert reactive data to plain object

const AdminStore = {
  namespaced: true,
  state: {
    articles: []  // State to store fetched articles
  },
  getters: {
    allArticles: (state) => state.articles,  // Getter to retrieve articles
  },
  mutations: {
    setArticles(state, articles) {
      state.articles = articles;  // Mutation to set articles in the state
    }
  },
  actions: {
    // Action to fetch articles from the API
    async fetchArticles({ commit }) {
      try {
        const response = await AuthApiServices.GetRequest('/articles'); // Call the API to fetch articles
        console.log('Fetched Articles:', response.data.articles); // Log for debugging
        commit('setArticles', response.data.articles);  // Commit mutation to set articles in the state
      } catch (error) {
        console.error('Error fetching articles:', error);  // Log any errors that occur
        throw error;  // Throw the error to handle it in the component
      }
    },

    // Action to create a new article using the updated API endpoint with POST request
    async createArticle(_, articleData) {
      try {
        // Convert the reactive object to a plain JavaScript object
        const plainArticleData = toRaw(articleData); // Convert reactive to plain object

        const endpoint = '/create-article'; // Use the correct API endpoint

        console.log('Sending Article Data to:', endpoint);
        console.log('Article Data:', plainArticleData);
        console.log('Payload:', plainArticleData); // Add this line to inspect the payload
        // Use AuthApiServices to send a POST request with authorization headers
        const response = await AuthApiServices.PostRequest(endpoint, plainArticleData);
        return response;  // Return the response to the component
      } catch (error) {
        console.error('Error creating article with fetch:', error);
        throw error;  // Throw error to handle in the component
      }
    },

    // Action to delete an article
    async deleteArticle(_, articleId) {
      try {
        const endpoint = `/articles/${articleId}/delete`; // Use the correct API endpoint
        const response = await AuthApiServices.PostRequest(endpoint); // Send request to delete the article
        console.log('Article deleted:', response);
        return response;
      } catch (error) {
        console.error('Error deleting article:', error);
        throw error;
      }
    },

    // Action to update an article
    async updateArticle(_, articleData) {
      try {
        const endpoint = `/articles/${articleData.id}/update`; // API endpoint for updating an article
        const response = await AuthApiServices.PostRequest(endpoint, articleData); // Send request to update article
        console.log('Article updated:', response);
        return response;
      } catch (error) {
        console.error('Error updating article:', error);
        throw error;
      }
    },
  },
};

export default AdminStore;
