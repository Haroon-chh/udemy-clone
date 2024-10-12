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
    return {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    };
  },

  async GetRequest(endpoint, params = {}) {
    try {
      const response = await axios.get(`${baseURL}${endpoint}`, {
        params,
        headers: this.getAuthHeaders(), // Add auth headers here
      });

      return response.data;
    } catch (error) {
      console.error('GET request failed:', error);
      throw error;
    }
  },

  async PostRequest(endpoint, data) {
    try {
      const response = await axios.post(`${baseURL}${endpoint}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...this.getAuthHeaders(), // Add auth headers here
        },
      });
      return response.data;  // Return just the response data
    } catch (error) {
      console.error('POST request failed:', error);
      throw error;
    }
  },
};

export default AuthApiServices;
