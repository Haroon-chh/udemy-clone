import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

const baseURL = process.env.VUE_APP_API_URL;

const AuthApiServices = {
  init() {
    Vue.use(VueAxios, axios);
    axios.defaults.baseURL = baseURL;
    axios.defaults.headers.common['Content-Type'] = 'application/json';
  },

  // Fetch the access token from localStorage
  getAuthHeaders() {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      return {
        Authorization: `Bearer ${accessToken}`, // Ensure access_token is passed
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true', // Handle ngrok bypass
      };
    }
    return {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    };
  },

  // Generic GET request
  async GetRequest(endpoint, params = {}) {
    try {
      const response = await axios.get(`${baseURL}${endpoint}`, {
        params,
        headers: this.getAuthHeaders(), // Pass authorization headers
      });
      return response.data; // Return the response data
    } catch (error) {
      console.error('GET request failed:', error);
      if (error.response) {
        throw new Error(error.response.data.message || 'GET request failed');
      }
      throw error;
    }
  },

  // Generic POST request
  async PostRequest(endpoint, data) {
    try {
      const response = await axios.post(`${baseURL}${endpoint}`, data, {
        headers: this.getAuthHeaders(), // Pass authorization headers
      });
      return response.data; // Return the response data
    } catch (error) {
      console.error('POST request failed:', error);
      if (error.response) {
        throw new Error(error.response.data.message || 'POST request failed');
      }
      throw error;
    }
  },

  // Generic PUT request
  async PutRequest(endpoint, data) {
    try {
      const response = await axios.put(`${baseURL}${endpoint}`, data, {
        headers: this.getAuthHeaders(), // Pass authorization headers
      });
      return response.data; // Return the response data
    } catch (error) {
      console.error('PUT request failed:', error);
      if (error.response) {
        throw new Error(error.response.data.message || 'PUT request failed');
      }
      throw error;
    }
  },

  // Generic DELETE request
  async DeleteRequest(endpoint, params = {}) {
    try {
      const response = await axios.delete(`${baseURL}${endpoint}`, {
        params,
        headers: this.getAuthHeaders(), // Pass authorization headers
      });
      return response.data; // Return the response data
    } catch (error) {
      console.error('DELETE request failed:', error);
      if (error.response) {
        throw new Error(error.response.data.message || 'DELETE request failed');
      }
      throw error;
    }
  },
};

export default AuthApiServices;
