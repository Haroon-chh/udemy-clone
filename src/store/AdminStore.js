// src/store/AdminStore.js
import AuthApiServices from '@/services/AuthApiServices';
import { toRaw } from 'vue'; // Import toRaw to convert reactive data to plain object

const AdminStore = {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    // Action to create a new article using the updated API endpoint with POST request
    async createArticle(_, articleData) {
      try {
        // Convert the reactive object to a plain JavaScript object
        const plainArticleData = toRaw(articleData); // Convert reactive to plain object

        // Construct the endpoint URL with slug
        const slug = articleData.title.toLowerCase().replace(/ /g, '-');
        const endpoint = `/articles/slug/${slug}`;

        console.log('Sending Article Data to:', endpoint);
        console.log('Article Data:', plainArticleData);

        // Use AuthApiServices to send a POST request with authorization headers using fetch
        const response = await AuthApiServices.PostRequestWithAuth(endpoint, plainArticleData);
        return response;  // Return the response to the component
      } catch (error) {
        console.error('Error creating article with fetch:', error);
        throw error;  // Throw error to handle in the component
      }
    }
  },
};

export default AdminStore;
