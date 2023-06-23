import axios from 'axios';

// Create a request interceptor
const requestInterceptor = axios.interceptors.request.use(
  (config) => {
    // Retrieve the token from local storage
    const token = localStorage.getItem('accessToken');

    // Attach the token as a header to the request
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request Error Interceptor:', error);
    return Promise.reject(error);
  }
);

export default axios; // Export the Axios instance with interceptors
