import AuthApiServices from '@/services/AuthApiServices';
import { toRaw } from 'vue';

const AdminStore = {
  namespaced: true,
  state: {
    articles: [],  // State to store fetched articles
  },
  getters: {
    // Getter to retrieve all articles
    allArticles: (state) => state.articles,
  },
  mutations: {
    // Mutation to set articles in the state
    setArticles(state, articles) {
      state.articles = articles;
    },
  },
  actions: {
    /**
     * Fetch articles from the API.
     * Commits the articles to the state.
     */
    async fetchArticles({ commit }) {
      try {
        const response = await AuthApiServices.GetRequest('/articles');
        commit('setArticles', response.data.articles);  // Commit articles to the state
      } catch (error) {
        console.error('Error fetching articles:', error);
        throw error;  // Rethrow the error to handle in the component
      }
    },

    /**
     * Create a new article with image upload.
     * Sends the article data and image file (if available) as FormData to the backend.
     */
    async createArticle(_, formData) {
      try {
        const endpoint = '/create-article';  // API endpoint for creating an article
        const response = await AuthApiServices.PostRequest(endpoint, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',  // Ensure correct headers for file uploads
          },
        });
        return response;  // Return the response to the component
      } catch (error) {
        console.error('Error creating article:', error);
        throw error;  // Rethrow error to handle in the component
      }
    },    

    async fetchArticleById(_, articleId) {
      try {
        const response = await AuthApiServices.GetRequest(`/article/${articleId}`);
        return response.data.article;
      } catch (error) {
        console.error('Error fetching article:', error);
        throw error;
      }
    },

    async deleteArticle(_, articleId) {
      try {
        const endpoint = `/articles/${articleId}/delete`;
        const response = await AuthApiServices.PostRequest(endpoint);
        return response;
      } catch (error) {
        console.error('Error deleting article:', error);
        throw error;
      }
    },

    /**
     * Upload an image to the server (separate from the article creation).
     * Sends the image data in FormData format.
     */
    async uploadImage(_, formData) {
      try {
        const endpoint = '/upload-image';  // API endpoint for uploading images
        const response = await AuthApiServices.PostRequest(endpoint, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',  // Ensure the correct headers for file uploads
          },
        });
        return response;  // Return the uploaded image path
      } catch (error) {
        console.error('Error uploading image:', error);
        throw error;  // Rethrow the error to handle in the component
      }
    },

    /**
     * Delete an article by its ID.
     * Sends a request to delete the specified article.
     */
    

    /**
     * Update an article with new data.
     * Sends a request to update the specified article.
     */
    async updateArticle(_, articleData) {
      try {
        const endpoint = `/update-article/${articleData.id}`;  // Use PUT request for article update
        const plainArticleData = toRaw(articleData);  // Convert reactive article data to a plain object
        const response = await AuthApiServices.PutRequest(endpoint, plainArticleData);  // Use PUT request here
        return response;
      } catch (error) {
        console.error('Error updating article:', error);
        throw error;  // Rethrow the error to handle in the component
      }
    },
    
  },
};

export default AdminStore;