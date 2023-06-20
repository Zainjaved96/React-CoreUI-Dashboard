import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const authContext = createContext();

// Create a MyProvider component to wrap the content that needs access to the context value
const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [userId, setUserId] = useState(null);

    const fetchId = async () => {
      try {
        const token = localStorage.getItem('accessToken'); // Replace 'your_token_here' with your actual token
        console.log("🚀 ~ file: AuthContext.js:16 ~ fetchId ~ token:", token)
    
        // Set the token in the request headers
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
    
        // Make the API request
        const response = await axios.get('http://127.0.0.1:8000/auth/users/me/', config);
        console.log("🚀 ~ file: AuthContext.js:26 ~ fetchId ~ response:", response)
    
        // Handle the response
        console.log(response.data.id);
        setUserId(response.data.id)
      } catch (error) {
        // Handle the error
        console.error(error);
      }
    };
    

    const login = () => {
      setIsAuth(true);
    };
  
    const logout = () => {
        localStorage.setItem('accessToken', '');
        localStorage.setItem('refreshToken', '');
        setIsAuth(false);
        
    };
  
    const authContextValue = {
      isAuth,
      login,
      logout,
      fetchId,
      userId
    };
  
    return (
      <authContext.Provider value={authContextValue}>
        {children}
      </authContext.Provider>
    );
  };

  const useAuthContext = () => {
    const context = useContext(authContext);
    if (context === undefined) {
      throw new Error('useAuthContext must be used within a ContextProvider');
    }
    return context;
  };

  AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  export { AuthProvider, useAuthContext };