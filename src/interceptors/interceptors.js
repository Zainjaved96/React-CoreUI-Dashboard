import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from 'src/context/AuthContext'
// Create a request interceptor


const requestInterceptor = axios.interceptors.request.use(
  (config) => {
    // Retrieve the token from local storage
    const token = localStorage.getItem('accessToken');

    // Attach the token as a header to the request
    if (token) {
      // VerifyToken(token)
      config.headers['Authorization'] = `Bearer ${token}`;
      
    }
    return config;
  },
  (error) => {
    console.error('Request Error Interceptor:', error);
    return Promise.reject(error);
  }
);


// Create a response interceptor
const responseInterceptor = axios.interceptors.response.use(

  (response) => {
   console.log("🚀 ~ file: interceptors.js:27 ~ response:", response)
    return response;
  },
  async (error) => {
    // const navigate = useNavigate()
    // const {logout} = useAuthContext
    console.error('Response Error Interceptor:', error);
  
    // Handle specific error types
    if (error.response && error.response.status === 401) {
      // Refresh the token
      const refreshToken = localStorage.getItem('refreshToken');
  
      try {
        // Make a request to your token refresh endpoint
        const refreshResponse = await axios.post('http://127.0.0.1:8000/auth/jwt/refresh', { refresh: refreshToken });
        console.log("🚀 ~ file: interceptors.js:41 ~ refreshResponse:", refreshResponse)
  
        // Update the access token in local storage
        localStorage.setItem('accessToken', refreshResponse.data.access);
  
        // Retry the original request with the new access token
        const originalRequest = error.config;
        originalRequest.headers['Authorization'] = `Bearer ${refreshResponse.data.access}`;
  
        return await axios(originalRequest);
      } catch (refreshError) {
        console.error('Token Refresh Error:', refreshError);
        // Handle the token refresh error
        // For example, redirect to the login page or show an error message
        // logout()
        // navigate('/login')
        throw refreshError;
      }
    }
  
    throw error;
  }
  
);

export default axios; // Export the Axios instance with interceptors
