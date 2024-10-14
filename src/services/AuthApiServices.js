// src/services/AuthApiServices.js
const baseURL = process.env.VUE_APP_API_URL;

const AuthApiServices = {
  // Function to send POST requests with Authorization headers using fetch
  async PostRequestWithAuth(endpoint, data) {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem('access_token');
    
    try {
      const response = await fetch(`${baseURL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`, // Include access token in headers
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true' // Optional: Remove if not using ngrok
        },
        body: JSON.stringify(data), // Convert data to JSON string
      });

      if (!response.ok) {
        // If the response is not okay, throw an error with response status text
        throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
      }

      // Return the parsed JSON response
      return await response.json();
    } catch (error) {
      console.error('POST request with auth failed:', error);
      throw error; // Throw error to handle in the calling function
    }
  },
};

export default AuthApiServices;
