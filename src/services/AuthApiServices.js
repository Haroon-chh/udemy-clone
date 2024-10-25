import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

const baseURL = process.env.VUE_APP_API_URL;

const AuthApiServices = {
  init() {
    Vue.use(VueAxios, axios);
    axios.defaults.baseURL = baseURL;
    axios.defaults.headers.common['Content-Type'] = 'application/json'; // Set default headers to JSON
  },

  // Fetch the access token from localStorage
  getAuthHeaders() {
    const accessToken = localStorage.getItem('access_token');
    const headers = {
      'Content-Type': 'application/json', // Set content type as JSON for non-file requests
      'ngrok-skip-browser-warning': 'true', // Optional, only if you're using ngrok
    };
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`; // Attach the token if available
    }
    return headers;
  },

  // Generic GET request
  async GetRequest(endpoint, params = {}) {
    try {
      const headers = this.getAuthHeaders();
      console.log(`Making GET request to: ${baseURL}${endpoint}`, { params, headers });

      const response = await axios.get(`${baseURL}${endpoint}`, {
        params,
        headers,
      });

      console.log('GET request successful:', response);
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
      const headers = this.getAuthHeaders();
      console.log(`Making POST request to: ${baseURL}${endpoint}`, { data, headers });

      const response = await axios.post(`${baseURL}${endpoint}`, data, {
        headers,
      });

      console.log('POST request successful:', response);
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
      const headers = this.getAuthHeaders();
      console.log(`Making PUT request to: ${baseURL}${endpoint}`, { data, headers });

      const response = await axios.put(`${baseURL}${endpoint}`, data, {
        headers,
      });

      console.log('PUT request successful:', response);
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
      const headers = this.getAuthHeaders();
      console.log(`Making DELETE request to: ${baseURL}${endpoint}`, { params, headers });

      const response = await axios.delete(`${baseURL}${endpoint}`, {
        params,
        headers,
      });

      console.log('DELETE request successful:', response);
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
